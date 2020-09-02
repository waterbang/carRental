// packageDriver/pages/picture/picture.js
import {
  showAccessToast,
  showNoIconToast
} from '../../utils/common'
import {
  updateCarStatus,
  pushImg
} from '../../models/order'
import {
  chooseImage
} from '../../servers/image'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '', // 订单id
    verifyMap: [], //  验证是否上传了16张图片
  },
  init(option) {
    if (!option.id) {
      showNoIconToast('订单过时，请联系后台');
      wx.navigateBack();
    }
    this.data.id = option.id;
  },
  async openCamera(e) {
    let type = Number.parseInt(e.target.dataset.type);
    let {base64Img} = await chooseImage(this);
    wx.showLoading({
      title:'正在上传'
    })
    let result = await this.addOneImg(type, base64Img);
    let map = `verifyMap[${type}]`
    wx.hideLoading()
    this.setData({
      [map]: result
    })
  },
  // 添加图片
  async addOneImg(type, imgData) {
    let result = await pushImg(this.data.id, type, imgData)
    if (result.code == 200) {
      return true
    } else {
      showNoIconToast(result.data + '');
      return false
    }
  },
  // 提交
  onSubmit() {
    if(this.verify()) return;
    if (this._updateCarStatus()) return;
    setTimeout((
      wx.reLaunch({
        url: '../../pages/driver',
      })
    ),1000)
  },
  //验证
  verify() {
    let _verify = this.data.verifyMap
   let count =  _verify.filter((item) => {
        return item === true
    })
    if (count.length < 16) return true; //如果没有到16张
    return false;
  },
  // 更新订单状态
  async _updateCarStatus() {
    let result =  await updateCarStatus(this.data.id, 2); //2为进行中到状态
    if (result.code == 200) {
      showAccessToast('订单完成！')
      return false
    } else {
      showNoIconToast(result.data)
      return true
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init(options);
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