// 定义登录token的key(键名),在获取/存储的时候,通过这个key获取和存储
const LOGIN_TOKEN_KEY = 'DRIVER_ID'

const setStorage = (key, value) => {
  try {
    wx.setStorageSync(key, value)
    return true
  } catch (e) {
    return false
  }
}

const getStorage = (key) => {
  try {
    const value = wx.getStorageSync(key)
    return value
  } catch (e) {
    return false
  }
}

const clearStorage = key => {
  try {
    wx.clearStorageSync(key)
    return true
  } catch (e) {
    return false
  }
}

const setDriverLoginToken = (value) => {
  return setStorage(LOGIN_TOKEN_KEY, value)
}

const getDriverLoginToken = () => {
  return getStorage(LOGIN_TOKEN_KEY)
}

const clearDriverLoginToken = () => {
  return clearStorage(LOGIN_TOKEN_KEY)
}

module.exports = {
  setDriverLoginToken,
  getDriverLoginToken,
  getStorage,
  setStorage,
  clearDriverLoginToken,
  clearStorage
}
