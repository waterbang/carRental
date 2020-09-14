const api = {
  //---------------------------------------------首页
  //首页推荐车型
  "INDEX_RECOMMEND" : "index/indexmodel",
  //首页二手车车型
  "INDEX_SECOND_HAND" : "index/indexsell",
  //积分签到
  "INTEGRAL_SIGN" :"sign/click",
  // 获取总积分
  "INTEGRAL_GROSS":"sign/obtain",

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
  // 设置订单状态
  "ORDER_STATUS":"order/orderstatus",
  // 取消订单
  "ORDER_CANCEL":"order/ordercancel",
  //删除订单
  "ORDER_DELETE":"order/orderdel",
 //---------------------------------------------用户相关
  //获取session_key的接口地址
 "GET_OPENID" : "GetweChat/getopenid",
 //获取手机号接口地址
 "GET_IPHONE" : "GetweChat/getphonenumber",
 //后台获取用户信息
 "GET_USERINFO": "GetweChat/getuserinfo",

 //---------------------------------------------支付
 //支付
  "WXPAY_ORDER":"order/wxpay",
  // 查看订单是否已支付
  "WX_PAYMENT":"order/update_status"
}


export default api;