// pages/reserve/affirm/affirm.js
import {
  showNoIconToast,
  showAccessToast
} from '../../utils/common'
import {
  orderACar
} from '../../models/reserve'
import * as Storage from '../../utils/storageSyncTool';
import {CACHE} from '../../config/map';
import { payMentOfAnOrder } from '../../models/pay'
import { wxPay } from '../../servers/wxPay'
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
   if(result.code == 200){
   this.wxPayMeet(result.data);
   } else {
     showNoIconToast(result.data);
   }
  },
  // 获取后端支付
  async wxPayMeet(data) {
    const {order_on, o_id, uid} = data;
    if (!order_on || !o_id || !uid) {
      showNoIconToast('订单异常，请重新下单！');
      return;
    }
    let payData = await payMentOfAnOrder(uid, o_id);
    await wxPay(payData.data)
    
  },
  //拉起微信支付
 async wxPay(payData) {
   if (!payData) {
     showNoIconToast('服务器异常！请稍后再试');
     return;
   }
  wxPay(payData,(res) => {
    console.log(res);
  })
  },
  // 获取用户手机信息
  isHaveNumber(){
    let isNumber = Storage.getStorage(CACHE.USER_ISNUMBER);
    if (!isNumber) {
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