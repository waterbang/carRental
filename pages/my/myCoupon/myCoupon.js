// pages/my/myCoupon/myCoupon.js
import {getUserCoupon} from '../../../models/pay'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeKey: 0, // 当前激活
    coupon: [],
    loading: false,
  },
  // 去领取优惠券
  goIndexCoupon() {
    wx.navigateTo({
      url: '../../index/receiveCoupon/coupon',
    })
  },
  // 吸顶
  onPageScroll(res) {
    wx.lin.setScrollTop(res.scrollTop)
  },
  // 切换标签
  changeTabs(e) {
    wx.vibrateShort()
    const key = Number.parseInt(e.detail.activeKey);
    this.getUserCouponList(key);
  },
  setActiveKey(key) {
    this.setData({
      activeKey: key
    })
  },
  //是否加载
  setLoading(flag = false) {
    this.setData({
      loading: flag
    })
  },
  //获取优惠券列表
  async getUserCouponList(status = 0) {
    let result = await getUserCoupon(status);
      result.data = result.data.map(item => { return Object.assign(item,{set:status})})
    if (result.code == 200) {
      this.setData({
        coupon: result.data
      })
      return;
    }
    wx.lin.showMessage({
      type: 'warning',
      content: '服务器出了点小问题，网络连接堵塞！'
    })

    wx.lin.flushSticky(); // 防止吸顶灯位置错乱
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserCouponList();
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
      coupon: []
    })
    this.getUserCouponList(this.data.activeKey);
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