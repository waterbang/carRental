// packageDriver/components/detriment/index.js
import { showNoIconToast } from '../../utils/common'
import { putCarDamage } from '../../models/order' // todo
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: Boolean,
    id: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    select:1, // 需不需要进场维修
    desc:'', // 详细信息
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 关闭页面
    cloneComponents() {
      this.setData({
        show:false
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
      if (!this.data.desc) {
        showNoIconToast('详细描述不能为空！')
        return;
      }
      let result = await putCarDamage(this.data.id,this.data.desc, this.data.select);
      console.log(result);
      if (result.code == 200) {
        setTimeout(() =>{
          wx.reLaunch({
            url: '../../pages/driver/driver',
          })
        }, 1000)
      }
    },
  }
})
