import API from '../config/api';
import { post } from '../utils/request'

//订单支付
const payMentOfAnOrder = (uid, o_id) => post(API.WXPAY_ORDER,{uid, o_id}).then(res => {return res}).catch(err => {return err})

// 查看订单是否支付成功
const pollingOrderPay = (uid, o_id) => post(API.WX_PAYMENT,{uid, o_id}).then(res => {return res}).catch(err => {return err})

// 优惠券列表
const getCouponList = (page,size = 10) => post(API.COUPON_LIST,{page,size}).then(res => {return res}).catch(err => {return err});

// 获取优惠券
const getCoupon = (id) => post(API.COUPON_GET,{id}).then(res => {return res}).catch(err => {return err});

// 获取用户优惠券列表
const getUserCoupon = (status, page, size = 10) => post(API.COUPON_USER_LIST,{status,page,size}).then(res => {return res}).catch(err => {return err});

const getUserCouponNumber = () => post(API.COUPON_NUMS).then(res => {return res}).catch(err => {return err});

module.exports = {
  getUserCoupon,
  payMentOfAnOrder,
  pollingOrderPay,
  getCouponList,
  getCoupon,
  getUserCouponNumber
}