import API from '../config/api';
import {
  wxRequest
} from '../utils/request'

// 获取订单接口

const getOrderItemList = (status) => wxRequest(API.ORDER_LIST,{data:{status:status}}).then(res => {return res}).catch(err => {return err}); 

// 取消订单
const cancelOrder = (id) => wxRequest(API.ORDER_CANCEL,{data:{id:id}}).then(res => {return res}).catch(err => {return err});

// 修改订单状态
const modifyOrderStatus = (id,status) => wxRequest(API.ORDER_STATUS,{data:{id:id,status:status}}).then(res => {return res}).catch(err => {return err});

//删除订单
const deleteOrder = (id) => wxRequest(API.RESERVE_DETAIL,{data:{id:id}}).then(res=>{return res}).catch(err => {return err});

module.exports = {
  getOrderItemList,
  cancelOrder,
  modifyOrderStatus,
  deleteOrder
}