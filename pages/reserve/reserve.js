// pages/reserve/reserve.js
import {
  getCarDetail
} from '../../models/reserve'
import {
  showNoIconToast
} from '../../utils/common';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,//获取id
    carDetail: {}, //车辆详情
    getCarAddress: {}, //  取车地址
    repayCarAddress: {}, // 还车地址
    getDate: '2016-09-01', // 提车时间
    getTime: '12:01',
    flag: 'left', // 看看是哪边
    ordValue:'', // 旧的时间
    getValue: [], // 取车
    reValue: [], //还车
    reDate: "2020-08-01", // 还车时间
    reTime: '12:02',
    isTime: false, //时间选择框
    day: 0, // 共几天
    hour: 0, // 小时
  },
  //获取详情信息
  async getReserve(id) {
    if (!id) {
      showNoIconToast("当前订单不存在");
      wx.navigateTo({
        url: '/pages/index/index',
      })
      return;
    }
    this.data.id = id;
    let detail = await getCarDetail(id);
    this.setData({
      carDetail: detail
    })
  },
  // 获取权限
  getCarAddress(e) {
    let address = e.detail;
    this.setData({
      getCarAddress: address
    })
  },
  repayAddress(e) {
    let address = e.detail;
    this.setData({
      repayCarAddress: address
    })
  },
  //关闭时间选择框
  onSetTime(e) {
    const flag = e.currentTarget.dataset.flag || 'left';
    this.setData({
      isTime: !this.data.isTime,
      flag: flag
    })
  },
  closeTime() { //  关闭
    this.setData({
      isTime: false
    })
  },
  getDate() { // 初始化子组件时间
    this.selectComponent('#selectTime').firstDate();
  },
  setDate(e) { //初始化渲染时间
    const {
      getDate,
      getTime,
      reDate,
      reTime,
    } = e.detail;
    this.setData({
      getDate: getDate,
      getTime: getTime,
      reDate: reDate,
      reTime: reTime
    })
  },
  // 获取时间
  pushTime(e) {
    this.closeTime();
    const {
      time,
      value,
      flag
    } = e.detail;
     console.log(time,value,flag);
    if (time.length === 0) return;
    if (flag === 'left') {
      this.data.ordValue = this.data.getValue;
      this.data.getValue = time;
      let year = time[0].value.slice(0, 4); //提取年
      let monthDay = time[0].text.split("  "); //  提取日期
      this.setData({
        getDate: `${year}年${monthDay[0]}`,
        getTime: `${monthDay[1]} ${time[1]}:${time[2]}`,
      })
    } else {
      this.data.reValue = time;
      let year = time[0].value.slice(0, 4); //提取年
      let monthDay = time[0].text.split("  "); //  提取日期
      this.setData({
        reDate: `${year}年${monthDay[0]}`,
        reTime: `${monthDay[1]} ${time[1]}:${time[2]}`,
      })
    }
    this.getDay();
  },
  // 设置天数
  getDay() {
    let get = this.data.getValue;
    let repay = this.data.reValue;
    if (get.length === 0 || repay.length === 0) return;
    let day = Number.parseInt(repay[0].value) - Number.parseInt(get[0].value);
    let hour =  Number.parseInt(repay[1]) - Number.parseInt(get[1]);

    if (day < 0 || hour < 0) {
      showNoIconToast("还车时间不能比取车时间早");
      let ord = this.data.ordValue;
      let year = ord[0].value.slice(0, 4); //提取年
      let monthDay = ord[0].text.split("  "); //  提取日期
      this.setData({
        getDate: `${year}年${monthDay[0]}`,
        getTime: `${monthDay[1]} ${get[1]}:${get[2]}`,
      })
      return;
    }
    this.setData({
      day,
      hour
    })
  },
  // 提交订单
  orderACar() {

  },
  // 验证参数
  verify(){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getReserve(options.id); // 获取汽车详情
    this.getDate(); // 获取时间
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


// cityName: "广州市",
// countyName: "思明区",
// detailInfo: "新港中路397号",
// nationalCode: "510000",
// postalCode: "510000",
// provinceName: "广东省",
// telNumber: "020-81167888",
// userName: "张三"