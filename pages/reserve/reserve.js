// pages/reserve/reserve.js
import {
  getCarDetail
} from '../../models/reserve'
import {
  showNoIconToast
} from '../../utils/common';
import {wxLogin} from '../../models/user'
import {filterDay} from '../../utils/dateUtil'
import {CACHE} from '../../config/map';
const chooseLocation = requirePlugin('chooseLocation');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carDetail: {}, //车辆详情
    getAndRepay:'取车地址',
    getCarAddress: null, //  取车地址
    repayCarAddress: null, // 还车地址
    getDate: '2016-09-01', // 提车时间
    getTime: '12:01',
    flag: 'left', // 看看是哪边
    ordValue:[], // 旧的时间
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
      this.data.ordValue = this.data.reValue;
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
    let repayHour = Number.parseInt(repay[1]),getHour = Number.parseInt(get[1]);

    let day = (new Date(filterDay(repay[0].value)) - new Date(filterDay(get[0].value))) /(1000 * 60 * 60 * 24);
    let hour = 0;
   if(getHour > repayHour) { //如果取车日期比还车日期时间大
      day--;
      hour = Math.abs( 24 - getHour + repayHour)
    } else {
      hour = repayHour - getHour;
    }

    if (day < 0 || hour < 0) {
      showNoIconToast("还车时间不能比取车时间早");
      let ord = this.data.ordValue;
      if (!ord.length) return; // 防止第一次没有传报错
      let year = ord[0].value.slice(0, 4); //提取年
      let monthDay = ord[0].text.split("  "); //  提取日期
      this.setData({
        getDate: `${year}年${monthDay[0]}`,
        getTime: `${monthDay[1]} ${get[1]}:${get[2]}`,
        day:0,
        hour:0
      })
      return;
    }
    this.setData({
      day,
      hour
    })
  },
  // 提交订单
  async orderACar() {
    let status = await this.verify();
    if (!status)return;
    const data = {
    // cancelRule:this.data.getTime,
    carDetail:this.data.carDetail,
    returntime :this.data. getDate + this.data.getTime,
     rentaltime : this.data.reDate + this.data.reTime,
     returnaddress : this.setAddress(this.data.getCarAddress),
     rentaladdress : this.setAddress(this.data.repayCarAddress),
     username  : wx.getStorageSync(CACHE.USER_IS_LOGIN).nickName,
     day : this.data.day + this.setMoneyTime(this.data.hour),
     
    }
    wx.setStorageSync(CACHE.CAR_AFFIRM, data)
    wx.navigateTo({
      url: '/pages/affirm/affirm',
    })
  },
  // 验证参数
  async verify(){
    // 看看有没有用户信息
  if (!wx.getStorageSync(CACHE.USER_IS_LOGIN)) {
   await wxLogin().then(res => {
      this.setIsLoginStatus(false);
    }).catch((e) =>{
      this.setIsLoginStatus(true);
    })
    return false;
  }
  if(this.data.getCarAddress == null) {
    showNoIconToast("未设置取车地址");
    return false;
  }
  if(this.data.repayCarAddress == null) {
    showNoIconToast("未设置还车地址");
    return false;
  }
  if(!this.data.getValue.length) {
    showNoIconToast("未设置取车时间");
    return false;
  }
  if(!this.data.reValue.length) {
    showNoIconToast("未设置还车时间");
    return false;
  }
  if (!this.data.day && this.data.hour < 4) {
    showNoIconToast('租车时间不能少于4小时！');
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
    // latitude: 24.445715, longitude: 118.082695
    return `${address.name}: ${address.address}#${address.latitude}#${address.longitude}`
  },
  // 获取地址
  getCallbackShowMap(){
    const location = chooseLocation.getLocation();
    let address = this.verifyAddress(location);
    if(!address) return;
    if (this.data.getAndRepay == '取车地址') {
      this.setData({
        getCarAddress:address
      })
    } else {
      this.setData({
        repayCarAddress:address
      })
    }
  },
  // 验证地址
  verifyAddress(address) {
    if (!address) return false;
    if (address.city !== '厦门市') {
      showNoIconToast('当前服务仅支持厦门市！');
      return false;
    }
    let regexp = /.*福建省厦门市.*/g;
    // console.log(address)
    let rep = address.address.match(regexp);
    if (!rep) {
      address.address = `${address.province}${address.city}${address.district}${address.name}`
    }

    return address;
  },
  // 获取地址权限
  getCarAddress(e) {
    let getAndRepay = e.detail;
    this.setData({
      getAndRepay: getAndRepay
    })
  },
  repayAddress(e) {
    let getAndRepay = e.detail;
    this.setData({
      getAndRepay: getAndRepay
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log("options.id",options.id)
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
    this.getCallbackShowMap();
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