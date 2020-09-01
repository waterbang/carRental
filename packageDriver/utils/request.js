import getErrorMessage from "./expectionalError"
import {
  getDriverLoginToken,
  clearDriverLoginToken
} from "./storageSyncTool.js"

// host地址
const host = "https://www.jindundangan.com/admin/"

// 合并请求参数: 将默认参数和实际请求的参数进行合并
const mergeRequestParmas = (perDefaults, params) => {
  for (var key in params) {
    perDefaults[key] = perDefaults[key] && perDefaults[key].toString() === "[object Object]" ?
    mergeRequestParmas(perDefaults[key], params[key]) : perDefaults[key] = params[key];
  }
  return perDefaults;
}

// 请求封装
const wxRequest = async (subUrl, params = {}) => {
  const token = getDriverLoginToken()
  const defaults = {
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST",
    data: {
      uid: token || ""
    }
  }

  // 合并参数
  const options = mergeRequestParmas(defaults, params)
  let res = await new Promise(async (resolve, reject) => {
    // if (!token) {
    //  wxRequest(subUrl , params)
    //   reject('登录过期')
    // }
    let url = host + subUrl
    const {
      header,
      method,
      data
    } = options
    wx.request({
      url,
      header,
      method,
      data,
      success: res => {
        // console.log(res.data);
        const {
          code,
          msg,
          data
        } = res.data
        if (res && code == 200) {
          resolve(res.data)
        } else {
          // let err = {
          //     data: {
          //       status: res.data.code,
          //       description: res.data.msg
          //     }
          // }
          // const handlerErr = responseErrorHandler(err)
          // res.err = handlerErr
          reject(res.data)
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
  if (error.status !== /^2\d{2}/) {
    // 发送请求后，服务端有返回
    // 1. HTTP返回的响应码不是 2xx
    // 2. 服务端自定义错误,服务端响应码不是 2xx
    // 3. 客户端自定义错误,返回的数据被定义为错误状态
    err = getErrorMessage(error)
    if (err.code === 406) {
      const token = getDriverLoginToken()
      if (token) {
        clearDriverLoginToken()
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

const get = (url,data) => {return wxRequest(url,{data:data,method:'get'}) }

const post = (url,data) => {return wxRequest(url,{data:data}) }

export {
  wxRequest,
  post,
  get,
}