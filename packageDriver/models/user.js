import API from '../config/api';
import {wxRequest} from '../utils/request'

// 登录
const userLogin = (username, password) => wxRequest(API.ORDER_LIST,{data:{username,password}}).then(res=>{return res}).catch(err => {err});
module.exports = {
  userLogin
}