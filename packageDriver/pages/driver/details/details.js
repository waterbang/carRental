// pages/order/details/details.
import { CACHE } from '../../../config/map'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day: null, //天
    returntime: '', // 未转换的提车时间
    rentaltime: '', // 未转换的还车时间
    _returntime: '', // 转换的提车时间
    _rentaltime: '', // 转换的还车时间
    returnaddress: '', //提车地址
    rentaladdress: '', //还车地址
    order_on:'', //订单号
    series_name:'', // 车名
    img:'' , //车图片
    seat:4, // 几座
    power_type:'', //自动还是手动
    car_status:1, // 订单状态 1 下单 2 已派送车 3 待还车 4 已完成
  },
  init() {
    let data  = wx.getStorageSync(CACHE.DRIVE_ORDER_DETAIL);
    if(!data) {
     wx.navigateBack();
    }
    this.setCountdown(data.status, data.returntime, data.rentaltime);
    this.setData({
      day: data.day,
      returntime: data.returntime,
      rentaltime: data.rentaltime,
      returnaddress: data.returnaddress,
      rentaladdress: data.rentaladdress,
      o_id:data.o_id,
      series_name:data.series_name,
      img: data.img,
      seat:data.seat,
      power_type:data.power_type,
      car_status:data.status
    })
   // wx.removeStorageSync('orderDetails')
  },
  // 转换时间
  setCountdown(status ,returntime, rentaltime) { //2020-11-09 00:00
    const time = status == 1 ? returntime : rentaltime;
    let _time = (status == 1) ? '_returntime' : '_rentaltime';
    this.setData({
      [_time]: time
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