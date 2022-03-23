// mock.js用于拦截ajax请求生成随机数据
import Mock from 'mockjs'
import homeApi from './mockServeData/home.js' //获取HomePage的模拟数据
import userApi from './mockServeData/user.js'
import permissionApi from './mockServeData/permission'//获取用户权限相关的数据
import identifyApi from './mockServeData/identifyCheck.js'
import feedbackApi from './mockServeData/feedback.js'//获取反馈信息

Mock.mock('/home/getData',homeApi.getPlatformData)//拦截通往/home/getData的数据,返回模拟数据
Mock.mock(/user\/add/,'post',userApi.createUser)//拦截通往/user/add的请求,完成新增用户并返回响应值
Mock.mock(/user\/edit/,'post',userApi.updateUser)//拦截通往/user/edit的请求,完成修改用户并返回响应值

Mock.mock(/user\/getUser/,'get',userApi.getUserList)//拦截通往/user/getUser的请求,获取用户列表
Mock.mock(/user\/del/,'get',userApi.deleteUser)//拦截通往/user/del的请求,删除某个用户

Mock.mock(/permission\/getMenu/,'post',permissionApi.getMenu)//根据不同用户,获取他们各自能得到的菜单

Mock.mock(/identify\/getUser/,'get',identifyApi.getList)//获取审核的信息
Mock.mock(/identify\/confirmCheck/,'post',identifyApi.confirmCheck)//确认审核
Mock.mock(/identify\/refuseCheck/,'post',identifyApi.refuseCheck)//拒绝申请

Mock.mock(/feedback\/getList/,'get',feedbackApi.getList)//获取反馈的信息