// pages/order/order.js
import { getOrderItemList} from '../../models/order'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: [], //数据
    activeKey:0, //默认激活的选项卡
    loading:false,//是否加载
  },
  // 切换标签
  changeTabs(e) {
    wx.vibrateShort()
    const key = Number.parseInt(e.detail.activeKey)
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
    List = List.data;
    // console.log(List[0])
    this.setData({
      item:List
    })
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
      this.getItemData(status)
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
  onPullDownRefresh: function () {
    this.getItemData(this.data.activeKey);
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