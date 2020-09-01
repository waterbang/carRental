
const addressAnalysis = (address) => {
  return new Promise((resolve, reject) => {
    wx.serviceMarket.invokeService({
      service: 'wxc1c68623b7bdea7b',
      api: 'geoc',
      data: {
        address: address
      },
    }).then(res => {
      if (res.data.status === 0) {
        resolve(res.data.result.location)
      } else {
        reject(res.data.message)
      }
    }).catch(err => {
      console.error('invokeService fail', err)
      reject(err);
    })
  })
}
//go Map
// const goMap = (latitude, longitude) =>{
//   let key = MAP.key; //使用在腾讯位置服务申请的key
//   let referer = MAP.referer; //调用插件的app的名称
//   let endPoint = JSON.stringify({ //终点
//     'latitude': latitude,
//     'longitude': longitude
//   });
//   wx.navigateTo({
//     url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
//   });
// }

module.exports = {
  addressAnalysis
}