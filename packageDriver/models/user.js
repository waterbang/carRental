import API from '../config/api';
import {post} from '../utils/request'

// 登录
const userLogin = (username, password) => post(API.USER_LOGIN,{username,password}).then(res=>{return res}).catch(err => { return err});
module.exports = {
  userLogin
}