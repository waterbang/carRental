import API from '../config/api';
import {
  wxRequest
} from '../utils/request'
import * as Storage from '../utils/storageSyncTool';
//登录
const IS_LOGIN = 'IS_LOGIN'

const wxLogin = () => {
  if (Storage.getStorage(IS_LOGIN)) return;
  return new Promise((resolve, reject) => {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              Storage.setStorage(IS_LOGIN, res.userInfo)
              resolve(res.userInfo);
            }
          })
        } else {
          reject("取消授权");
        }
      },
      fail: err => reject(err)
    })
  })
}

const getOpenid = () => {
  if (Storage.getLoginToken()) return;
  return new Promise((resolve, reject) => {
    wx.login({
      success: (res) => {
        if (res.code) {
          wxRequest(API.GET_OPENID, {
            data: {
              code: res.code
            }
          }).then(async (res) => {
            if (res.code === 200) {
              res = res.data
              Storage.setLoginToken(res.openid)
              await getUserInfoToServe(res.openid);
              resolve(res);
            } else {
              reject(res)
            }
          })
        } else {
          reject(reject);
        }
      }
    })
  })
}

const getUserInfoToServe = async (openid) => {
  let userinfo = Storage.getStorage(IS_LOGIN);
  if (!userinfo) {
    userinfo = await wxLogin();
  };
  // console.log(openid, userinfo)
  wxRequest(API.GET_USERINFO, {
    data: {
      openid: openid,
      nickname: userinfo.nickName,
      head_img: userinfo.avatarUrl
    }
  }).then(res => {
    return res;
  }).catch(err => {
    return err;
  })
}

module.exports = {
  wxLogin,
  getOpenid,
  getUserInfoToServe
}