<template>
  <el-form ref="myForm" label-vidth="100px" :model="form" :rules="rules" :inline="inline" status-icon>
    <!-- 输入框,选择框,日期选择器,下拉框的formItem -->
    <el-form-item v-for="item in formLabel" :key="item.label" :label="item.label" :prop="item.model">
      <!-- 输入框组件 -->
      <el-input
        v-if="item.type === 'input'"
        :placeholder="'请输入' + item.label"
        v-model="form[item.model]"
        @keydown.enter.native="keydownForEnter"
      ></el-input>
      <!-- 选择框switch组件 -->
      <el-switch v-if="item.type === 'switch'" v-model="form[item.model]"></el-switch>
      <!-- 日期选择器组件 -->
      <el-date-picker
        v-if="item.type === 'date'"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择日期"
        v-model="form[item.model]"
      ></el-date-picker>
      <!-- 下拉框组件 -->
      <el-select
        v-if="item.type === 'select'"
        placeholder="请选择"
        v-model="form[item.model]"
      >
        <!-- 下拉值组件 -->
        <el-option
          v-for="item in item.opts"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <!-- 插槽formItem -->
    <el-form-item>
      <slot></slot>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name:'CommonForm',
  data() {
    return {
      
    }
  },
  emits:['keydownForEnter'],
  props:{
    formLabel:Array,//标签名
    form: Object,//数据
    inline: Boolean,//表单布局,是否单行显示
    rules:Object,//表单校验规则
  },
  methods:{
    keydownForEnter(){
      this.$emit('keydownForEnter');//提交键盘Enter按钮的监听事件
    }
  }
}
</script>

<style lang="less" scoped>

</style>