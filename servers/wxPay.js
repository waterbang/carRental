
const wxPay = (obj) => {
    wx.requestPayment({
        timeStamp: obj.timeStamp,
        nonceStr: obj.nonceStr,
        package: obj.package,
        signType: 'MD5',
        paySign: obj.paySign,
        success:(res) => {
            console.log(res)        
        },
        fail: (err) =>{
          console.log(err)
        }
        }
    )
}

const pollPay = () => {

}

module.exports = {
  wxPay
}