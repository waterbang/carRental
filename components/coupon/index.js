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
    alreadyReceived:"https://xdtnyimg.waterbang.top/close_coupon.png", //已领取
    beenUsed:"https://xdtnyimg.waterbang.top/HasBeenUsed.png", //已使用
    haveExpired:'https://xdtnyimg.waterbang.top/haveExpired.png' // 已过期
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //领取
    async _getCoupon(e) {
      const item = e.currentTarget.dataset.item;
      this.triggerEvent('_getCoupon', item)
    }
  }

})