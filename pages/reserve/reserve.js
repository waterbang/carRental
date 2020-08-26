// pages/reserve/reserve.js
import {
  getCarDetail,
  orderACar
} from '../../models/reserve'
import {
  showNoIconToast
} from '../../utils/common';
import {wxLogin} from '../../models/user'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    carDetail: {}, //车辆详情
    getCarAddress: null, //  取车地址
    repayCarAddress: null, // 还车地址
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
    isLogin: false
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
    if(flag === 'right' && this.data.getValue.length === 0) {
      showNoIconToast("请先选择租车时间");
      return;
    } 
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
  setIsLoginStatus(status=false) {
    if (typeof status === 'object') {
      status = false
    }
    this.setData({
      isLogin:status
    })
  },
  // 授权刷新
  setIsLogin() {
    this.setIsLoginStatus()
    this.orderACar();
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
      flag
    } = e.detail;
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
    let hour = 0;
    if (day === 0) { // 是否是同一天
      hour =  Number.parseInt(repay[1]) - Number.parseInt(get[1]);
    } else {
      day--;
      hour = Math.abs( 24 - Number.parseInt(get[1]) + Number.parseInt(repay[1]))
    }
    //如果等于24小时
    if(hour === 24) {
      day++;
      hour=0;
    }

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
    let status = this.verify();
    if (!status)return;
    const data = {
    // cancelRule:this.data.getTime,
    carDetail:this.data.carDetail,
    returntime :this.data. getDate + this.data.getTime,
     rentaltime : this.data.reDate + this.data.reTime,
     returnaddress : this.setAddress(this.data.getCarAddress),
     rentaladdress : this.setAddress(this.data.repayCarAddress),
     username  : wx.getStorageSync('IS_LOGIN').nickName,
     day : this.data.day + this.setMoneyTime(this.data.hour),
    }
    wx.setStorageSync('AFFIRM', data)
    wx.navigateTo({
      url: '/pages/affirm/affirm',
    })
  },
  // 验证参数
  verify(){
    // 看看有没有用户信息
  if (!wx.getStorageSync('IS_LOGIN')) {
    wxLogin().then(res => {
      this.setIsLoginStatus(false);
    }).catch((e) =>{
      this.setIsLoginStatus(true);
    })
  }
  if(this.data.getCarAddress == null) {
    showNoIconToast("未设置取车地址");
    return false;
  }
  if(this.data.repayCarAddress == null) {
    showNoIconToast("未设置还车地址");
    return false;
  }
  if(!this.data.getValue) {
    showNoIconToast("未设置取车时间");
    return false;
  }
  if(!this.data.reValue) {
    showNoIconToast("未设置还车时间");
    return false;
  }
  return true;
  },
  // 设置时间
  setMoneyTime(time) {
   if (isNaN(time)) {throw new Error("请传入数字")}
    return time <= 4? 0 : 1;
  },
  //提取地址
  setAddress(address){
    return `${address.provinceName}·${address.cityName}·${address.countyName}·${address.detailInfo}`
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