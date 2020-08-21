//app.js
import {getOpenid} from './models/user'
App({
  onLaunch: async function () {
    getOpenid();
  },
  globalData: {
    userInfo: null
  }
})