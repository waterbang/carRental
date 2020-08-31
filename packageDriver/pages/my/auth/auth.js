// pages/my/auth/auth.js
import {
  chooseImage
} from '../../../servers/image.js'
import {showNoIconToast} from '../../../utils/common'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id_card_default_front: 'https://xdtnyimg.waterbang.top/id_front.png',
    id_card_default_reserve: 'https://xdtnyimg.waterbang.top/id_reserve.png',
    driving_lincense_default: 'https://xdtnyimg.waterbang.top/driving-license.png',
    id_car_front: '',
    id_car_reverse: '',
    driving_lincense:'',
    id_car_front_64: '',
    id_car_reverse_64: '',
    driving_lincense_64:'',
  },
  //获取身份证正面
  async getIDCardFront(e) {
   let {images, list} =  await chooseImage(this);
   this.setData({
     id_car_front:images
   })
  this.data.id_car_front_64 = list;
  },
   //获取身份证反面
   async getIDCardReverse(e) {
    let {images, list} =  await chooseImage(this);
    this.setData({
      id_car_reverse:images
    })
    this.data.id_car_reverse_64 = list;
  },
   //获取驾驶证
   async getDrivingLicense(e) {
    let {images, list} =  await chooseImage(this);
    this.setData({
      driving_lincense:images
    })
    this.data.driving_lincense_64 = list;
  },
  verify() {
    if(!this.data.id_car_front_64) {
      showNoIconToast('身份证正面需要上传');
      return true;
    }
    if(!this.data.id_car_reverse_64) {
      showNoIconToast('身份证反面需要上传');
      return true;
    }
    if(!this.data.driving_lincense_64) {
      showNoIconToast('驾驶证需要上传');
      return true;
    }
    return false;
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