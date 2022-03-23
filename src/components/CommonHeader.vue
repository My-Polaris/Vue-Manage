<template>
  <header>
    <!-- 头部栏左区域 -->
    <div class="l-content">
      <el-button @click="handleMenu" plain icon="el-icon-menu" size="mini"></el-button>
      <!-- <h3 style="color:#fff">首页</h3> -->
      <!-- ElementUI的面包屑组件,根据vuex的tabsList生成 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 头部栏右区域 -->
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <span>
          <img class="user" :src="userImg">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <!-- 组件上监听事件是需要添加.native修饰符的 -->
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex';//引入vuex的mapState函数
export default {
  name: 'CommonHeader',
  data () {
    return {
      userImg: require('../assets/images/user.jpg')
    }
  },
  methods: {
    // 收回侧边栏按钮的点击事件,向vuex发起collapseMenu事件收回侧边栏
    handleMenu () {
      this.$store.commit('collapseMenu')
    },
    // 退出登陆
    logOut() {
      this.$store.commit("clearToken")//清除token
      this.$store.commit("clearMenu")//清除Menu
      this.$router.push('/login')//跳转至登录页
    }
  },
  computed: {
    ...mapState({//将tabsList全部映射到计算属性tags中
      tags: state => state.tab.tabsList
    })
  }
}
</script>

<style lang="less" scoped>
header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}
.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
  }
}
// 顶部面包屑样式,/deep/表示深层嵌套,即选子组件
.el-breadcrumb__item{
  /deep/ .el-breadcrumb__inner {
    &:hover{
      color: #3f72af;
    };
    color: #3e4149;
  }
}
// 最后一个元素的字体颜色改成白色,同时鼠标改为pointer
.el-breadcrumb__item:last-child{
  /deep/ .el-breadcrumb__inner {
    color: #f5f5f5;
    cursor: pointer;
  }
}
</style>