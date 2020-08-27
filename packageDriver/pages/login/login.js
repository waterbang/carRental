// packageDriver/pages/login/login.js
import {showNoIconToast, showAccessToast} from '../../utils/common'
import {userLogin} from '../../models/user'
import {setDriverLoginToken, getDriverLoginToken} from '../../utils/storageSyncTool'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    password:'',
  },
  //登录
  async onLogin() {
    let username = this.data.username,
        password = this.data.password;
        if (this.varifyData(username,password)) return;
    let result = await userLogin(username, password);
    if (Number.parseInt(result.code) !== 200) {
      showNoIconToast('账号或密码错误！');
      return;
    }
    if(!result.data.id) {
      showNoIconToast('服务器异常，请联系管理员。');
      return;
    }
    setDriverLoginToken(result.data.id);
    showAccessToast('登录成功！');
    setTimeout(() => {
      wx.navigateBack()
    },1500)
  },  
  //设置用户名
  setUsername(val){
    this.data.username = val.detail.value;
  },
  //设置密码
  setPassword(val) {
    this.data.password = val.detail.value;
  },
  //验证
  varifyData(username, password) {
    if(!username) {
      showNoIconToast('用户名不能为空！');
      return true;
    }
    if(!password) {
      showNoIconToast('密码不能为空！');
      return true;
    }
    return false;
  },
  // 判断是否已经登录
  isLogin() {
    if (getDriverLoginToken()) {
      showNoIconToast('您已登录！');
      setTimeout(() => {
        wx.navigateBack()
      },1500)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.isLogin();
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