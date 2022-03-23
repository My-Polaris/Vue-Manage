<template>
  <!-- 首页模块 -->
  <el-row class="home">
    <!-- 上边的模块:平台常规数据 -->
    <el-card class="commonData" shadow="hover">
      <!-- 头部 -->
      <div class="header">
        <span>平台今日数据</span>
      </div>
      <!-- 数据部 -->
      <el-row class="body" :span="20">
        <el-col class="commonDataItem" v-for="item in commonData" :key="item.name">
          <h3 :style="{color:item.color}">{{item.value}}</h3>
          <span class="label">{{item.name}}</span>
        </el-col>
      </el-row>
    </el-card>
    <!-- 下边的模块 -->
    <el-row :gutter="20" style="margin-top:15px;">
      <!-- 下左:人气摄影师表格 -->
      <el-col :span="8">
        <el-card shadow="hover">
          <!-- 头部 -->
          <div class="header">
            <span>月度人气摄影师排行榜</span>
          </div>
          <!-- 数据部 -->
          <el-table :data="tableData" max-height="355" :default-sort="{prop: 'fansNum', order: 'descending'}">
            <el-table-column v-for="(val,key) in tableLabel" :key="key" :prop="key" :label="val" align="center"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <!-- 下中:新增用户与活跃用户数据条形图 -->
      <el-col :span="8">
        <el-card class="barData" shadow="hover">
          <!-- 头部 -->
          <div class="header"  style="margin-bottom:70px;">
            <span>本周用户概况</span>
          </div>
          <!-- 数据部 -->
          <echart :chartData="echartData.barData" style="height:305px;width:100%;"></echart>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="pieData" :body-style="{height:'430px'}" shadow="hover">
          <!-- 头部 -->
          <div class="header" style="margin-bottom:70px;">
            <span>平台用户占比</span>
          </div>
          <!-- 数据部 -->
          <echart :chartData="echartData.pieData" :isAxisChart="false" style="height:255px;width:100%;"></echart>
        </el-card>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import { getData } from '../../api/data.js'
// 获取封装的Echart组件
import Echart from '../../components/Echarts.vue'

export default {
  name: 'HomePage',
  components: {
    Echart
  },
  data () {
    return {
      // 人物模块的头像
      userImg: require('../../assets/images/user.png'),
      // 常规数据:平台数据(今日)
      commonData: [],
      // 表格数据:人气摄影师排行榜(月度总和)
      tableData: [],
      // 表格头部标签
      tableLabel: {
        name: "姓名",
        fansNum: "粉丝数",
        dealNum: "交易订单",
        starNum: "收获点赞",
      },
      // 折线图数据:本周用户活跃量
      // lineData: [],
      // 饼图数据:平台用户身份占比
      pieData: [],
      // 柱状图数据:新增用户与活跃用户数据(本周每日)
      barData: [],
      // 需要传入echart组件的数据
      echartData: {
        // lineData:{
        //   xData: [],
        //   series:[],
        // },
        pieData:{
          series:[],
        },
        barData:{
          xData: [],
          series:[],
        }
      }
    }
  },
  // mounted生命周期函数,用二次封装的axios的getData函数发起请求
  mounted () {
    getData().then(res => {
      //console.log(res)
      const { code, data } = res.data//code是响应码,data是数据
      if (code === 20000) {
        // 获取常规数据(平台数据)
        this.commonData = data.commonData

        // 获取表格数据(摄影师排行)
        this.tableData = data.tableData

        // 获取饼图数(平台各类用户占比)并用Echart渲染
        this.pieData = data.pieData
        this.echartData.pieData.series = [
          {
            data:this.pieData,
            type:'pie'
          }
        ]

        // 获取条形图数据(新增用户与活跃用户数据)并用Echart渲染
        this.barData = data.barData
        this.echartData.barData.xData = this.barData.map(item => item.date)
        this.echartData.barData.series = [
          {
            name:'新增用户',
            data:this.barData.map(item => item.new),
            type:'bar'
          },
          {
            name:'活跃用户',
            data:this.barData.map(item => item.active),
            type:'bar'
          },
        ]
      }
    })
  },
}
</script>

<style lang="less" scoped>
</style>