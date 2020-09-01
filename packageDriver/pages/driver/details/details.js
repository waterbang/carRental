// pages/order/details/details.
import {
  CACHE,
  MAP
} from '../../../config/map'
import { addressAnalysis } from '../../../servers/map'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    returntime: '', // 未转换的提车时间
    rentaltime: '', // 未转换的还车时间
    _returntime: '', // 转换的提车时间
    _rentaltime: '', // 转换的还车时间
    returnaddress: '', //提车地址
    rentaladdress: '', //还车地址
    order_on: '', //订单号
    license: '', // 车牌号
    name: '小黄',
    tel: "12580" // 电话
  },
  init() {
    let data = wx.getStorageSync(CACHE.DRIVE_ORDER_DETAIL);
    if (!data) {
      wx.navigateBack();
    }
    this.setCountdown(data.status, data.returntime, data.rentaltime);
    this.setData({
      name: data.name,
      returntime: data.returntime,
      rentaltime: data.rentaltime,
      returnaddress: data.returnaddress,
      rentaladdress: data.rentaladdress,
      o_id: data.o_id,
      license: data.license,
    })
    // wx.removeStorageSync('orderDetails')
  },
  // 转换时间
  setCountdown(status, returntime, rentaltime) { //2020-11-09 00:00
    const time = status == 1 ? returntime : rentaltime;
    let _time = (status == 1) ? '_returntime' : '_rentaltime';
    this.setData({
      [_time]: time
    })
  },
  // 送车导航
  async goReturnaddressMap() {
   let local = await addressAnalysis(this.data.rentaladdress);
   this.openMap(local.lat, local.lng);
  },
  // 还车导航
  async goRentaladdressMap() {
   let local = await addressAnalysis(this.data.rentaladdress);
   this.openMap(local.lat, local.lng);
  },
  openMap(latitude,longitude) {
        wx.openLocation({
          latitude,
          longitude,
          scale: 18,
          success:(res) => {
            console.log(res);
          },fail:(err) => {
            console.log(err)
          }
        })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init();
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