// 使用 Mock
var Mock = require('mockjs')
var phone = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'list|10-30': [{
    // 属性 id 是一个自增数，起始值为 1，每次增 1
    'case_id|+1': 'case_zc_A1912200019',
    name: '@cname',
    'sex|0-1': 0,
    type: '12-JDBT',
    'finished|0-1': 0,
    'phone|13100000000-18899999999': 13100000000
  }]
})

export default phone
