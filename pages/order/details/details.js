// pages/order/details/details.js
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
    money: 0, //钱
    order_on: '', //订单号
    series_name: '', // 车名
    img: '', //车图片
    seat: 4, // 几座
    power_type: '', //自动还是手动
    car_status: 1, // 订单状态 1 下单 2 已派送车 3 待还车 4 已完成
    status:1, // 是否支付 1 是未支付
  },
  init() {
    let data = wx.getStorageSync('orderDetails');
    if (!data) {
      wx.switchTab({
        url: '/pages/index/index',
      })
    }
    this.setCountdown(data.car_status, data.returntime, data.rentaltime);
    this.setData({
      day: data.day,
      returntime: data.returntime,
      rentaltime: data.rentaltime,
      returnaddress: data.returnaddress,
      rentaladdress: data.rentaladdress,
      money: Number.parseInt(data.money),
      order_on: data.order_on,
      series_name: data.series_name,
      img: data.img,
      seat: data.seat,
      power_type: data.power_type,
      car_status: data.car_status,
      status:data.status
    })
    // wx.removeStorageSync('orderDetails')
  },
  // 转换时间
  setCountdown(status, returntime, rentaltime) { //2020-11-09 00:00
    const time = status === 1 ? returntime : rentaltime;
    let _time = (status === 1) ? '_returntime' : '_rentaltime';
    let year = null, macth = null, day = null, minute = null;
    try {
      year = time.match(/(\S*)年/)[1];
      macth = time.match(/年(\S*)月/)[1];
      day = time.match(/月(\S*)日/)[1];
      minute = time.match(/( \S*)/)[1];
    } catch (err) {
      this.setData({
        [_time]: time
      })
      return;
    }
    this.setData({
      [_time]: `${year}-${macth}-${day} ${minute}`
    })
  },
  // 送车导航
  async goReturnaddressMap() {
    let lon = this.data.returnaddress.split('#')[2]; // 经度
    let lat = this.data.returnaddress.split('#')[1]; //纬度
    this.openMap(lat, lon);
  },
  // 还车导航
  async goRentaladdressMap() {
    let lon = this.data.rentaladdress.split('#')[2]; // 经度
    let lat = this.data.rentaladdress.split('#')[1]; //纬度
    this.openMap(lat, lon);
  },
  openMap(latitude, longitude) {
    latitude = Number.parseFloat(latitude)
    longitude = Number.parseFloat(longitude)
    wx.openLocation({
      latitude,
      longitude,
      scale: 18,
      success: (res) => {
        // console.log(res);
      },
      fail: (err) => {
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