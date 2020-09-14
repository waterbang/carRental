import API from '../config/api';
import {post} from '../utils/request'

const getUserIntegral = () => post(API.INTEGRAL_GROSS).then(res => {return res}).catch(err => {return err})


module.exports = {
  getUserIntegral
}