<template>
  <div class="tabs">
    <!-- 这里注意$route.name表示当前路由的名字 -->
    <el-tag
    size="small"
    v-for="(tag,index) in tags"
    :key="tag.name" 
    :closable="tag.name !== 'home'" 
    :effect="$route.name === tag.name?'dark':'plain'"
    @click="changeMenu(tag)"
    @close="handleClose(tag,index)">
      {{tag.label}}
    </el-tag>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
export default {
  name:'CommonTag',
  data() {
    return {

    }
  },
  computed: {
    //等同于:tags(){ this.$store.tab.tabsList }
    ...mapState({
      tags:state=> state.tab.tabsList
    })
  },
  methods:{
    // 获取$store.tab的mutations函数closeTag,此后close(a)=this.$store.commit("closeTag",a)
    ...mapMutations({
      close: 'closeTag'
    }),
    changeMenu(item) {
      this.$router.push({
        name:item.name
      })
    },
    handleClose(tag,index) {
      const length = this.tags.length - 1
      this.close(tag)
      if(tag.name !== this.$route.name) {//如果要删除的tag和当前的路由不一致.不需要切换焦点
        return;
      }
      // 走到这里说明要删除的tag和当前的路由一致
      if(index === length) {//如果删除的是最后一个元素,则焦点位移到上一个元素
        this.$router.push({
          name:this.tags[index-1].name
        })
      }
      else {//否则焦点应该往右进行跳转
        this.$router.push({
          name:this.tags[index].name
        })
      }

    }
  }
}
</script>

<style lang="less" scoped>
.tabs {
  padding: 15px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>