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

// 反馈日期降序排序,先看最近的
function desc(a,b){
  return Date.parse(b.date)-Date.parse(a.date)
}

let List = []
const count = 200
let typeList = ['问题反馈','功能建议']

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: Mock.Random.guid(),
      type:typeList[Mock.Random.integer(0,1)],
      description:Mock.Random.csentence(),
      date:Mock.Random.date()
    })
  )
}

export default {
  /**
   * 获取列表
   * 要带参数 type, page, limit; type可以不填,page,limit均有默认值。
   * @param type, page, limit
   * @return {{code: number, count: number, data: *[]}}
   */
  getList: config=> {
    const { type,page = 1, limit = 20 } = param2Obj(config.url)
    const mockList = List.filter(x => {
      //有传入type参数且type字段不符合传入的type的返回false
      if (type && x.type.indexOf(type) === -1) return false
      return true
    }).sort(desc)
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 20000,
      count: mockList.length,
      list: pageList
    }
  }
}