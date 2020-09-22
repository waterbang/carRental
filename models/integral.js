import API from '../config/api';
import {post} from '../utils/request'
// 积分日历
const getManth = () => post(API.INTEGRAL_CALENDAR).then(res => {return res}).catch(err => {return err})
// 积分列表
const getIntegralList = (size, page) => post(API.INTEGRAL_LIST, {size, page}).then(res => {return res}).catch(err => {return err})

module.exports = {
  getManth,
  getIntegralList
}