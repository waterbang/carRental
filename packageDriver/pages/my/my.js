// packageDriver/pages/my/my.js
import {
  showNoIconToast
} from '../../utils/common'
import * as Storage from '../../utils/storageSyncTool'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'司机未登录'
  },
  //我的订单
  switchID() {
    wx.vibrateShort()
    wx.navigateTo({
      url: '../login/login',
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
    showNoIconToast("暂未开放此功能！")
  },
  //联系我们
  contactUs() {
    wx.vibrateShort()
    showNoIconToast("暂未开放此功能！")
  },
  // 获取司机名称
  getName() {
    let name = Storage.getStorage('DRIVER_ID').name;
    if (!name) return;
    this.setData({
      name 
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
    this.getName();
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