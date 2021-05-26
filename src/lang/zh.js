import  {common}  from './system/platform/common/zh'
import  {login}  from './system/platform/login/zh'
import  {user}  from './system/platform/user/zh'
import  {menu}  from './system/platform/menu/zh'
import  {message}  from './system/platform/message/zh'
import  {config}  from './system/platform/config/zh'
import  {setting}  from './system/platform/setting/zh'
import  {log}  from './system/platform/log/zh'




// ---------------------------------------
// 模块

import  {organization}  from './module/platform/organization/zh'

import  {member}  from './module/platform/member/zh'
import  {merchant}  from './module/platform/merchant/zh'

import  {advertising}  from './module/platform/advertising/zh'

import  {order}  from './module/platform/order/zh'

import  {complain}  from './module/platform/complain/zh'

import  {financial}  from './module/platform/financial/zh'

import  {problem}  from './module/platform/common/problem/zh'

import  {car}  from './module/platform/car/zh'

import  {logistics}  from './module/platform/logistics/zh'

export default {

  // 公共
  common: {
    ...common
  },

  // 登录
  login: {
    ...login
  },

  // 用户
  user: {
    ...user
  },

  // 菜单
  menu: {
    ...menu
  },

  // 消息
  message: {
    ...message
  },

  // 配置
  config: {
    ...config
  },

  // 设置
  setting: {
    ...setting
  },

  // 日志
  log: {
    ...log
  },

  // ------------------------------------

  // 广告
  advertising: {
    ...advertising
  },

  // 机构
  organization: {
    ...organization
  },

  // 消费者
  member: {
    ...member
  },

  // 车商
  merchant: {
    ...merchant
  },

  // 订单
  order: {
    ...order
  },


  // 投诉
  complain: {
    ...complain
  },

  // 财务
  financial: {
    ...financial
  },

  // 常见问题
  problem: {
    ...problem
  },

  // 汽车
  car: {
    ...car
  },

  // 物流
  logistics: {
    ...logistics
  }
}
