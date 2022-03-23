<template>
  <div class="manage">
    <!-- 抽屉栏 -->
    <el-drawer :title="checkInfo.name+'的认证详情'" :visible.sync="drawer" :direction="direction" size="50%">
      <!-- 基本信息栏 -->
      <el-descriptions title="基本信息" :column="3" size="medium" border style="margin:30px">
        <template slot="extra">
          <el-button type="danger" :disabled="checkInfo.status==2" @click="dialogFormVisible=true">拒绝申请</el-button>
          <el-button type="primary" :disabled="checkInfo.status==1" @click="confirmCheck(checkInfo.id)">确认审核</el-button>
        </template>
        <el-descriptions-item v-for="item in baseInfoLabelList" :key="item.name" :span="item.span?item.span:''">
          <template slot="label">
            <i :class="item.icon"></i>
            {{item.label}}
          </template>
          {{checkInfo[item.prop]}}
        </el-descriptions-item>
      </el-descriptions>
      <!-- 认证信息栏 -->
      <el-descriptions title="认证信息" :column="3" size="medium" border style="margin:30px">
        <el-descriptions-item v-for="item in checkInfoLabelList" :key="item.realName" :span="item.span?item.span:''">
          <template slot="label">
            <i :class="item.icon"></i>
            {{item.label}}
          </template>
          <!-- 是对象类型就不显示值了 -->
          {{typeof checkInfo[item.prop]=='object'?'':checkInfo[item.prop]}}
          <!-- 是对象类型就遍历显示出图片 -->
          <div v-if="typeof checkInfo[item.prop]=='object'">
            <img v-for="(path,index) in checkInfo[item.prop]" :key="index" :src="path" style="margin:10px" />
          </div>
        </el-descriptions-item>
      </el-descriptions>
      <!-- 相关审核信息栏 -->
      <el-descriptions title="审核结果" :column="3" size="medium" border style="margin:30px" v-if="checkInfo.status>=1">
        <el-descriptions-item v-for="item in resultLabelList" :key="item.id" :span="item.span?item.span:''">
          <template slot="label">
            <i :class="item.icon"></i>
            {{item.label}}
          </template>
          {{checkInfo[item.prop]}}
        </el-descriptions-item>
      </el-descriptions>
    </el-drawer>
    <!-- 对话框,输入拒绝申请的原因 -->
    <el-dialog :title="'是否拒绝用户 '+checkInfo.name+' 的申请'" :visible.sync="dialogFormVisible">
      <el-form @submit.native.prevent >
        <el-form-item label="拒绝原因">
          <el-input v-model="refuseReason" @keyup.enter.native="refuseCheck(checkInfo.id)"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="refuseCheck(checkInfo.id)">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 表格头部 -->
    <div class="manage-header" style="margin:10px">
      <el-button type="warning" :plain="config.status!=0" @click="toggleStatus(0)">待审核</el-button>
      <el-button type="success" :plain="config.status!=1" @click="toggleStatus(1)">审核通过</el-button>
      <el-button type="danger" :plain="config.status!=2" @click="toggleStatus(2)">审核未通过</el-button>
    </div>
    <!-- 封装的表格引用 -->
    <common-table :tableData="tableData" :tableLabel="tableLabel" :config="config" @changePage="getList('')">
      <template v-slot:extra>
        <el-table-column label="操作" min-width="300">
          <template slot-scope="scope">
            <!-- scope会传出所在的row,column与$index -->
            <el-button :type="scope.row.status?(scope.row.status==1?'success':'danger'):'warning'" plain size="mini" @click="showInfo(scope.row)">查看认证详情</el-button>
          </template>
        </el-table-column>
      </template>
    </common-table>
  </div>
</template>

