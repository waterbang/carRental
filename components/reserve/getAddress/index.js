// components/reserve/getAddress/index.js
import {
  getAddress
} from '../../../servers/reserve'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    img:{
      type:String,
      value:'/static/reserve/get.png'
    },
    getCarAddress:Object,
    title:String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    async getCarAddress() {
    let address = await getAddress();
    if (address.errMsg !== "chooseAddress:ok") {
        showNoIconToast("获取地址失败！");
        return;
    }
    this.triggerEvent('getCarAddress',address)
    }
  }
})
