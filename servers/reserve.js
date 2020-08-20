const getAddress = () => {
  return new Promise((resolve,reject) => {
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.address']) {
          wx.authorize({
            scope: 'scope.address',
            success () {
              wx.chooseAddress({
                success (res) {
                  resolve(res);
                }
              })
            },
            fail:() => {
              reject(reject)
            }
          })
        } else { // 已经授权过了
          wx.chooseAddress({
            success (res) {
              resolve(res);
            }
          })
        }
      }
    })
  })
}

const putTime = (value,mounthDays,hours=0,mins=0) => {
    let time1 = mounthDays[value[0]];
    let time2 = hours[value[1]];
    let time3 = mins[value[2]];
    const time = [time1,time2,time3];
    return time;
}

module.exports = {
  getAddress,
  putTime
}