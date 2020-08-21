import API from '../config/api';
import {
  wxRequest
} from '../utils/request'

// 获取订单接口

const getOrderItemList = (status) => wxRequest(API.ORDER_LIST,{data:{status:status}}).then(res => {return res}); 


module.exports = {
  getOrderItemList
}