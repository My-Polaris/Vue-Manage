<template>
  <div class="manage">
    <!-- 封装的表格引用 -->
    <common-table :tableData="tableData" :tableLabel="tableLabel" :config="config" @changePage="getList('')"></common-table>
  </div>
</template>

<script>
import { getFeedbackList } from '../../api/data.js'
import CommonTable from '../../components/CommonTable.vue'
export default {
  name: 'feedback',
  components:{
    CommonTable
  },
  data () {
    return {
      tableData: [],
      tableLabel: [
        {
          prop: "type",
          label: "问题类型",
        },
        {
          prop: "date",
          label: "反馈日期",
        },
        {
          prop: "description",
          label: "反馈详情",
          width:400,
        },
      ],
      // 分页相关配置
      config: {
        page: 1,
        total: 30,
        pageSize: 20
      }
    }
  },
  methods: {
    // 获取列表
    getList (type = '') {
      this.config.loading = true//显示loading
      getFeedbackList({
        type,
        page:this.config.page,
        limit:this.config.pageSize
      }).then(({data: res}) => {
        this.tableData = res.list
        this.config.total = res.count
        this.config.loading = false;//加载完后取消loading显示
      })
    }
  },
  created(){
    this.getList()
  }
}
</script>

<style lang="less" scoped>
</style>