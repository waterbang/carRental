// components/selectTime/index.js
import * as dateUtil from '../../utils/dateUtil'
import {putTime} from '../../servers/reserve'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: Boolean, // 是否显示
    day: String, // 天数
    flag: {
      type:String,
      value:'left',
      observer:function(params) {
        this.getDate();
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    mounthDays: [], // 时间选择器第一列
    hours: [], //时间选择器 第二列
    mins: [], //时间选择器 第三列
    value: [0, 0, 0], //时间选择器 结果
    time:[],
    ordDate:null,
  },
  /**
   * 组件的方法列表
   */
  methods: {
    setOrdTime() { //oldTime = (new Date("2012/12/25 20:11:11")).getTime(); //得到毫秒数  
      const res = this.data.time;
      if(res.length === 0) return;
      let year = res[0].value.slice(0,4);
      let month = res[0].value.slice(4,6);
      let day = res[0].value.slice(6,res[0].value.length);
        let time = `${year}/${month}/${day} ${res[1]}:${res[2]}:00`;
      this.data.ordDate = new Date(time).getTime();
    },
    //选择时间
    bindTimeChange: function (e) {
      const val = e.detail.value
      let value = this.data.value;
      let date = new Date(new Date().getTime()+ 1000 * 60 * 3);
      if (this.data.flag === 'right') {
        date = new Date(this.data.ordDate)
      }
      let hour = 0,
        min = 0;
      //滚动第一列
      if (value[0] != val[0]) {
        if (val[0] == 0) {
          hour = date.getHours();
          min = date.getMinutes();
        }
        let hours = this.getResetDate(hour, 24);
        let mins = this.getResetDate(min, 60);
        this.setData({
          hours,
          mins
        })
      }
      //滚动第二列
      if (value[1] != val[1]) {
        if (val[1] == 0) {
          min = date.getMinutes()
        }
        let mins = this.getResetDate(min, 60);
        this.setData({
          mins
        })
      }
      this.setData({
        value: val
      })
      this.data.time =  putTime(this.data.value,this.data.mounthDays,this.data.hours,this.data.mins);
    },
    onPushTime() { // 确定时间
    this.setOrdTime()
    this.triggerEvent("pushTime",{value:this.data.value,time:this.data.time,flag:this.data.flag})
    },
    //计算时间
    getDate: async function () {
      let date = new Date(new Date().getTime()+ 1000 * 60 * 3);
      if (this.data.flag === 'right') {
        date = new Date(this.data.ordDate)
      }
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      const day = date.getDate();
       const hour = date.getHours();
       const min = date.getMinutes();
      const lastDay = dateUtil.isMonthDayNumber(year, month);
      let work = date.getDay();
      const mounthDays = []
      //计算天数
      for (let i = day, n = 0; n < 10; i++, work++, n++) {
        if (i > lastDay) {
          month++;
          if (month > 12) {
            month = 1
          }
          i = 1;
        }
        month = dateUtil.formatNumber(month)
        let dayStr = dateUtil.formatNumber(i)
        if (work > 6) {
          work = 0
        }
        let str = month + '月' + dayStr + '日  周' + dateUtil.number[work]
        let obj = {
          text: str,
          value: year + month + dayStr
        }
        mounthDays.push(obj)
      }
      //计算小时
      let hours = this.getResetDate(hour, 24)

      //计算分钟
      let mins = this.getResetDate(min, 60)
      await this.setData({
        mounthDays,
        hours,
        mins
      })
      
    },
    //计算小时
    getResetDate(val, number) {
      let date = new Date();
      let arrs = [];
      for (let i = val; i < number; i++) {
        arrs.push(dateUtil.formatNumber(i))
      }
      return arrs
    },
    //关闭时间选择框
    onSetTime() {
      this.triggerEvent('onSetTime')
    },
    closeTime() {
      this.triggerEvent('onCloseTime')
    },
    //初始化数据
    firstDate: async function (offset = 0) {
      const date = new Date(new Date().getTime()+ 1000 * 60 * 3)
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      const day = date.getDate();
      const hour = date.getHours();
      const  min = date.getMinutes();
      const lastDay = dateUtil.isMonthDayNumber(year, month);
      let work = date.getDay();
  
      const mounthDays = []
      let dayStr='';
      this.triggerEvent('setDate',{
        getDate: `${year}年${dateUtil.formatNumber(month)}月${day}日`,
        getTime:`周${dateUtil.number[work]} ${dateUtil.formatNumber(hour)}:${dateUtil.formatNumber(min)}`,
        reDate: `${year}年${month}月${day}日`,
        reTime:`周${dateUtil.number[work]} ${dateUtil.formatNumber(hour)}:${dateUtil.formatNumber(min)}`,
      })
      //计算天数
      for (let i = day, n = 0; n < 10; i++, work++, n++) {
        if (i > lastDay) {
          month++;
          if (month > 12) {
            month = 1
          }
          i = 1;
        }
        month = dateUtil.formatNumber(month)
        dayStr = dateUtil.formatNumber(i)
        if (work > 6) {
          work = 0
        }
        let str = month + '月' + dayStr + '日  周' + dateUtil.number[work]
        let obj = {
          text: str,
          value: year + month + dayStr
        }
        mounthDays.push(obj)
      }
      //计算小时
      let hours = this.getResetDate(hour, 24)
      //计算分钟
      let mins = this.getResetDate(min, 60)
      await this.setData({
        mounthDays,
        hours,
        mins
      })
      this.data.time =  putTime(this.data.value,this.data.mounthDays,this.data.hours,this.data.mins);
    },
  }
})