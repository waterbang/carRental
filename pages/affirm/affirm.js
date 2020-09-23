// pages/reserve/affirm/affirm.js
import {
  showNoIconToast
} from '../../utils/common'
import {
  getOpenid
} from '../../models/user'
import {
  orderACar
} from '../../models/reserve'
import {
  getUserCoupon,
  getUserCouponNumber
} from '../../models/pay'
import * as Storage from '../../utils/storageSyncTool';
import {
  CACHE
} from '../../config/map';
import {
  wxPayMeet,
  pollPay
} from '../../servers/wxPay'
import {
  CommonConfirmMessage
} from '../../utils/common'
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
    money: 0, //钱
    ordMoney:0, // 旧的钱
    body: {}, //发送的内容
    isNumber: false, //是否有手机
    selectCoupon: [], // 选择的优惠券
    coupon: [], //加载的优惠券
    showCoupon: false, // 是否显示优惠券
    offer:0, // 使用的优券
    couponNums:1, // 优惠券数量
  },
  init() {
    let data = this.data.body = wx.getStorageSync(CACHE.CAR_AFFIRM);
    if (!data) {
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
    })
  },
  // 过滤地址
  filterAddress(address) {
    let add = address.split('#');
    return add[0];
  },
  //是否选中协议
  selectProtocal(e) {
    this.data.selectProtocal = e.detail.checked || true;
  },
  // 处理价格
  seMoney(day, money) {
    const result = Number.parseInt(money) * day;
    this.data.ordMoney = result;
    this.setData({
      money: result
    })
  },
  // 回传的优惠券
  _getCoupon(e) {
    const _data = e.detail;
    this.setData({
      selectCoupon: [_data]
    })
    this.makeCoupon(false); // 关闭弹出
    this.updatePrice(); 
  },
  // 更新价格
  updatePrice() {
    const {offer , money, status} = this.data.selectCoupon[0];
    this.data.offer = offer;
    if (status === 1) { // 满减
      if (this.data.ordMoney < money) {
        showNoIconToast('没有达到这张优惠券的使用金额！');
        this.clearCoupon();
        return;
      }
      this.setData({
        money: this.data.ordMoney - offer
      })
      return;
    }
    if (status == 2) { // 打折
      // 周几可以使用，todo。。。。。。
      const _money = (Number.parseInt(offer) * 0.01 * this.data.ordMoney).toFixed(2);
      this.setData({
        money: Number.parseInt(_money)
      })
      return;
    }
  
  },
  // 获取优惠券
  async getUserCoupon() {
    wx.showLoading({
      title: '加载优惠券',
    })
    this.makeCoupon(true)
    let result = await getUserCoupon(0, 1, this.data.couponNums); // 领取优惠券
    if (result.code == 200) {
      this.setData({
        coupon: result.data
      })
    }
    wx.hideLoading()
  },
  // 打开优惠券
  makeCoupon(flag) {
    this.setData({
      showCoupon: flag
    })
  },
  // 没有优惠券去领取优惠券
  goGetCoupon() {
    wx.navigateTo({
      url: '/pages/index/receiveCoupon/coupon',
    })
  },
  playCollapse(e) {
    if (e.type == "linfold") {
      this.makeCoupon(false)
      this.clearCoupon();
    } else {
      this.getUserCoupon();
    }
  },
  // 取消使用优惠券
  clearCoupon() {
    const offer = this.data.offer;
    if (offer) {
      this.setData({
        money: this.data.ordMoney + Number.parseInt(offer),
        selectCoupon: []
      })
      this.data.offer = null;
      return;
    }
    this.setData({
      selectCoupon: []
    })
  },
  // 提交
  async submitOrder() {
    if (this.isHaveNumber()) return; //看看有没有手机号码
    wx.showLoading({
      title: '正在下单',
    })
    let data = this.data.body;
    let _couponId = 0;
    try {
      _couponId = this.data.selectCoupon[0].id
    } catch(e) {
      _couponId = 0;
    }
    let body = {
      day: data.day,
      returntime: data.returntime,
      rentaltime: data.rentaltime,
      returnaddress: data.returnaddress,
      rentaladdress: data.rentaladdress,
      c_id: data.carDetail.id,
      username: data.username,
      coupon_id: _couponId
    }
    let result = await orderACar(body);
    wx.hideLoading();
    if (result.code == 200) {
      await wxPayMeet(result.data);
      this.paymentMassage(result.data)
    } else {
      showNoIconToast(result.data);
    }
  },
  // 显示已支付或未支付
  paymentMassage(data) {
    const {
      o_id,
      uid
    } = data;
    CommonConfirmMessage('支付订单确认', '您是否已经支付?', 'yes', 'no~', () => {
      pollPay(uid, o_id);
    }, () => {
      pollPay(uid, o_id);
    })
  },
  // 获取用户手机信息
  isHaveNumber() {
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
      isNumber: false
    })
  },
  // 当前优惠券数量
  async getCouponNumber() {
    let result =  await getUserCouponNumber();
    if (result.code == 200) {
      this.data.couponNums = Number.parseInt(result.data);
    } 
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
  onShow: async function () {
    await this.getCouponNumber(); 
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