// pages/order/order.js
import { getOrderItemList} from '../../models/order'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: [], //数据
    activeKey:0, //默认激活的选项卡 0 已下单 1 出租中 2 已完成 3 全部
    loading:false,//是否加载
  },
    // 吸顶
    onPageScroll(res) {
      wx.lin.setScrollTop(res.scrollTop)
    },
  // 切换标签
  changeTabs(e) {
    wx.vibrateShort()
    const key = Number.parseInt(e.detail.activeKey);
    this.getItemData(key);
  },
  setActiveKey(key) {
    this.setData({
      activeKey:key
    })
  },
  // 获取数据
  async getItemData(status) {
    this.setActiveKey(status);
    let List = await getOrderItemList(status);
    if (List.code == 200) {
      this.setData({
        item: List.data
      })
      return;
    }
    if (List.code == 1002) { // 没有数据
      this.setData({
        item:[]
      })
      return;
    }
    wx.lin.showMessage({
      type:'warning',
      content:'服务器出了点小问题，网络连接堵塞！'
  })
   
    wx.lin.flushSticky(); // 防止吸顶灯位置错乱
  },
  // 儿子需要刷新了通知我
  SonUpdatesData() {
    this.getItemData(this.data.activeKey)
  },
  //是否加载
  setLoading(flag = false) {
    this.setData({
      loading: flag
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.status) {
      this.getItemData(options.status)
    } else {
      this.getItemData(0)
    }
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
  onPullDownRefresh: async function () {
    this.setData({
      item:[]
    })
    await this.getItemData(this.data.activeKey);
    wx.stopPullDownRefresh()
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