<script>
import { getIdentifyList } from '../../api/data.js'
import CommonTable from '../../components/CommonTable.vue'
export default {
  name: 'identityCheck',
  components: {
    CommonTable
  },
  data () {
    return {
      drawer: false,//抽屉层显示
      direction: 'rtl',//抽屉层弹出的方向
      dialogFormVisible: false,//对话框显示
      refuseReason: '',//拒绝原因
      baseInfoLabelList: [
        {
          prop: 'name',
          label: '用户名',
          icon: 'el-icon-user'
        },
        {
          prop: 'sexLabel',
          label: '性别',
          icon: 'el-icon-collection-tag'
        },
        {
          prop: 'phone',
          label: '手机号',
          icon: 'el-icon-mobile-phone'
        },
        {
          prop: 'country',
          label: '居住地',
          icon: 'el-icon-location-outline'
        },
        {
          prop: 'dealNum',
          label: '成交订单数',
          icon: 'el-icon-coin'
        },
        {
          prop: 'statusLabel',
          label: '审核状态',
          icon: 'el-icon-document'
        },
        {
          prop: 'submitTime',
          label: '提交日期',
          icon: 'el-icon-time'
        },
        {
          prop: 'addr',
          label: '联系地址',
          icon: 'el-icon-office-building',
          span: 2,
        },
      ],//基本信息标签与数据列表
      checkInfoLabelList: [
        {
          prop: 'realName',
          label: '真实姓名',
          icon: 'el-icon-user'
        },
        {
          prop: 'idNum',
          label: '身份证号',
          icon: 'el-icon-tickets',
          span: 2
        },
        {
          prop: 'targetLabel',
          label: '认证身份',
          icon: 'el-icon-position',
          span: 3
        },
        {
          prop: 'idCardPhotos',
          label: '身份证照片',
          icon: 'el-icon-money',
          span: 3
        },
        {
          prop: 'material',
          label: '审核资料',
          icon: 'el-icon-folder-opened',
          span: 3
        },
      ],//认证信息标签与数据列表
      resultLabelList: [
        {
          id: 1,
          prop: 'checkTime',
          label: '审核时间',
          icon: ''
        },
        {
          id: 2,
          prop: 'remark',
          label: '审核备注',
          icon: ''
        },
      ],//审核结果信息标签与数据列表
      checkInfo: {},//当前查看详情的用户信息
      tableData: [],
      tableLabel: [
        {
          prop: "submitTime",
          label: "提交时间",
          width: 250,
        },
        {
          prop: "name",
          label: "用户名",
        },
        {
          prop: "sexLabel",
          label: "性别",
        },
        {
          prop: 'dealNum',
          label: "交易订单数",
        },
        {
          prop: "targetLabel",
          label: "认证身份",
          width: 200,
        },
        {
          prop: "statusLabel",
          label: "审核状态",
        },
      ],
      // 分页的配置数据,page,total,pageSize三个参数要传入
      config: {
        status: 0,//status表示要筛选"待审核"的还是"审核通过"的
        page: 1,
        total: 30,
        pageSize: 20
      }
    }
  },
  methods: {
    // 提示框复用函数,成功的code值,实际的code值,提示消息,同时成功返回true,失败返回false
    MessageState (successCode, realCode, message) {
      if (realCode == successCode) {
        this.$message({
          type: "success",
          message
        })
        this.getList()
        return true
      }
      else {
        this.$message({
          type: "warning",
          message
        })
        return false
      }
    },
    // 拒绝申请
    refuseCheck (id) {
      this.$http.post('/identify/refuseCheck', { id, remark: this.refuseReason }).then(res => {
        console.log(res)
        const { code, data } = res.data
        const { message } = data
        this.MessageState(20000, code, message)//完成提示与获取列表
      })
      this.dialogFormVisible = false//收回弹出框
      this.drawer = false//收回抽屉
      this.refuseReason = ''//拒绝原因清空
    },
    // 确认审核
    confirmCheck (id) {
      this.$http.post('/identify/confirmCheck', { id }).then(res => {
        // console.log(res)
        const { code, data } = res.data
        const { message } = data
        if (code == 20000){
          this.drawer = false
        } 
        this.MessageState(20000, code, message)//完成提示与获取列表
      })
    },
    //弹出抽屉
    showInfo (checkInfo) {
      this.checkInfo = checkInfo
      this.drawer = !this.drawer
    },
    //切换查看审核列表
    toggleStatus (newVal) {
      if (this.config.status !== newVal) {
        this.config.status = newVal
        this.config.page = 1
        this.getList()
      }
    },
    // 获取列表
    getList (name = '') {
      this.config.loading = true//显示loading
        getIdentifyList({
          name,
          status: this.config.status,
          page: this.config.page,
          limit: this.config.pageSize
        }).then(({ data: res }) => {
          console.log(res);
          this.tableData = res.list.map(item => {//处理一下性别和认证目标的显示
            item.sexLabel = item.sex === 0 ? "女" : "男"
            item.targetLabel = item.target === 1 ? "自由摄影师" : "认证模特"
            if (item.status == 0) item.statusLabel = "待审核"
            else if (item.status == 1) item.statusLabel = "审核通过"
            else if (item.status == 2) item.statusLabel = "审核未通过"
            return item
          })
          if (this.config.status >= 1) {
            this.tableLabel[0].prop = "checkTime"
            this.tableLabel[0].label = "审核时间"
          }
          else {
            this.tableLabel[0].prop = "submitTime"
            this.tableLabel[0].label = "提交时间"
          }
          this.config.total = res.count
          this.config.loading = false;//加载完后取消loading显示
        })
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style lang="less" scoped>
.manage-header {
  display: flex;
  align-items: start;
}
</style>