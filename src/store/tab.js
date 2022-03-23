import Cookie from 'js-cookie'
export default {
  state: {
    isCollapse:false,
    // 面包屑列表
    tabsList:[
      {
        path:'/',
        name:'home',
        label:'首页',
        icon:'home',
      }
    ],
    // 记录当前选中的路由是哪一项
    currentMenu:null,
    menu:[],
    isMenuFinish:false,
  },
  mutations:{
    // 是否展开菜单栏
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    },
    // 用于改变面包屑(tabList)
    selectMenu(state,val) {//val是传入的item
      if(val.name !== 'home') {
        state.currentMenu = val
        // 判断面包屑中是否已经存在该项,如果为-1则不存在
        const result = state.tabsList.findIndex(item => item.name === val.name)
        if(result === -1){//如果不存在则将该栏添加进去
          state.tabsList.push(val)
        } else {//如果选中的是首页
          state.currentMenu = null
        }
      }
    },
    // 删除对应的tabsList
    closeTag(state,val) {
      const result = state.tabsList.findIndex(item => item.name === val.name);
      state.tabsList.splice(result,1);//从result位置开始,删除1个元素
    },
    // 根据不同用户获取到不同的menu
    setMenu(state,val) {
      state.menu = val
      Cookie.set('menu',JSON.stringify(val))//用Cookie存一下,防止刷新之后菜单就不存在了
    },
    // 清除Menu菜单
    clearMenu(state) {
      state.menu = []
      Cookie.remove('menu')//清除menu
    },
    // 完成路由的动态添加
    addMenu(state,router) {
      if(!Cookie.get('menu')) {//如果Cookie中没有存菜单就直接结束
        return 
      }
      //console.log(JSON.parse(Cookie.get('menu')))
      const menu = JSON.parse(Cookie.get('menu'));//否则获取该路由
      state.menu = menu //menu更新
      const menuArray = []  //对应的组件数组
      // 后台传送的menu的属性: path,name,label,icon,url,可能会有children
      // 动态路由所需要的属性: name,path,component
      menu.forEach(item => {// 处理一级菜单和二级菜单(变换成路由)
        if(item.children) {// 如果是二级菜单
          item.children = item.children.map(item => {//深层声明component
            // console.log(item)
            item.component = () => import(`../views/${item.url}`)
            return item
          })
          menuArray.push(...item.children)
        }
        else {//如果是一级菜单
          item.component = () => import(`../views/${item.url}`)//直接声明component
          menuArray.push(item)
        }
      });
      // 动态路由的添加,router.addRoutes是直接添加整个数组路由,router.addRoute是添加单个路由,同时可以用于为现有路由添加子路由
      // router.addRoutes(menuArray)
      menuArray.forEach(item => {
        router.addRoute('Main',item)
      })
      state.isMenuFinish = true //加载完毕
      // console.log(router)
    } 
  }
}