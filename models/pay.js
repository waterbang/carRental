import API from '../config/api';
import { post } from '../utils/request'

//订单支付
const payMentOfAnOrder = (uid, o_id) => post(API.WXPAY_ORDER,{uid, o_id}).then(res => {return res}).catch(err => {return err})

// 查看订单是否支付成功
const pollingOrderPay = () => post().then(res => {return res}).catch(err => {return err})

module.exports = {
  payMentOfAnOrder,
  pollingOrderPay
}