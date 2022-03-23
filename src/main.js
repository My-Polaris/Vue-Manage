import Vue from 'vue'
import App from './App.vue'
// 引入ElementUi及其样式
import { Button,
  Radio,
  Container,
  Main,
  Header,
  Aside,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Card,
  Table,
  TableColumn,
  Breadcrumb,
  BreadcrumbItem,
  Tag,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Switch,
  DatePicker,
  Dialog,
  Pagination,
  MessageBox,
  Message,
  Drawer,
  Descriptions,
  DescriptionsItem
} from 'element-ui'//按需引入
// import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 导入一些初始化的样式
import './assets/less/index.less'

// 引入vueRouter
import router from './router'
// 引入Vuex的配置文件
import store from './store'
// 引入axios
import axios from 'axios'
// 引入mock
import './api/mock.js'

Vue.config.productionTip = false
// Vue.use(ElementUI)
Vue.use(Button)
Vue.use(Radio)

// Container布局
Vue.use(Container)
Vue.use(Main)
Vue.use(Header)
Vue.use(Aside)
// 侧边栏
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)

// Layout布局
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)

// 表格布局
Vue.use(Table)
Vue.use(TableColumn)

// 面包屑组件引入
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)

Vue.use(Tag)
Vue.use(Dialog)
// 分页布局
Vue.use(Pagination)

// 抽屉布局
Vue.use(Drawer)

// 表单布局
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Switch)
Vue.use(DatePicker)

// 描述布局
Vue.use(Descriptions)
Vue.use(DescriptionsItem)

// 绑定axios
Vue.prototype.$http = axios
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message

// 导航守卫
router.beforeEach((to,from,next) => {
  store.commit('getToken');//获取Token,这里写是为了防止页面刷新丢失token信息
  const token = store.state.user.token//获取token
  // console.log(to.path)
  if(!token && to.name !== 'login') {//没token而且to不指向login路由
    next({ name:'login' });//返回login页面
  }
  else if(token && to.name == 'login'){// 如果已经登陆了还要访问/login页,跳转至/home页,退出当前账号的登陆才可进行登陆
    next({ name:'home' })
  }
  else {
    next()
  }
}) 

const app = new Vue({
  store,
  router,
  render: h => h(App),
  created() {
    store.commit('addMenu',router)//登陆时调用,刷新页面时也要调用(检测Cookie有没有Token,有就渲染)
    router.push({ name:'home' })//刷新页面了就直接跳转到home页,避免信息不对称
  }
})

app.$mount('#app')
