const getAddress = () => {
  return new Promise((resolve,reject) => {
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success (e) {
              console.log(e)
              wx.getLocation({
                type: 'wgs84',
                success (res) {
                  resolve(res)
                  // const latitude = res.latitude
                  // const longitude = res.longitude
                  // const speed = res.speed
                  // const accuracy = res.accuracy
                }
               })
            },
            fail:() => {
              reject(reject)
            }
          })
        } else { // 已经授权过了
          wx.getLocation({
            type: 'wgs84',
            success (res) {
              resolve(res)
            }
           })
        }
      },
      fail:(e) =>{
        console.log(e)
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