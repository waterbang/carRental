import API from '../config/api';
import {post} from '../utils/request'

// 获取推荐的车
const getRecommend = () => post(API.INDEX_RECOMMEND).then(res => {return res.data}).catch(err => {return err})

//获取推荐的二手🚗
const getUsedCar = () => post(API.INDEX_SECOND_HAND).then(res => {return res.data}).catch(err =>{return err})

// 签到积分
const signIn = () => post(API.INTEGRAL_SIGN).then(res => {return res}).catch(err =>{return err});




module.exports = {
  getRecommend,
  getUsedCar,
  signIn
}