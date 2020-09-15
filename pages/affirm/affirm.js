// pages/reserve/affirm/affirm.js
import {
  showNoIconToast,
  showAccessToast
} from '../../utils/common'
import { getOpenid } from '../../models/user'
import {
  orderACar
} from '../../models/reserve'
import * as Storage from '../../utils/storageSyncTool';
import {CACHE} from '../../config/map';
import { wxPayMeet,pollPay } from '../../servers/wxPay'
import { CommonConfirmMessage } from '../../utils/common'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // cancelRule: '', //取消规则
    selectProtocal: true, //是否选中协议
    carDetail: '', //车辆详情
    returntime: '', //取车时间
    rentaltime: '', //还车时间
    returnaddress: '', //取车地址
    rentaladdress: '', //还车地址
    username: '用户名',
    day: '', //几天
    money: 0,//钱
    body: {}, //发送的内容
    isNumber:false,//是否有手机
  },
  init() {
    let data = this.data.body = wx.getStorageSync(CACHE.CAR_AFFIRM);
    if(!data) {
      wx.switchTab({
        url: '/pages/index/index',
      })
      return;
    }
    this.seMoney(data.day, data.carDetail.price);
    this.setData({
      day: data.day,
      username: data.username,
      carDetail: data.carDetail,
      returntime: data.returntime,
      rentaltime: data.rentaltime,
      returnaddress: this.filterAddress(data.returnaddress),
      rentaladdress: this.filterAddress(data.rentaladdress),
      // cancelRule:data.cancelRule
    })
  },
  // 过滤地址
  filterAddress(address) {
    let add =  address.split('#');
    return add[0];
  },
  //是否选中协议
  selectProtocal(e) {
    this.data.selectProtocal = e.detail.checked || true;
  },
  // 处理价格
  seMoney(day, money) {
    const result = Number.parseInt(money) * day;
    this.setData({
      money: result
    })
  },
  // 提交
  async submitOrder() {
    if (this.isHaveNumber()) return; //看看有没有手机号码
    wx.showLoading({
      title: '正在下单',
    })
    let data = this.data.body;
    let body = {
      day: data.day,
      returntime: data.returntime,
      rentaltime: data.rentaltime,
      returnaddress: data.returnaddress,
      rentaladdress: data.rentaladdress,
      c_id: data.carDetail.id,
      username: data.username
    }
   let result = await orderACar(body);
   wx.hideLoading();
   if(result.code == 200){
   wxPayMeet(result.data);
   this.paymentMassage(result.data)
   } else {
     showNoIconToast(result.data);
   }
  },
  // 显示已支付或未支付
paymentMassage(data){
  const {o_id, uid} = data;
  CommonConfirmMessage('支付订单确认', '您是否已经支付?','yes','no~',() => {
    pollPay(uid ,o_id);
  }, () => {
    pollPay(uid ,o_id);
  })
},
  // 获取用户手机信息
  isHaveNumber(){
    let isNumber = Storage.getStorage(CACHE.USER_ISNUMBER);
    if (!isNumber) {
      wx.removeStorageSync('XIAOQI');
      getOpenid();
      this.setData({
        isNumber: true
      })
      return true;
    }
    return false;
  },
  //关闭手机授权弹窗
  clonePhoneNumber() {
    this.setData({
      isNumber:false
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