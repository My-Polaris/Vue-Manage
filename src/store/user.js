import Cookie from 'js-cookie'
export default {
  state:{
    token:''
  },
  mutations: {
    // 发请求的时候发token
    setToken(state,val) {
      state.token = val
      // 把token放在Http头部的Cookie中
      Cookie.set('token',val)
    },
    // 清除token
    clearToken(state) {
      state.token = ''
      Cookie.remove('token') 
    },
    // 接相应的时候拿token
    getToken(state) {
      state.token = state.token || Cookie.get('token')
    }
  }
}