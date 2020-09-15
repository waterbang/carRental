import API from '../config/api';
import {post} from '../utils/request'

const getManth = () => post(API.INTEGRAL_CALENDAR).then(res => {return res}).catch(err => {return err})

const getIntegralList = (size, page) => post(API.INTEGRAL_LIST, {size, page}).then(res => {return res}).catch(err => {return err})

module.exports = {
  getManth,
  getIntegralList
}