import API from '../config/api';
import {post} from '../utils/request'

//给我id，我给你详情
const getCarDetail = (id) => post(API.RESERVE_DETAIL,{id}).then(res => {return res.data;}).catch(err => {return err})

//新增
const orderACar = (data) => post(API.ORDER_ADD,{
  day:data.day,
  returntime:data.returntime,
  rentaltime:data.rentaltime,
  returnaddress:data.returnaddress,
  rentaladdress:data.rentaladdress,
  c_id:data.c_id,
  username:data.username,
  coupon_id: data.coupon_id
}).then(res => {return res}).catch(err => {return err})
module.exports = {
  getCarDetail,
  orderACar
}