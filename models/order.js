import API from '../config/api';
import {
  post
} from '../utils/request'

// 获取订单接口

const getOrderItemList = (status) => post(API.ORDER_LIST,{status}).then(res => {return res}).catch(err => {return err}); 

// 取消订单
const cancelOrder = (id) => post(API.ORDER_CANCEL,{id}).then(res => {return res}).catch(err => {return err});

// 修改订单状态
const modifyOrderStatus = (id,status) => post(API.ORDER_STATUS,{id,status}).then(res => {return res}).catch(err => {return err});

//删除订单
const deleteOrder = (id) => post(API.ORDER_DELETE,{id}).then(res=>{return res}).catch(err => {return err});

module.exports = {
  getOrderItemList,
  cancelOrder,
  modifyOrderStatus,
  deleteOrder
}