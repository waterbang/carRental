// packageDriver/components/detriment/index.js
import {
  showNoIconToast
} from '../../utils/common'
import {
  putCarDamage
} from '../../models/order' // todo
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: Boolean,
    _id: {
      type: Number,
      observer: function (val) {
        this.data.my_id = val
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    select: 1, // 需不需要进场维修 1是需要 2是不需要
    desc: '', // 详细信息
    my_id: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 关闭页面
    cloneComponents() {
      this.setData({
        show: false
      })
    },
    //切换raoid
    clickMaintain(event) {
      let select = event.detail.key || 1;
      this.data.select = select;
    },
    //详细信息
    inputDescription(event) {
      this.data.desc = event.detail.value || "";
    },
    // 有损收车
    async detrimentalToCollect() {
      wx.showLoading({
        title: '正在收车'
      })
      if (!this.data.desc) {
        showNoIconToast('详细描述不能为空！')
        return;
      }
      let result = await putCarDamage(this.data.my_id, this.data.desc, this.data.select);
      // console.log(result);
      wx.hideLoading();
      if (result.code == 200) {
        setTimeout(() => {
          wx.reLaunch({
            url: '../../pages/driver/driver',
          })
        }, 500)
      }

    },
  }
})