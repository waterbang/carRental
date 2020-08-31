// pages/my/my.js
import {
  showNoIconToast
} from '../../utils/common'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //我的订单
  goAuth() {
    wx.vibrateShort()
    wx.navigateTo({
      url: './auth/auth',
    })
  },
  //新手指导
  goGuide() {
    wx.vibrateShort()
    showNoIconToast("暂未开放此功能！")
  },
  //租车须知
  goNotice() {
    wx.vibrateShort()
    wx.navigateTo({
      url: './Notice/notice',
    })
  },
  //联系我们
  contactUs() {
    wx.vibrateShort()
    showNoIconToast("暂未开放此功能！")
  },
  // 前往司机端分包
  goDriver() {
    wx.navigateTo({
      url: '/packageDriver/pages/driver/driver',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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