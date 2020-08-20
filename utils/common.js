
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

module.exports = {
  showNoIconToast,
  showAccessToast,
  showLoadingToast
}