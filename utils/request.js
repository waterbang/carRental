import getErrorMessage from "./expectionalError"
import {
  getLoginToken,
  clearLoginToken
} from "./storageSyncTool.js.js"

// host地址
const host = "https://www.jindundangan.com/"

// 合并请求参数: 将默认参数和实际请求的参数进行合并
const mergeRequestParmas = (perDefaults, params) => {
  return Object.assign({}, perDefaults, params)
}

// 请求封装
const wxRequest = async (subUrl, params = {}) => {
  const token = getLoginToken()
  const defaults = {
    header: {
      "Content-Type": "application/json"
    },
    method: "POST",
    data: {
      token: token || ""
    }
  }

  // 合并参数
  const options = mergeRequestParmas(defaults, params)
  let res = await new Promise((resolve, reject) => {
    // if (!token) {
    //   reject("登录过期")
    // }
    let url = host + subUrl
    const { header, method, data } = options
    wx.request({
      url,
      header,
      method,
      data,
      success: res => {
        console.log(res);
        const { code, data } = res.data
        if (res && code === 200) {
          resolve(data)
        } else {
          let err = {
            request: res.request,
            response: {
              data: { status: res.data.code, description: res.data.message }
            }
          }
          const handlerErr = responseErrorHandler(err)
          res.err = handlerErr
          reject(res)
        }
      },
      fail: err => {
        reject(err)
      },
      complete: e => {}
    })
  })
  return res
}

/**
 * 统一处理响应错误
 * @param {object} error
 */
const responseErrorHandler = error => {
  // 自定义错误
  let err = {
    title: "未知错误",
    description: "系统发生未知的错误"
  }
  if (error.response) {
    // 发送请求后，服务端有返回
    // 1. HTTP返回的响应码不是 2xx
    // 2. 服务端自定义错误,服务端响应码不是 2xx
    // 3. 客户端自定义错误,返回的数据被定义为错误状态
    err = getErrorMessage(error)
    if (err.code === 406) {
      const token = getLoginToken()
      if (token) {
        clearLoginToken()
        //之前有token,token过期
        loginDialog()
      } else {
        loginDialog()
      }
      return false
    }
  } else if (error.request) {
    // 发送请求但是没有响应返回
    err.title = "服务器忙"
    err.description = "服务器繁忙,请稍后重试"
  }
  return err
}

export { wxRequest }
