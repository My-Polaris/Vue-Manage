<template>
  <div class="common-table">
    <!-- 留有10%的高度给分页 -->
    <el-table :data="tableData" height="90%" stripe>
      <!-- 这是以纵列为单位进行遍历的,show-overflow-tooltip表示内容过长时显示滚动条 -->
      <el-table-column 
        show-overflow-tooltip
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :min-width="item.width ? item.width : 125"
        :prop="item.prop"
        align="center"
      >
      </el-table-column>
      <!-- extra具名插槽，可以用于添加操作列,编辑删除什么的 -->
      <slot name="extra"></slot>
    </el-table>
    <!-- 分页组件,page.size是每页显示的条目个数,默认每页显示8条数据,@current-change不用传入值,因为config.page已经双向绑定了 -->
    <el-pagination
      class="pager"
      layout="prev,pager,next"
      :total="config.total"
      :current-page.sync="config.page"
      @current-change="changePage"
      :page-size="config.pageSize"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name:'CommonTable',
  props:{
    // 表格数据与标签,每个Label的属性为:prop字段名,label标签名,width列宽
    tableData:Array,
    tableLabel:Array,
    // 其中,total表示总条目数,page表示显示的页面号
    config:Object
  },
  data() {
    return {

    }
  },
  methods:{
    // 改变当前分页触发的事件
    changePage() {
      let page = this.config.page
      this.$emit('changePage',page)
    },
  }
}
</script>

<style lang="less" scoped>
.common-table {
  height: calc(100% - 40px);
  background-color: #fff;
  position: relative;
  .pager {
    position: absolute;
    bottom: 10px;
    right: 20px;
  }
}
</style>