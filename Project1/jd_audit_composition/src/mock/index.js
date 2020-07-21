import phone from './phone'
var Mock = require('mockjs')

// 拦截联系人
Mock.mock('/phone/list', 'get', () => {
  return phone
})
