import API from '../config/api';
import {post} from '../utils/request'

// 获取车
const getCarList = (status) => post(API.GET_ORDER_LIST,{status}).then(res=>{return res}).catch(err => { return err});

// 更新车辆状态
const updateCarStatus = (status) =>post(API.UPDATE_ORDER_STATUS,{status}).then(res=>{return res}).catch(err => { return err});

module.exports = {
  getCarList,
  updateCarStatus
}