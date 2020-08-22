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
      type: Array
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
    async _cancelOrder(e) {
      let id = e.target.dataset.id;
      let result = await cancelOrder(id);
      if (result.code == 200) {
        showAccessToast("取消成功！");
        this.emitNewData();
      } else {
        showNoIconToast("取消失败："+result.msg);
      }
    },
     //删除订单
     async _deleteOrder() {
      let id = e.target.dataset.id;
      let result = await deleteOrder(id);
      console.log(result)
      if (result.code == 200) {
        showAccessToast("删除成功！");
        this.emitNewData();
      } else {
        showNoIconToast("删除失败："+result.msg);
      }
    },
  //修改订单状态
    async _changeOrderStatus(id,status) {
      return await modifyOrderStatus(id,status);
    },
    //提车 status =1
    async pickUpTheCar(e) {
      let id = e.target.dataset.id;
      let result =  await this._changeOrderStatus(id,1);
      console.log(result)
      if (result.code == 200) {
        showAccessToast("提车成功！");
        this.emitNewData();
      } else {
        showNoIconToast("提车失败："+result.msg);
      }
    },
    //无订单
    notOrder() {
      showNoIconToast("找不到此订单!");
    },
    //请求父亲更新数据
    emitNewData(){
      this.triggerEvent('emitNewData');
    },
    //去订单详情页
    goReserve(e) {
      let id = e.target.dataset.id;
      console.log('goReserve:',id)
    }
  },
})