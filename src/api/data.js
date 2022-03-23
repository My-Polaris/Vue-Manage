// 将接口请求都写在这个data.js文件里
import axios from "./axios";//这里接受的axios已经是二次封装对象HttpRequest了

export const getMenu = (param)=> {
  return axios.request({
    url:'/permission/getMenu',
    method:'post',
    data:param
  })
}

export const getData = ()=> {
  return axios.request({
    url:'/home/getData'
  })
}

export const getUser = (params) => {
  // console.log(params)
  return axios.request({
    url:'/user/getUser',
    method:'get',
    params
  })
}

export const getIdentifyList = (params) => {
  // console.log(params)
  return axios.request({
    url:'/identify/getUser',
    method:'get',
    params
  })
}

export const getFeedbackList = (params) => {
  // console.log(params)
  return axios.request({
    url:'/feedback/getList',
    method:'get',
    params
  })
}
