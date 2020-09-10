
import { payMentOfAnOrder } from '../models/pay'
const wxPay = (obj) => {
    wx.requestPayment({
        timeStamp: obj.timeStamp,
        nonceStr: obj.nonceStr,
        package: obj.package,
        signType: 'MD5',
        paySign: obj.paySign,
        success:(res) => {
          wx.showToast({
            title:"支付成功！"
          })
          wx.reLaunch({
            url: '../pages/order/order',
          })
            console.log(res)        
        },
        fail: (err) =>{
          wx.showToast({
            title:"支付失败！",
            icon:"none"
          })
          wx.reLaunch({
            url: '/pages/order/order?status=3',
          })
          console.log(err)
        }
        }
    )
}

 // 获取后端支付
 const wxPayMeet = async (data) => {
  const {o_id, uid} = data;
  if ( !o_id || !uid) {
    wx.showToast({
      title:"订单异常，请重新下单！",
      icon:"none"
    })
    return;
  }
  let payData = await payMentOfAnOrder(uid, o_id);
  await wxPay(payData.data)
}

const pollPay = () => {

}

module.exports = {
  wxPay,
  wxPayMeet
}