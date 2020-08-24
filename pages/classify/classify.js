// pages/classify/classify.js
import {
  getTypeList,
  getTypeData
} from '../../models/classify'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classifyArr: ["特价车", "经济型", "舒适型", "SUV", "商务型", "豪华型", "跑车", "新能源"],
    carList: [],
  },
  //切换标签
  changeTabs(e) {
    let typeId = e.detail.activeKey;
    if (!typeId) return;
    this._getTypeData(typeId);
  },
  //选择城市
  clickMap() {
    wx.showToast({
      title: '当前未开放其他城市',
      icon: 'none'
    })
  },
  //获取分类
  async _getTypeList() {
    let list = await getTypeList();
    if (list) {
      this.setData({
        classifyArr: list
      })
    }
  },
  //获取分类详情
  async _getTypeData(id) {
    this.setLoading(true);
    let data = null;
   try {
    data = await getTypeData(id);
   } catch(e) {
    wx.reportMonitor('0', 1); // 告警监控
     this.setLoading(false);
   }
    if (!data) { // 如果没有数据
      this.setData({
        carList:null
      })
      this.setLoading(false);
      return;
    }
    this.setData({
      carList:data
    })
    this.setLoading(false)
  },
  //set loading animation
  setLoading(status) {
    this.setData({
      loading: status
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getTypeList(); // 初始化分类
    this._getTypeData(17); // 初始化商务型分类
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