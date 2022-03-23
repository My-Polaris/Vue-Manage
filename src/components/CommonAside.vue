<template>
  <el-menu :default-active="$route.path" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
    <h3>{{isCollapse ? '后台':'后台管理系统'}}</h3> 
    <!-- 渲染:没有子菜单的一级菜单 -->
    <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :index="item.path" :key="item.path">
      <!-- 读入icon名与label名 -->
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">
        {{item.label}}
      </span>
    </el-menu-item>
    <!-- 渲染:具有子菜单的多级菜单 -->
    <el-submenu v-for="item in hasChildren" :index="item.path+''" :key="item.path">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{item.label}}</span>
      </template>
      <el-menu-item-group v-for="(subItem,subIndex) in item.children" :key="subItem.path">
        <el-menu-item @click="clickMenu(subItem)" :index="subIndex+''">{{subItem.label}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "CommonAside",
  data () {
    return {
      //isCollapse: false,
      // 菜单信息,实际中应由ajax获取,这里先写死(现在不需要了,由asyncMenu计算属性代替)
      menu: []
    };
  },
  computed: {
    noChildren () {//仅一级菜单
      return this.asyncMenu.filter(item => !item.children);
    },
    hasChildren () {//含多级菜单
      return this.asyncMenu.filter(item => item.children)
    },
    isCollapse() {//来自Header的数据,由vuex监听是否收回侧边栏
      return this.$store.state.tab.isCollapse
    },
    asyncMenu() {//动态获取menu
      return this.$store.state.tab.menu
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    },
    // 侧边栏跳转,注意,这里的跳转是跳转到传入的item的name属性,所以name属性要于vue-router里的配置高度一致
    clickMenu(item) {
      this.$router.push({
        name:item.name
      })
      this.$store.commit('selectMenu',item)//item传入menu中对应的属性
      // console.log(this.$route)
    }
  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100%;
  border: none;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
}
</style>