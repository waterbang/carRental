// packageDriver/pages/picture/picture.js
import {
  showAccessToast,
  showNoIconToast
} from '../../utils/common'
import {
  updateCarStatus,
  pushImg,
  pushCarMeter
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
    oil: 0, //油表
    mileage: 0, //里程
    type: false, //false 发车，true 收车
    isDetriment:false,// 有损显示隐藏控制
  },
  init(option) {
    if (!option.id) {
      showNoIconToast('订单过时，请联系后台');
      wx.navigateBack();
    }
    this.setData({
      id: option.id
    })
    if (option.type) {
      this.setData({
        type: true
      })
    }
  },
  // 上传图片
  async openCamera(e) {
    let type = Number.parseInt(e.target.dataset.type);
    let {
      base64Img
    } = await chooseImage(this);
    wx.showLoading({
      title: '正在上传'
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
  //获取油表里程表 油表20 里程表21
  async getFuelAndMileage() {
    let meter = this.data.oil, // 油
      mileage = this.data.mileage; //里程
    if (!meter || !mileage) {
      showNoIconToast(`${!meter?'油量表':''} ${!mileage?'里程数':''} 不能为空`)
      return true;
    }
    let result = await pushCarMeter(this.data.id, meter, mileage);
    if (result.code == 200) {
      showNoIconToast('里程油表提交成功！')
      return false
    }
    // showNoIconToast(result.data + '');
    return false;
  },
  //校验油表
  isMeterData(e) {
    let meter = e?.detail.value || this.data.oil;
    // console.log(/^(\d+)\/(\d+)$/.test(meter), /^[0]\.{1}(\d+)$/.test(meter))
    if (/^(\d+)\/(\d+)$/.test(meter)) { //如果是分数
      let molecule = meter.match(/(\d*)\//)[1];
      let denominator = meter.match(/\/(\d*)/)[1];
      if (molecule > denominator) {
        showNoIconToast('分子不能大于分母！');
        return true;
      }
      this.data.oil = Number.parseInt(molecule) / Number.parseInt(denominator);
      return false;
    } else if (/^[0]\.{1}(\d+)$/.test(meter)) { // 如果是小数
      this.data.oil = Number.parseFloat(meter);
      return false;
    }
    showNoIconToast('油量表必须为小数或整数, 且小数整数部分不能大于0')
    return true;

  },
  //获取里程数
  isMileageData(e) {
    let mileage = e.detail.value;
    this.data.mileage = mileage;
  },
  //验证
  verify() {
    let _verify = this.data.verifyMap
    let count = _verify.filter((item) => {
      return item === true
    })
    if (count.length < 18) {
      showNoIconToast(`图片未全部上传！剩余上传图片${18 - count.length} 张`);
      return true
    }; //如果没有到16张
    return false;
  },
  // 更新订单状态
  async _updateCarStatus() {
    let result = await updateCarStatus(this.data.id, 2); //2为进行中到状态
    console.log(result)
    if (result.code == 200) {
      showAccessToast('订单完成！')
      return false
    } else {
      showNoIconToast(result.data)
      return true
    }
  },
  //开启有损
  openDetrimental() {
    this.setData({
      isDetriment: true
    })
  },
  //有损收车
  detrimentalToCollect() {
    if (this.verify()) return; // 验证图片
    if (this.isMeterData()) return; // 验证油表
    if (this.getFuelAndMileage()) return; // 上传里程油表
    this.openDetrimental();
  },
  //无损收车
  nondestructiveCollect() {
    if (this.verify()) return; // 验证图片
    if (this.isMeterData()) return; // 验证油表
    if (this.getFuelAndMileage()) return; // 上传里程油表
    if (this._updateCarStatus()) return;
    setTimeout((
      wx.reLaunch({
        url: '../../pages/driver/driver',
      })
    ), 1000)
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