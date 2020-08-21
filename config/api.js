const api = {
  //---------------------------------------------首页
  //首页推荐车型
  "INDEX_RECOMMEND" : "index/indexmodel",
  //首页二手车车型
  "INDEX_SECOND_HAND" : "index/indexsell",


  //---------------------------------------------分类页
  // 分类车辆接口列表
  "CLASSIFY_TYPE" : "type/type",
  "CLASSIFY_TYPE_DATA" : "type/typedatail",

  //---------------------------------------------车辆详情页
  //获取车辆详情
  "RESERVE_DETAIL":"index/details",
  
  //---------------------------------------------订单接口
  //增加订单接口
  "ORDER_ADD":"order/addorder",

  // 获取订单列表
  "ORDER_LIST":"order/orderdata",

 //---------------------------------------------用户相关
  //获取session_key的接口地址
 "GET_OPENID" : "GetweChat/getopenid",
 //获取手机号接口地址
 "GET_IPHONE" : "GetweChat/getphonenumber",
 //后台获取用户信息
 "GET_USERINFO": "GetweChat/getuserinfo"

}


export default api;