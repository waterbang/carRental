import {info} from '../config/information';
import {showNoIconToast} from '../utils/common';
const tmpIDs = [info.INFO_SERVICE_SCHEDULE, info.INFO_SERVICE_TRAFFIC, info.INFO_SERVICE_A_REFUND];
const setSubscribeMsg = () => {
  return new Promise((resolve, reject) => {
    wx.requestSubscribeMessage({
      tmplIds: tmpIDs,
      success (res) {
        if (res.errMsg == 'requestSubscribeMessage:ok') {
          resolve(res.TEMPLATE_ID);
          console.log(res);
        }
      },
      fail:(err) => {
        // 网络异常
        if (err.errCode == 10002 || err.errCode == 10003){
          showNoIconToast('网络出了点小问题，请稍后再试～')
          reject(err.errMsg);
        } 
      }
    })
  })
}

module.exports = {
  setSubscribeMsg
}

