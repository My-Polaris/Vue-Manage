// HomePage页的mock数据模拟
import Mock from 'mockjs'

// 1.平台数据(今日),硬性数字
// 2.人气摄影师排行榜(月度总和),表格
// 3.本周用户活跃量,折线图
// 4.平台用户身份占比,饼图
// 5.新增用户与活跃用户数据(本周每日),柱状图
let yData = []
let tableData=[]
export default {
  getPlatformData: () => {
    //Mock.Random.float 产生随机数100到8000之间 保留小数 最小0位 最大0位
    for(let i=0;i<7;i++){
      yData.push(Mock.Random.float(2500, 8000, 0, 0));
    }
    // 表格数据初始化
    for(let i=0;i<20;i++){
      let table={}
      table.name=Mock.Random.cname()
      table.fansNum=Mock.Random.float(10000, 15000, 0, 0)
      table.dealNum=Mock.Random.float(50, 150, 0, 0)
      table.starNum=Mock.Random.float(500000, 100000, 0, 0)
      tableData.push(table)
    }
    return {
      code: 20000, 
      data: {
        // 常规数据:平台数据(今日)
        commonData:[
          {
            name:'新增用户',
            value:Mock.Random.float(100, 800, 0, 0),
            color:'#3296d9'
          },
          {
            name:'新增作品',
            value:Mock.Random.float(100, 800, 0, 0),
            color:'#f6da94'
          },
          {
            name:'新增动态',
            value:Mock.Random.float(100, 800, 0, 0),
            color:'#8ac668'
          },
          {
            name:'用户总访问量',
            value:Mock.Random.float(2000, 25000, 0, 0),
            color:'#8785a2',
          },
          {
            name:'订单数',
            value:Mock.Random.float(100, 800, 0, 0),
            color:'#3f72af'
          },
          {
            name:'平台交易总额',
            value:Mock.Random.float(1000, 4000, 0, 0),
            color:'#903749'
          },
        ],
        // 表格数据:人气摄影师排行榜(月度总和)
        tableData,
        // 折线图数据:本周用户活跃量
        lineData:{
          xData:['周日','周一','周二','周三','周四','周五','周六'],
          yData
        },
        // 饼图数据:平台用户身份占比
        pieData: [
          {
            name:'普通用户',
            value:Mock.Random.float(100, 8000, 0, 0)
          },
          {
            name:'实名用户',
            value:Mock.Random.float(100, 8000, 0, 0)
          },
          {
            name:'自由摄影师',
            value:Mock.Random.float(100, 8000, 0, 0)
          },
          {
            name:'认证模特',
            value:Mock.Random.float(100, 8000, 0, 0)
          }
        ],
        // 柱状图数据:新增用户与活跃用户数据(本周每日)
        barData: [
          {
            date: '周一',
            new: Mock.Random.float(100, 800, 0, 0),
            active: Mock.Random.float(1000, 8000, 0, 0)
          },
          {
            date: '周二',
            new: Mock.Random.float(100, 800, 0, 0),
            active: Mock.Random.float(1000, 8000, 0, 0)
          },
          {
            date: '周三',
            new: Mock.Random.float(100, 800, 0, 0),
            active: Mock.Random.float(1000, 8000, 0, 0)
          },
          {
            date: '周四',
            new: Mock.Random.float(100, 800, 0, 0),
            active: Mock.Random.float(1000, 8000, 0, 0)
          },
          {
            date: '周五',
            new: Mock.Random.float(100, 800, 0, 0),
            active: Mock.Random.float(1000, 8000, 0, 0)
          },
          {
            date: '周六',
            new: Mock.Random.float(100, 800, 0, 0),
            active: Mock.Random.float(1000, 8000, 0, 0)
          },
          {
            date: '周日',
            new: Mock.Random.float(100, 800, 0, 0),
            active: Mock.Random.float(1000, 8000, 0, 0)
          }
        ]
      }
    }
  }
}