// pages/integral/integral.js
import {
  getManth,
  getIntegralList
} from '../../models/integral'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    calendar: '',
    calendarConfig: {
      multi: true, // 是否开启多选,
      theme: 'elegant', // 日历主题，目前共两款可选择，默认 default 及 elegant，自定义主题在 theme 文件夹扩展
      showLunar: false, // 是否显示农历，此配置会导致 setTodoLabels 中 showLabelAlways 配置失效
      inverse: true, // 单选模式下是否支持取消选中,
      markToday: '今', // 当天日期展示不使用默认数字，用特殊文字标记
      takeoverTap: true, // 是否完全接管日期点击事件（日期不会选中)
      highlightToday: false, // 是否高亮显示当天，区别于选中样式（初始化时当天高亮并不代表已选中当天）
      defaultDate: false, // 默认选中指定某天；当为 boolean 值 true 时则默认选中当天，非真值则在初始化时不自动选中日期，
      preventSwipe: true, // 是否禁用日历滑动切换月份
      firstDayOfWeek: 'Mon', // 每周第一天为周一还是周日，默认按周日开始
      onlyShowCurrentMonth: true, // 日历面板是否只显示本月日期
    },
    toSet: [], // 当前选中
    list: [],
    page: 1,
  },
  //默认切换月视图
  switchView() {
    const calendar = this.calendar;
    calendar.setCalendarConfig(this.data.calendarConfig); // 初始化配置
    calendar.cancelSelectedDates() // 先清空选中
    calendar.setSelectedDays(this.data.toSet) // 初始化选中
  },
  /**
   * 日历初次渲染完成后触发事件，如设置事件标记
   */
  afterCalendarRender(e) {
    this.switchView();
  },
  //获取每日签到
  async getIntegralManth() {
    let result = await getManth();
    if (result.code == 200) {
      this.setData({
        toSet:result.data
      })
    }
  },
  //获取积分变动情况
  async getIntegralList(page = 1) {
    this.setLoading(true)
    let result = await getIntegralList(10, page);
    if (result.code == 200) {
      const list = this.data.list.concat(result.data)
      this.setData({
        list
      })
    }
    this.setLoading(false)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getIntegralList();
    this.getIntegralManth(); // 初始化选中
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    setTimeout(() => {
      this.switchView();
    }, 2000)
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
    if (this.data.list.length == 20) {
      this.setLoading(false)
      return;
    }
    this.getIntegralList(++this.data.page);
  },
  //set loading animation
  setLoading(status) {
    this.setData({
      loading: status
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})