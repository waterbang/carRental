// packageDriver/components/custom-tab-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bar :{
      type: Number,
      value:0,
      observer:function(val) {
        this.setData({
          selected:val
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#666666",
    fontWeight:'bold',
    list: [
      {
        pagePath: "../../pages/driver/driver",
        text: "订单",
        isSpecial:false
      },
      // {
      //   pagePath: "/pages/bar/bless/bless",
      //   iconPath: "/images/icon/fu.png",
      //   selectedIconPath: "/images/icon/fu.png",
      //   text: "",
      //   isSpecial: true
      // },
      {
        pagePath: "../../pages/my/my",
        text: "我的",
        isSpecial: false
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      const idx = e.currentTarget.dataset.index;
      const path = e.currentTarget.dataset.path
      if (idx === this.data.selected) return;
      this.setData({
        selected: idx
      })
      if (this.data.list[idx].isSpecial){
        wx.navigateTo({
          url: path,
        })
      }else{
        wx.navigateTo({
          url: path,
        })
      }
      // console.log(this.data.selected, idx);
    }
  }
})
