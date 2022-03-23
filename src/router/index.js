import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
      path:'/login',
      name:'login',
      component:()=> import("../views/Login/login.vue")
    },
    {
        path:'/',
        name:'Main',
        component:() => import('../views/Main.vue'),
        redirect:'/home',
        children:[
            // { path:'/home',name:'home',component:() => import('../views/Home') },
            // { path:'/user',name:'user',component:() => import('../views/Users') },
            // { path:'/mall',name:'mall',component:() => import('../views/Mall') },
            // { path:'/page1',name:'page1',component:() => import('../views/Other/pageOne.vue') },
            // { path:'/page2',name:'page2',component:() => import('../views/Other/pageTwo.vue') },
        ]
    }
]

//vue-router路由初始化
const router = new VueRouter({
    mode: 'history',//history模式,利用HTML5的Histroy API实现的,除此之外还有hash模式,类似于锚链接需要用#开头
    routes,
})

export default router