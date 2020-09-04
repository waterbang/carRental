// components/orderItem/index.js
// 0 已下单 ， 1 出租中 2 已完成 3 全部
import {
  showNoIconToast,
  showAccessToast
} from '../../utils/common'
import * as Storage from '../../utils/storageSyncTool'
import {CACHE} from '../../config/map'
import {updateCarStatus} from '../../models/order'
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
    //删除订单
    async _deleteOrder(e) {
      wx.vibrateShort()
      let id = e.target.dataset.id;
      console.log(id)
      let result = await deleteOrder(id);
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
      return await updateCarStatus(id, status);
    },
    //确认发车 status =1
    async beganToStart(e) {
      let id = e.target.dataset.id;
      let result = await this._changeOrderStatus(id, 0);
      // console.log(result)
      if (result.code == 200) {
        showAccessToast("开始发车！");
        this.emitNewData();
      } else {
        showNoIconToast("发车失败：" + result.msg);
      }
    },
    //确认收车 status =2
    async beganToCollect(e) {
      let id = e.target.dataset.id;
      let result = await this._changeOrderStatus(id, 1);
      console.log(result)
      if (result.code == 200) {
        showAccessToast("开始前往收车！");
        this.emitNewData();
      } else {
        showNoIconToast("收车失败：" + result.msg);
      }
    },
    // 完成发车
    completeTheGrid(e) {
      let id = e.target.dataset.id;
      wx.navigateTo({
        url: `../../pages/my/auth/auth?id=${id}`,
      })
    },
    // 完成收车
    completeTheCollect(e) {
      let id = e.target.dataset.id;
      wx.navigateTo({
        url: `../../pages/picture/picture?id=${id}&type=true`,
      })
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
      Storage.setStorage(CACHE.DRIVE_ORDER_DETAIL,this.data.list[index])
      wx.navigateTo({
        url: './details/details',
      })
    },
    //阻止冒泡事件不要删除
    catchPop(){}
  },
})