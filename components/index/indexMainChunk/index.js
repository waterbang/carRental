// components/indexMainChunk/index.js
import { showNoIconToast} from '../../../utils/common'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    flag: {
      type: String,
      value: 'left'
    }
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
    clickChunk() {
      wx.vibrateShort()
      showNoIconToast("未开放此功能！")
    }
  }
})
