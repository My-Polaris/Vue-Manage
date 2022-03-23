import Mock from 'mockjs'
export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body)
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (username === 'admin' && password === '123') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path:'/home',
              name:'home',
              label:'首页',
              icon:'s-home',
              url:'Home/index'
            },
            {
              path:'/member',
              name:'member',
              label:'会员管理',
              icon:'user',
              url:'Member/index'
            },
            {
              path:'/identity-check',
              name:'identityCheck',
              label:'认证审核',
              icon:'s-check',
              url:'IdentityCheck/index'
            },
            {
              path:'/feedback',
              name:'feedback',
              label:'反馈处理',
              icon:'message',
              url:'Feedback/index'
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else if (username === '普通用户' && password === '123') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path:'/home',
              name:'home',
              label:'首页',
              icon:'s-home',
              url:'Home/index'
            },
            {
              path:'/identity-check',
              name:'identityCheck',
              label:'认证审核',
              icon:'s-check',
              url:'IdentityCheck/index'
            },
            {
              path:'/feedback',
              name:'feedback',
              label:'反馈处理',
              icon:'message',
              url:'FeedBack/index'
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '密码错误'
        }
      }
    }

  }
}
