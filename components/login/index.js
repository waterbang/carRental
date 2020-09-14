// components/login/index.js
import {
  putNumber
} from '../../models/user'
import * as Storage from '../../utils/storageSyncTool'
import {
  showNoIconToast
} from '../../utils/common'
import {
  getOpenid
} from '../../models/user'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    isNumber: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    iv: '',
    encryptedData: "",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    closePopup() {
      this.triggerEvent('setIsLoginStatus')
    },
    getUserInfo() {
      this.triggerEvent('setIsLogin')
    },
    async getPhoneNumber(e) {
      if (!e.detail.encryptedData || !e.detail.iv) {
        showNoIconToast('取消授权！');
        return;
      }
      this.data.iv = e.detail.iv;
      this.data.encryptedData = e.detail.encryptedData;
      let result = await putNumber(e.detail.iv, e.detail.encryptedData);
      if (result.code === 200) {
        showNoIconToast('授权成功')
        this.clonePhoneNumber();
        Storage.setStorage('isNumber', result.data.tel);
        return;
      } 
      wx.removeStorageSync('session_key')
      await this.againNumber();
    },
    async againNumber() {
      let result = await putNumber(this.data.iv, this.data.encryptedData);
      showNoIconToast('授权成功')
      this.clonePhoneNumber();
      Storage.setStorage('isNumber', result.data.tel);
    },
    //关闭手机
    clonePhoneNumber() {
      this.triggerEvent('clonePhoneNumber')
    }
  }
})