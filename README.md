## Vue后台管理系统

#### 简介：

该系统服务于“咔嚓摄引平台”，旨在提供平台后台信息处理界面，提高管理员角色对平台业务信息的处理效率，主要涵盖功能有平台基本信息、会员管理，认证审核、反馈处理等。

前端技术栈：Vue全家桶 + ElementUI组件 + Echarts组件。

后端技术栈：暂未搭建。

数据源：由于咔嚓摄引平台未正式上线，数据暂时由mock.js进行请求拦截与数据生成。

#### 页面介绍与展示：

![Vue后台管理系统-登录页.png](https://s2.loli.net/2022/05/18/BuGWbCKXsUIiEhD.png)

​								↑登录页，基于JWT机制完成登录信息验证，同时返回动态路由。

![Vue后台管理系统-首页.png](https://s2.loli.net/2022/05/18/pJqh34KgnU9LZmO.png)

​																↑首页，展示平台近期基本信息。

![Vue后台管理系统-会员管理.png](https://s2.loli.net/2022/05/18/UAuBadOXGExTghI.png)

​														↑会员管理页面（超级管理员才允许操作会员管理）

![Vue后台管理系统-认证审核.png](https://s2.loli.net/2022/05/18/41BrNTWvbzgxaiG.png)

​													↑认证审核页面（按审核时间倒序排序，拒绝申请需填写理由）

![Vue后台管理系统-反馈处理.png](https://s2.loli.net/2022/05/18/mnKjtRNkbDF7TQw.png)

​															↑反馈处理页面（按反馈日期倒序排序）