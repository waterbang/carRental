// components/login/index.js
import {putNumber} from '../../models/user'
import * as Storage from '../../utils/storageSyncTool'
import { showNoIconToast } from '../../utils/common'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show:{
      type:Boolean,
      value: false
    },
    isNumber:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

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
    async getPhoneNumber (e) {
      if (!e.detail.encryptedData || !e.detail.iv) {
        showNoIconToast('取消授权！');
        return;
      }
      let result = await putNumber(e.detail.iv, e.detail.encryptedData);
      if (result.code === 200) {
        showNoIconToast('授权成功')
        this.clonePhoneNumber();
        Storage.setStorage('isNumber', result.data.tel);
      } else {
        showNoIconToast('授权失败，请清空缓存重新登录！')
      }
    },
    //关闭手机
    clonePhoneNumber() {
      this.triggerEvent('clonePhoneNumber')
    }
  }
})
