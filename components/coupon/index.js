// components/coupon/index.js
import {
  CommonConfirmMessage
} from '../../utils/common'
import {
  getCoupon
} from '../../models/pay'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    coupon: Array
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
    //领取
    async _getCoupon(e) {
      const index = e.currentTarget.dataset.index;
      const title = e.currentTarget.dataset.title;
      this.triggerEvent('_getCoupon', {index,title})
    }
  }

})