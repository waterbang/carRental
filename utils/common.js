
const showNoIconToast = (title) => {
  wx.showToast({
    title: title,
    icon: 'none'
  })
}
const showAccessToast = (title) => {
  wx.showToast({
    title: title,
    icon: 'success'
  })
}
const showLoadingToast = (title) => {
  wx.showToast({
    title: title,
    icon: 'loading'
  })
}
const CommonConfirmMessage = (title,content,confirmText,cancelText, confirmCallback, cancelCallback)  => {
  wx.lin.showDialog({
    type:"confirm",     
    title:  title,
    content:content ,
    confirmText:confirmText,
    confirmColor:"#f60",
    cancelText:cancelText,
    cancelColor:"#999",
    success: (res) => {
      if (res.confirm) {
        confirmCallback();
      } else if (res.cancel) {
        cancelCallback();
      }
    }
  })
}

module.exports = {
  showNoIconToast,
  showAccessToast,
  showLoadingToast,
  CommonConfirmMessage
}