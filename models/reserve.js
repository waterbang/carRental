import API from '../config/api';
import {wxRequest} from '../utils/request'

//给我id，我给你详情
const getCarDetail = (id) => wxRequest(API.RESERVE_DETAIL,{data: {id:id}}).then(res => {return res.data;}).catch(err => {return err})

//新增
const orderACar = (data) => wxRequest(API.ORDER_ADD, {data:{
  day:data.day,
  returntime:data.returntime,
  rentaltime:data.rentaltime,
  returnaddress:data.returnaddress,
  rentaladdress:data.rentaladdress,
  c_id:data.c_id,
  username:data.username
}}).then(res => {return res}).catch(err => {return err})
module.exports = {
  getCarDetail,
  orderACar
}