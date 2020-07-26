var host = 'http://192.168.3.4:9000';
var clientBasicAuthorization = "Basic ZG8tZ29hbDpkby1nb2Fs";
import Notify from '../components/vant/notify/notify.js';
/**
 * 登录请求，
 * code：微信登录授权码
 */
function login(code) {
  wx.request({
    url: host + "/oauth/token",
    header: {
      "content-type": "application/x-www-form-urlencoded",
      "Authorization": clientBasicAuthorization
    },
    data: {
      grant_type: "wechat",
      code: code
    },
    method: 'POST',
    success: function(res) {
      if (res.statusCode === 200) {
        wx.setStorage({
          key: "accessToken",
          data: res.data.access_token
        });
        wx.setStorage({
          key: "refreshToken",
          data: res.data.refresh_token
        });
        wx.setStorage({
          key: "userInfo",
          data: res.data.userInfo
        });
      } else {
        // 登录失败
        wx.showModal({
          title: '提示',
          content: '网络不稳定，请稍后再试'
        })
      }
    },
    fail: function() {
      wx.showModal({
        title: '提示',
        content: '网络不稳定，请稍后再试' 
      })
    },
  })
}



/**
 * POST请求，
 * URL：接口
 * data：参数，json类型
 * doSuccess：成功的回调函数
 */
function post(url, data, doSuccess) {
  let accessToken = wx.getStorageSync("accessToken");
  if (accessToken === null || accessToken === '') {
    // 如果tokne不存在，token存放有延迟，等待重试
    setTimeout(function () {
      //要延时执行的代码
      post(url, data, doSuccess);
    }, 100) //延迟时间 这里是100毫秒
    return;
  }
  wx.request({
    url: host + url,
    header: {
      "content-type": "application/json;charset=UTF-8",
      "Authorization": "Bearer " + accessToken
    },
    data: data,
    method: 'POST',
    success: function(res) {
      checkSuccessRes(res, doSuccess)
    },
    fail: function(res) {
      wx.showModal({
        title: '提示',
        content: '网络不稳定，请稍后再试'
      })
    },
  })
}

/**
 * PUT请求，
 * URL：接口
 * data：参数，json类型
 * doSuccess：成功的回调函数
 */
function put(url, data, doSuccess) {
  let accessToken = wx.getStorageSync("accessToken");
  if (accessToken === null || accessToken === '') {
    // 如果tokne不存在，token存放有延迟，等待重试
    setTimeout(function () {
      //要延时执行的代码
      put(url, data, doSuccess);
    }, 100) //延迟时间 这里是100毫秒
    return;
  }
  wx.request({
    url: host + url,
    header: {
      "content-type": "application/json;charset=UTF-8",
      "Authorization": "Bearer " + accessToken
    },
    data: data,
    method: 'PUT',
    success: function (res) {
      checkSuccessRes(res, doSuccess)
    },
    fail: function (res) {
      wx.showModal({
        title: '提示',
        content: '网络不稳定，请稍后再试'
      })
    },
  })
}

function checkSuccessRes(res, doSuccess) {
  if (res.statusCode === 200 || res.statusCode === 204) {
    doSuccess(res.data);
  } else if (res.statusCode === 400) {
    wx.showModal({
      title: '提示',
      content: res.msg
    })
  } else {
    wx.showModal({
      title: '提示',
      content: '网络不稳定，请稍后再试'
    })
  }
}


module.exports = {
  login: login,
  post: post,
  put: put
}