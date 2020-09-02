// packageDriver/pages/Index/index.js
import {getDriverLoginToken} from '../../utils/storageSyncTool'
import {
  getCarList,
  updateCarStatus
} from '../../models/order'
import {
  showNoIconToast
} from '../../utils/common'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: [], //数据
    activeKey: 0, //默认激活的选项卡 0 待发车 1 待收车 2 进行中 3 已完成
    loading: false, //是否加载
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
      activeKey: key
    })
  },
  // 获取数据
  async getItemData(status) {
    this.setActiveKey(status);
    let List = await getCarList(status);
    console.log(List)
   if (List.code == 200) {
    this.setData({
      item: List.data
    })
    return;
   } 
   if(List.code == 1000) { //没有数据
    this.setData({
      item: []
    })
    return;
   }
   wx.lin.flushSticky(); // 防止吸顶灯位置错乱
  //  wx.lin.showMessage({
  //   content:"您的网络较差，请检查网络链接！",
  //   type:'warning',
  //  });
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
  //登录逻辑
  _isLogin() {
    if (getDriverLoginToken()) return;
    showNoIconToast("未登录，即将跳转登录页面！");
    setTimeout(() => {
      wx.navigateTo({
        url: '../login/login',
      })
    },1500)
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
    this._isLogin(); //看看是否登录了
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
    this.showTarBar();
  },
  showTarBar() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2 // 根据tab的索引值设置
      })
    }
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
      item: []
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