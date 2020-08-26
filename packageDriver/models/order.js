import API from '../config/api';
import {post} from '../utils/request'

// 获取车
const getCarList = (status) => post(API.ORDER_LIST,{id: status}).then(res=>{return res}).catch(err => {err});

module.exports = {
  getCarList
}