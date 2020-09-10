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
import * as Storage from '../../utils/storageSyncTool'
import { wxPayMeet } from '../../servers/wxPay'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array
    },
    activeKey: {
      type: Number,
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
    //支付订单
    async wxPayOrder(e) {
      wx.vibrateShort()
      let item = e.target.dataset.item;
      let orderDetail = {
        o_id: item.id,
        uid: item.uid
      }
      await wxPayMeet(orderDetail);
      // todo
    },
    //取消订单
    async _cancelOrder(e) {
      wx.vibrateShort()
      let id = e.target.dataset.id;
      let result = await cancelOrder(id);
      if (result.code == 200) {
        showAccessToast("取消成功！");
        this.emitNewData();
      } else {
        showNoIconToast("取消失败：" + result.msg);
      }
    },
    //删除订单
    async _deleteOrder(e) {
      wx.vibrateShort()
      let id = e.target.dataset.id;
      console.log(id)
      let result = await deleteOrder(id);
      console.log(result)
      if (result.code == 200) {
        showAccessToast("删除成功！");
        this.emitNewData();
      } else {
        showNoIconToast("删除失败：" + result.msg);
      }
    },
    //修改订单状态
    async _changeOrderStatus(id, status) {
      wx.vibrateShort()
      return await modifyOrderStatus(id, status);
    },
    //无订单
    notOrder() {
      showNoIconToast("找不到此订单!");
    },
    //请求父亲更新数据
    emitNewData() {
      this.triggerEvent('emitNewData');
    },
    //去订单详情页
    goReserve(e) {
      wx.vibrateShort()
      let index = e.currentTarget.dataset.index;
      if (!this.data.list[index]) {
        showNoIconToast('订单错误！')
        return;
      }
      Storage.setStorage('orderDetails', this.data.list[index])
      wx.navigateTo({
        url: '/pages/order/details/details',
      })
    },
    //阻止冒泡事件
    catchPop() {

    }
  },
})


//  //提车 status =1
//  async pickUpTheCar(e) {
//   let id = e.target.dataset.id;
//   let result = await this._changeOrderStatus(id, 0);
//   // console.log(result)
//   if (result.code == 200) {
//     showAccessToast("提车成功！");
//     this.emitNewData();
//   } else {
//     showNoIconToast("提车失败：" + result.msg);
//   }
// },
// //完成订单 status =2
// async finalizeAnOrder(e) {
//   let id = e.target.dataset.id;
//   let result = await this._changeOrderStatus(id, 1);
//   console.log(result)
//   if (result.code == 200) {
//     showAccessToast("订单完成！");
//     this.emitNewData();
//   } else {
//     showNoIconToast("还车失败：" + result.msg);
//   }
// },