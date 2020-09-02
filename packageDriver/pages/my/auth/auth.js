// pages/my/auth/auth.js
import {
  chooseImage
} from '../../../servers/image.js'
import {showNoIconToast} from '../../../utils/common'
import {pushImg} from '../../../models/order'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    id_card_default_front: 'https://xdtnyimg.waterbang.top/id_front.png',
    id_card_default_reserve: 'https://xdtnyimg.waterbang.top/id_reserve.png',
    driving_lincense_default: 'https://xdtnyimg.waterbang.top/driving-license.png',
    id_car_front: '', //身份证正面
    id_car_reverse: '', //身份证反面
    driving_lincense:'',  //驾驶证
    id_car_front_64: '',
    id_car_reverse_64: '',
    driving_lincense_64:'',
  },
  //初始化
  init(option) {
    if (!option.id) {
      showNoIconToast('订单过时，请联系后台');
      wx.navigateBack();
    }
    this.data.id = option.id;
  },
  //获取身份证正面
  async getIDCardFront(e) {
   let {images, base64Img} =  await chooseImage(this); 
   this.setData({
     id_car_front:images
   })
  this.data.id_car_front_64 = await this.addOneImg(18, base64Img) // 身份证正面面17
  },
   //获取身份证反面
   async getIDCardReverse(e) {
    let {images, base64Img} =  await chooseImage(this);
    this.setData({
      id_car_reverse:images
    })
    // console.log(base64Img.base64Code)
    this.data.id_car_reverse_64 = await this.addOneImg(18, base64Img) // 身份证反面18
  },
   //获取驾驶证
   async getDrivingLicense(e) {
    let {images, base64Img} =  await chooseImage(this);
    this.setData({
      driving_lincense:images
    })
    this.data.driving_lincense_64 = await this.addOneImg(19, base64Img) // 驾驶证19
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
  // 添加图片
  async addOneImg(type, imgData) {
    let result = await pushImg(this.data.id,type, imgData)
    console.log(result);
    if (result.code == 200) {
      return true
    } else {
      return false
    }
  },
  // 上传完成
  orderACar() {

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