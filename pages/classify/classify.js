// pages/classify/classify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classifyArr:["特价车","经济型","舒适型","SUV","商务型","豪华型","跑车","新能源"],
    carList:[{
      title: "朗逸",
      price: "300.00",
      img: "https://www.jindundangan.com/upload/cart_type/20200803093526_.jpeg"
    }],
  },
  //切换标签
  changeTabs(e) {
    console.log(e);
  },
  //选择城市
  clickMap() {
    wx.showToast({
      title: '当前未开放其他城市',
      icon: 'none'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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