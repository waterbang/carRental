// pages/index/index.js
import {
  getRecommend,
  getUsedCar,
  signIn
} from '../../models/index';
import { showNoIconToast, showAccessToast } from '../../utils/common'
import { getOpenid } from '../../models/user'
 import * as Storage  from '../../utils/storageSyncTool'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listFour: [ // 四个小块数据
      {
        image: "https://xdtnyimg.waterbang.top/setMeal.png",
        title: "超值套餐"
      },
      {
        image: "https://xdtnyimg.waterbang.top/discount.png",
        title: "领优惠券"
      },
      {
        image: "https://xdtnyimg.waterbang.top/signIn.png",
        title: "签到积分"
      },
      {
        image: "https://xdtnyimg.waterbang.top/activity.png",
        title: "限时活动"
      }
    ],
    recommendList: [], // 推荐列表
    secondList: [], // 二手车列表
    loading:true, // 加载状态
  },
  //点击四个块
  clickAssistant(e) {
    wx.vibrateShort()
    let index = e.currentTarget.dataset?.index;
    if (index === 2) {
      this.signInIntegral();
      return;
    }
    showNoIconToast("暂未开放此功能！")
  },
  // 签到积分
  async signInIntegral() {
    wx.vibrateShort();
    let result = await signIn();
    result = result.data.data ? result.data: result ;    
    if (result.code == 200 || result.code == 1002) {
      showAccessToast(result.data);
      return;
    }
    showNoIconToast('网络异常！');
  },
  // 切换tab
  changeTabs(e) {
    wx.vibrateShort()
    let status = e.detail?.activeKey;
    if (status === "two") {
      this.getScondList();
    }
  },
  // 获取推荐🚗列表
  async getRecommendList() {
    this.setLoading(true)
    let data = await getRecommend();
    if (Array.isArray(data) !== true || data.length === 0) return this.setLoading(false);
    this.setData({
      recommendList: data
    })
    this.setLoading(false);
  },
  // 获取二手🚗列表
  async getScondList() {
    if(this.data.secondList.length !== 0) return;
    this.setLoading(true);
    let data = await getUsedCar();
    if (Array.isArray(data) !== true || data.length === 0) return this.setLoading(false);
    this.setData({
      secondList: data
    })
    this.setLoading(false);
  },
  //set loading animation
  setLoading(status){
    this.setData({
      loading: status
    })
  },
  checkSession() { // 检查是否过期
    wx.checkSession({
      success () {
        //session_key 未过期，并且在本生命周期一直有效
      },
      fail:async () => {
        // session_key 已经失效，需要重新执行登录流程
      let res = await getOpenid()//重新登录
      if (res.code === 200) {
        showNoIconToast('重新登录成功！');
      }
      }
    })
    if (!Storage.getStorage('session_key')) {
      getOpenid();
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRecommendList();
    this.checkSession();
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