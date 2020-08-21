// components/orderItem/index.js
// 0 已下单 ， 1 出租中 2 已完成 3 全部
import {
  cancelOrder,
  modifyOrderStatus,
  deleteOrder
} from '../../models/order';
import {
  showNoIconToast,
  showAccessToast
} from '../../utils/common'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      observer: function (val) {
        this.data.id = val.id;
      }
    },
    activeKey: {
      type:Number,
      observer:function(val) {
        console.log(val)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    id: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //取消订单
    async _cancelOrder() {
      let result = await cancelOrder(this.data.id);
      console.log(result);
    }
  },
  //删除订单
    async _deleteOrder() {
      let result = await deleteOrder(this.data.id);
      console.log(result)
    },
  //修改订单状态
    async _changeOrderStatus(status) {
      return await modifyOrderStatus(this.data.id,status);
    },
    //提车 status =1
    async pickUpTheCar() {
      let result =  await this._changeOrderStatus(1);
      console.log(result)
    }
})