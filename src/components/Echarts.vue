<template>
  <div ref="echart"></div>
</template>

<script>
// 封装的Echart组件
import * as echart from 'echarts'
export default {
  //传入的参数,isAxisChart参数:是否有x轴; chartData参数:Option,关键是xData与series
  props: {
    // 是否有x轴和y轴
    isAxisChart: {
      type: Boolean,
      default: true,
    },
    //接收传进来的Option参数
    chartData: {
      type: Object,
      default () {
        return {
          xData: [],
          series:[],
        }
      }
    }
  },
  //数据监听,chartData数据改变的时候调用methods进行数据更新与渲染(包含第一次填充)
  watch: {
    chartData:{
      handler:function() {
        this.initChart();
      },
      // 首次获取也得监听
      deep:true,
    }
  },
  // 存放被渲染的最终数据
  data () {
    return {
      // 有横纵坐标时的Option
      axisOption: {
        // 图例
        legend: {
          //图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        // 直角坐标系
        grid: {
          //grid 组件离容器左侧的距离
          left: "20%",
        },
        // 提示框
        tooltip: {
          // 坐标轴触发
          trigger: "axis",
        },
        // x轴
        xAxis: {
          type: "category", // 类目轴,适用于离散的类目数据
          // x轴数据
          data: [],
          // 坐标轴线相关设置
          axisLine: {
            // 坐标轴线的颜色
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        // y轴
        yAxis: [
          {
            type: "value",//竖直轴
            // 坐标轴线相关设置
            axisLine: {
              // 坐标轴线颜色
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        // 调色盘颜色,依次使用
        color: ["#b83b5e", "#3f72af", "#3d84a8", "#f67280", "#928a97", "#f85f73"],
        // series元素:name,data,type三个属性构成的对象
        series: [],
      },
      // 无横纵坐标时的Option
      normalOption: {
        // 提示框
        tooltip: {
          // 数据项图形触发
          trigger: "item",
        },
        // 颜色池
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [],
      },
      //表示echart是否重新渲染了
      echart:null,
    }
  },
  // 根据传入的props初始化或更新data中的axisOption或normalOption,并最终引用option计算属性完成echart更新
  methods:{
    // 初始化或更新eCharts:将计算属性options渲染到页面,该函数被watch侦听器调用
    initChart() {
      this.initChartData()
      if(this.echart) {//如果已经渲染了,更改配置就好了,不用调用echart的init初始化
        this.echart.setOption(this.options)
      }
      else {//否则就照常
        this.echart = echart.init(this.$refs.echart)
        this.echart.setOption(this.options)
      }
    },
    // 根据传入的props更改data
    initChartData() {
      // 折线图(有横纵坐标)初始化与监听修改,修改横坐标与series
      if(this.isAxisChart) {
        this.axisOption.xAxis.data = this.chartData.xData,//有横坐标就赋值横坐标
        this.axisOption.series = this.chartData.series
      }
      // 饼状图(无横纵坐标)初始化与监听修改,仅修改series
      else {
        this.normalOption.series = this.chartData.series
      }
    }
  },
  // 根据props传入的isAxisChart构造options计算属性
  computed: {
    options () {
      return this.isAxisChart ? this.axisOption:this.normalOption;
    }
  }
}
</script>
