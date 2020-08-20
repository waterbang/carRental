// pages/index/index.js
import {
  getRecommend,
  getUsedCar
} from '../../models/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listFour: [ // 四个小块数据
      {
        image: "/static/index/setMeal.png",
        title: "超值套餐"
      },
      {
        image: "/static/index/discount.png",
        title: "领优惠券"
      },
      {
        image: "/static/index/signIn.png",
        title: "签到积分"
      },
      {
        image: "/static/index/activity.png",
        title: "限时活动"
      }
    ],
    recommendList: [], // 推荐列表
    secondList: [], // 二手车列表
    loading:true, // 加载状态
  },
  // 切换tab
  changeTabs(e) {
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRecommendList();
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