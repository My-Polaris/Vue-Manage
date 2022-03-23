<template>
    <el-form
      :model="form"
      status-icon
      :rules="rules"
      ref="form"
      label-width="100px"
      class="login-container"
    >
      <!-- 标题 -->
      <h3 class="login_title">后台管理系统登陆</h3>
      <!-- 第一个表单域 -->
      <el-form-item
        label="用户名"
        label-width="80px"
        prop="username"
        class="username"
      >
        <el-input
          type="input"
          v-model="form.username"
          autocomplete="off"
          placeholder="请输入账号"
        ></el-input>
      </el-form-item>
      <!-- 第二个表单域 -->
      <el-form-item
        label="密码"
        label-width="80px"
        prop="password"
      >
        <el-input
          type="password"
          v-model="form.password"
          autocomplete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item class="login_submit">
        <el-button type="primary" @click="login" class="login_submit">登陆</el-button>
      </el-form-item>
    </el-form>
</template>

<script>
import Mock from 'mockjs'
import { getMenu } from '../../api/data'
export default {
    name:'Login',
    data() {
      return {
        // 存放账号密码
        form:{

        },
        rules:{
          username:[
            { required:true,message:"请输入用户名",trigger:"blur" },
            {
              min:3,
              message:'用户名长度不能小于3位',
              trigger:'blur',
            },
          ],
          password:[
            { required:true,message:"请输入密码",trigger:"blur" },
          ]
        },
      }
    },
    methods:{
      // 登陆按钮监听事件
      login() {
        // 调用二次封装axios的getMenu
        getMenu(this.form).then(({data: res}) => {
          if(res.code === 20000)  {//如果成功
            console.log(res)
            // vuex的tab.js中的操作
            this.$store.commit('clearMenu')//清除vuex和Cookie头部的路由菜单(之前的)
            this.$store.commit('setMenu',res.data.menu)//设置新的路由菜单,同时转换成JSON存到Cookie中(确保刷新了依旧有效)
            this.$store.commit('setToken',res.data.token)//设置vuex中的Token并将其添加到Cookie头部(Token就是要加到Cookie中,JWT机制)
            this.$store.commit('addMenu',this.$router)//vuex此时已经有menu了,依据这个menu添加动态路由到this.$router
            this.$router.push({ name:'home' })//跳转到首页
          } else {
            this.$message.warning(res.data.message)
          }
        })
        // const token = Mock.Random.guid()//生成随机数,模拟生成token
        // this.$store.commit("setToken",token)
        // this.$router.push({ name:'home' })//跳转到首页
      }
    }
}
</script>

<style lang="less" scoped>
.login-container {
  border-radius:15px;
  // 背景裁剪的内边距
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding:35px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.login_title {
  margin:0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.login_submit {
  margin: 10px auto 0px auto;
}
</style>