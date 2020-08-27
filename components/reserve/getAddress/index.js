// components/reserve/getAddress/index.js
import {
  getAddress
} from '../../../servers/reserve'
import {
  MAP
} from '../../../config/map'
import { showNoIconToast} from '../../../utils/common'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    img: {
      type: String,
      value: '/static/reserve/get.png'
    },
    getCarAddress: Object,
    title: String
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
    // 跳转地址选择
    goToMap(latitude,longitude) {
      const key = MAP.key; //使用在腾讯位置服务申请的key
      const referer = MAP.referer; //调用插件的app的名称
      const location = JSON.stringify({
        latitude: latitude,
        longitude: longitude
      });
      const category = '基础设施,娱乐休闲,汽车';
      wx.navigateTo({
        url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location + '&category=' + category
      });
    },
    // 
    async getCarAddress() {
      let address = await getAddress();
      this.triggerEvent('getCarAddress', this.data.title)
      this.goToMap(address.latitude, address.longitude)
      if (address.errMsg !== "chooseLocation:ok") {
        showNoIconToast("获取地址失败！");
        return;
      }
    }
  }
})