import API from '../config/api';
import {post} from '../utils/request'

// 获取车
const getCarList = (status) => post(API.GET_ORDER_LIST,{status}).then(res=>{return res}).catch(err => { return err});

// 更新车辆状态
const updateCarStatus = (order_id,status) =>post(API.UPDATE_ORDER_STATUS,{order_id,status}).then(res=>{return res}).catch(err => { return err});

// 车辆是否损坏
const putCarDamage = (order_id,damage,damage_desc,grade) => post(API.CAR_DAMAGE,{
  order_id,
  damage,
  damage_desc,
  grade //损坏等级(等级分为，1为轻微，2为进厂维修)
}).then(res=>{return res}).catch(err => { return err});

//上传图片
const pushImg = () => post()

module.exports = {
  getCarList,
  updateCarStatus,
  putCarDamage,
  pushImg
}