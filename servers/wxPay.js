
import { payMentOfAnOrder,pollingOrderPay } from '../models/pay'
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
        },
        fail: (err) =>{
          wx.showToast({
            title:"取消支付！",
            icon:"none"
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
  wxPay(payData);
}

const pollPay = (uid, o_id, no = false) => {
  wx.showLoading({
    title: '正在核对订单',
  })
  let paying = false;
  let index = 0;
  const timeId = setInterval(() => {
    if (paying == true) { //订单成功
      clearInterval(timeId)
      setTimeout(() => {
        wx.hideLoading()
        wx.showToast({
          title:"支付成功！"
        })
        wx.reLaunch({
          url: '/pages/order/order',
        })
      },100)
    };
    if (index === 3) { // 订单失败
      clearInterval(timeId)
      if (!no) {
          wx.hideLoading();
          wx.showToast({
            title:"取消支付！"
          })
          wx.reLaunch({
            url: '/pages/order/order?status=3',
          })
      } else {
        wx.hideLoading();
        wx.showToast({
          title:"取消支付！"
        })
      }
    }
    checkPaymentDone(uid, o_id);
  },1000)
    const checkPaymentDone = async (uid, o_id) => {
    index++;
    let result = await pollingOrderPay(uid, o_id);
    console.log(result);
    if (result.code == 200) {
      paying = true;
    }
    }
}

module.exports = {
  wxPay,
  wxPayMeet,
  pollPay
}