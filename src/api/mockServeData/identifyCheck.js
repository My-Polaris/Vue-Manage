import Mock from 'mockjs'

// get请求从config.url获取参数，post从config.body中获取参数
function param2Obj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  )
}

//日期格式化
function dateFormat(fmt, date) {
  let ret;
  const opt = {
      "Y+": date.getFullYear().toString(),        // 年
      "m+": (date.getMonth() + 1).toString(),     // 月
      "d+": date.getDate().toString(),            // 日
      "H+": date.getHours().toString(),           // 时
      "M+": date.getMinutes().toString(),         // 分
      "S+": date.getSeconds().toString()          // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      };
  };
  return fmt;
}

// 提交日期升序排序,优先审核提交早的
function asc(a,b){
  return Date.parse(a.submitTime)-Date.parse(b.submitTime)
}
// 审核日期降序排序,优先显示最近审核的
function desc(a,b){
  return Date.parse(b.checkTime)-Date.parse(a.checkTime)
}

let List = []
const count = 200

for (let i = 0; i < count; i++) {
  const phonePrefix = ['132', '135', '189','136']
  const index = Math.floor(Math.random() * phonePrefix.length)
  let phone = phonePrefix[index] + Mock.mock(/\d{8}/)
  let province = Mock.Random.province()
  let city = Mock.Random.city()
  let county = Mock.Random.county()
  let idPre = '445'
  let idCardPhotos = []
  let material = []
  for(let j=0;j<3;j++){
    let x = Mock.Random.image('150x100')
    idCardPhotos.push(x)
    material.push(x)
  }
  List.push(
    Mock.mock({
      id: Mock.Random.guid(),
      name: Mock.Random.cword(3,5),
      sex: Mock.Random.integer(0, 1),//0表示女,1表示男
      dealNum:Mock.Random.integer(15,55),//成交订单数
      phone:phone,//手机号码
      country:city,//居住地
      addr:`${province} ${city} ${county} ${Mock.Random.region()}大道 ${Mock.Random.zip()} 号`,//联系地址
      submitTime: Mock.Random.date(),//提交时间
      checkTime:Mock.Random.date(),//审核通过时间
      status:Mock.Random.integer(0,2),//0表示待审核,1表示审核通过,2表示审核被拒绝

      realName:Mock.Random.cname(),//真实名字
      idNum:idPre+Mock.Random.id(),//身份证号
      target:Mock.Random.integer(1,2),//1表示自由摄影师,2表示认证模特
      idCardPhotos,
      material
    })
  )
}

export default {
  /**
   * 获取列表,默认找待审核的
   * 要带参数 name, status,page,limit; name可以不填(name可以是具体姓名,也可以是认证目标), status,page,limit有默认值。
   * @param name, status,page,limit
   * @return {{code: number, count: number, data: *[]}}
   */
  getList: config => {
    // console.log(config)
    const { name, status=0,page = 1,limit = 20 } = param2Obj(config.url)
    const mockList = List.filter(user => {
      //有传入名字参数且姓名与认证目标都不包含该名字参数才返回false
      if (name && user.name.indexOf(name) === -1 && user.target.indexOf(name) === -1) return false
      return true
    })
    let sortRule = status==0?asc:desc//未审核按照升序排序,审核完成的和审核拒绝的按照降序排序
    const resultList = mockList.filter(item => item.status == status).sort(sortRule)//筛选出相应status并按照日期排序
    const pageList = resultList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 20000,
      count: resultList.length,
      list:pageList,
    }
  },
  /**
   * 审核确认
   * @param id,remark
   * @return {*}
   */
  confirmCheck: config => {
    const { id,remark="确认无误,通过审核" } = JSON.parse(config.body)
    // console.log(id)
    if (!id) {
      return {
        code: -999,
        data: {
          message: '参数不正确'
        }
      }
    } else {
      let message
      List.forEach(u => {
        if(u.id == id){
          u.status = 1
          let date =new Date()//审核时间
          u.checkTime=dateFormat("YYYY-mm-dd",date)
          u.remark = remark
          message="用户 "+ u.name + " 审核通过"
        }
      })
      return {
        code: 20000,
        data: {
          message,
        }
      }
    }
  },
  /**
   * 审核拒绝
   * @param id,remark
   * @return {*}
   */
   refuseCheck: config => {
     console.log(config)
    const { id,remark="无脑拒绝" } = JSON.parse(config.body)
    // console.log(id)
    if (!id) {
      return {
        code: -999,
        data: {
          message: '参数不正确'
        }
      }
    } else {
      let message
      List.forEach(u => {
        if(u.id == id){
          u.status = 2
          let date =new Date()//审核时间
          u.checkTime=dateFormat("YYYY-mm-dd",date)
          u.remark = remark
          message="已拒绝用户 "+ u.name + " 的申请"
        }
      })
      return {
        code: 20000,
        data: {
          message,
        }
      }
    }
  }
}
