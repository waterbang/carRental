// pages/my/myCoupon/myCoupon.js
import {getUserCoupon} from '../../../models/pay'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeKey: 0, // 当前激活
    coupon: [],
    loading: false, // 是否加载
    curPage: 1, //当前页面
    footer: false , // false 还有数据 true 没有数据
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
    this.data.curPage = 1;
    this.data.activeKey = key;
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
  async getUserCouponList(status = 0, page = 1) {
    this.setLoading(true);
    let result = await getUserCoupon(status,page);
      result.data = result.data.map(item => { return Object.assign(item,{set:status})})
    if (result.code == 200) {
      if (result.data.length === 0) {
        this.data.footer = true;
      }
      this.data.footer = false;
      const arr = page ===1 ? result.data : this.data.coupon.concat(result.data);
      this.setData({
        coupon: arr
      })
      this.setLoading(false);
      return;
    }
    this.setLoading(false)
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
    wx.showLoading({
      title: '正在获取优惠券',
    })
    this.setData({
      coupon: []
    })
    console.log(this.data.activeKey)
    this.getUserCouponList(this.data.activeKey);
    wx.stopPullDownRefresh()
    wx.hideLoading()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.footer) {
      this.getUserCouponList(this.data.activeKey,++this.data.curPage);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})