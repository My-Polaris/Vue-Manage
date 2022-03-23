// axios简单的二次封装
import axios from 'axios'
import config from '@/config'

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro;//根据当前环境配置不同的baseUrl

// ES6类封装,axios就被封装到这个HttpRequest类中
class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  //定义axios相关的配置
  getInsideConfig () {
    const config = {
      baseUrl: this.baseUrl,
      header: {}//有些时候需要统一为发出去的请求添加header
    }
    return config
  }

  // 拦截器
  interceptors (instance) {
    // 添加请求拦截器
    instance.interceptors.request.use(function (config) {
      // 在发送请求之前做些什么
      return config;
    }, function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    });

    // 添加响应拦截器
    instance.interceptors.response.use(function (response) {
      // console.log(response,'response')
      // 2xx 范围内的状态码都会触发该函数。
      // 对响应数据做点什么
      return response;
    }, function (error) {
      // console.log(error,'error')
      // 超出 2xx 范围的状态码都会触发该函数。
      // 对响应错误做点什么
      return Promise.reject(error);
    });
  }

  // 后续接口请求的时候调用的request函数,options会传入url,method,data等配置信息的对象,request函数就用于组合成完整的对象
  request (options) {
    const instance = axios.create() //创建axios对象
    options = { ...this.getInsideConfig(),...options } //获取配置信息(如baseUrl)与原本的options组合成新的options
    this.interceptors(instance) //为这个axios对象添加拦截器
    return instance(options)//return构建完的对象
  }
}

export default new HttpRequest(baseUrl)