// components/indexList/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recommendList: Array,
    secondList: Array,
    classify:{
      type: Boolean
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
    //去详情页
    goReserve(e) {
      wx.vibrateShort()
      let currentTarget = e.currentTarget.dataset?.id;
      wx.navigateTo({
        url: `/pages/reserve/reserve?id=${currentTarget}`,
      })
    }
  }
})
