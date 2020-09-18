// pages/index/receiveCoupon/coupon.js
import {getCouponList, getCoupon} from '../../../models/pay';
import { showNoIconToast } from '../../../utils/common'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    coupon:[]
  },
  // 获取优惠券列表
  async _getCouponList() {
    let result = await getCouponList();
    if (result.code == 200) {
      this.setData({
        coupon: result.data
      })
    }
  },
   //领取
   async _getCoupon(e) {
    const _data = e.detail;
    const index = _data.id,title = _data.title;
    let result = await getCoupon(index);
    if (result.code == 200) {
      this.couponMassage(title);
      return;
    }
    if (result.code == 1002) {
      showNoIconToast('这张优惠券已经领取过了！');
      return;
    }
    showNoIconToast('优惠券过期了。');
  },
  async couponMassage(title) {
    wx.lin.showDialog({
      type: "alert",
      title: '领取优惠券成功',
      content: `恭喜获得 ${title}`,
      confirmText: '好的',
      confirmColor: "#f60",
      success: (res) => {
        if (res.confirm) {}
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getCouponList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      coupon:[]
    })
    this._getCouponList();
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

// {
//   id:1,
//   title:'满100立减20元',
//   money: 100,
//   offer: 50,
//   get: true, // 已领取
//   status: 1,// 满减
//   open_time: '2020-09-14 00:00:00',
//   close_time: '2020-09-20 00:00:00'
// },
// {
//   id:1,
//   title:'全场订单9折优惠购',
//   money: 0,
//   offer: 0.9,
//   get: false, // 未领取
//   status: 2,// 折扣
//   open_time: '2020-09-14 00:00:00',
//   close_time: '2020-09-20 00:00:00'
// }