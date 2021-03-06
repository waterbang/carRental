// pages/my/my.js
import {
  showNoIconToast
} from '../../utils/common'
import {
  getUserIntegral
} from '../../models/my'
import { getUserCouponNumber } from '../../models/pay'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    integral: 0, //用户积分
    couponNums:0 // 优惠券数量
  },
  // 去优惠券
  goCouPon() {
    wx.vibrateShort()
    wx.navigateTo({
      url: './myCoupon/myCoupon',
    })
  },
  //新手指导
  goGuide() {
    wx.vibrateShort()
    wx.navigateTo({
      url: './new/new',
    })
  },
  // 积分详情
  goIntegral() {
    wx.navigateTo({
      url: '../integral/integral',
    })
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
  // 获取用户积分
  async getIntegral() {
    let result = await getUserIntegral();
    if (result.code == 200 && result.data.integral != undefined) {
      this.setData({
        integral: result.data.integral
      })
    }
  },
  // 当前优惠券数量
  async getCouponNumber() {
    let result = await getUserCouponNumber();
    if (result.code == 200) {
      this.setData({
        couponNums:Number.parseInt(result.data)
      })
    }
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
  onShow:async function () {
    this.getIntegral(); //获取用户积分
    await this.getCouponNumber(); // 优惠券数量
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