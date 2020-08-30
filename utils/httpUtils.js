// 开发环境
// const host = 'http://192.168.3.4:9000';
// const host = 'http://127.0.0.1:9000';

// 测试环境
const host = 'http://111.19.162.139:18120';

// 生产环境
// const host = 'https://a.cxlsky.com';
const clientBasicAuthorization = "Basic ZG8tZ29hbDpkby1nb2Fs";

/**
 * 登录请求，
 * code：微信登录授权码
 */
function login(code) {
  console.log(code);
  return new Promise((resolved, rejected) => {
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
      success: function (res) {
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
          resolved(res.data.userInfo);
        } else {
          // // 登录失败
          // wx.showModal({
          //   title: '提示',
          //   content: '服务器开小差了，登录失败'
          // });
          rejected();
        }
      },
      fail: function () {
        console.error("login error, api server is not avalible!");
        rejected();
      },
    })
  })

}

function refreshToken() {
  wx.request({
    url: host + "/oauth/token",
    header: {
      "content-type": "application/x-www-form-urlencoded",
      "Authorization": clientBasicAuthorization
    },
    data: {
      grant_type: "refresh_token",
      refresh_token: wx.getStorageSync("refreshToken")
    },
    method: 'POST',
    success: function (res) {
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
      }
    },
    fail: function () {
      console.error("refreshToken error, api server is not avalible!")
    },
  })
}

/**
 * POST请求，有token检查，
 * URL：接口
 * data：参数，json类型
 */
function postWithTokenCheck(url, data) {
  return requestWithTokenCheck("POST", url, data);
}

/**
 * PUT请求，有token检查，
 * URL：接口
 * data：参数，json类型
 */
function putWithTokenCheck(url, data) {
  return requestWithTokenCheck("PUT", url, data);
}

/**
 * DELETE请求，有token检查，
 * URL：接口
 * data：参数，json类型
 */
function deleteWithTokenCheck(url, data) {
  return requestWithTokenCheck("DELETE", url, data);
}

/**
 * GET请求，有token检查，
 * URL：接口
 * data：参数，json类型
 */
function getWithTokenCheck(url, data) {
  return new Promise((resolved, rejected) => {
    checkoutToken().then(res => {
      console.log("check token ok");
      request("GET", url, data, resolved, rejected);
    }).catch(e => {
      console.log("check token not ok, will retrive token");

      wx.login({
        success: res => {
          login(res.code).then(() => {
            request("GET", url, data, resolved, rejected);
          });
        }
      });
    })
  })
}

/**
 * 带有token检查的基本请求
 */
function requestWithTokenCheck(method, url, data) {

  return new Promise((resolved, rejected) => {
    checkoutToken().then(res => {
      console.log("check token ok");
      request(method, url, data, resolved, rejected);
    }).catch(e => {
      console.log("check token not ok, will retrive token");
      wx.login({
        success: res => {
          login(res.code).then(() => {
            request(method, url, data, resolved, rejected);
          });
        }
      });
    })
  })
}

/**
 * 基本请求
 */
function request(method, url, data, resolved, rejected) {
  let accessToken = wx.getStorageSync("accessToken");
  wx.request({
    url: host + url,
    header: {
      "content-type": "application/json;charset=UTF-8",
      "Authorization": "Bearer " + accessToken
    },
    data: data,
    method: method,
    success: (res) => {
      checkSuccessRes(res, resolved, rejected)
    },
    fail: (res) => {
      wx.showModal({
        title: '提示',
        content: '请检查您的网络设置'
      })
      rejected();
    },
  })
}

/**
 * 校验token
 */
function checkoutToken() {
  let accessToken = wx.getStorageSync("accessToken");
  accessToken = accessToken ? accessToken : 'needLogin';
  let url = `/oauth/check_token?token=${accessToken}`;
  return new Promise((resolved, rejected) => {
    wx.request({
      url: host + url,
      header: {
        "content-type": "application/json;charset=UTF-8",
        "Authorization": clientBasicAuthorization
      },
      data: null,
      method: 'GET',
      success: (res) => {
        // wx.hideLoading();
        checkSuccessRes(res, resolved, rejected)
      },
      fail: (res) => {
        // wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '请检查您的网络设置',
          showCancel: false,
          success: function (res) {
            wx.reLaunch({
              url: '/pages/index/index',
            })
          },
          confirmText: "重新加载",
        })
      },
    })
  });
}

/**
 * 结果校验
 */
function checkSuccessRes(res, resolved, rejected) {
  if (res.statusCode === 200 || res.statusCode === 204) {
    return resolved(res.data);
  } else if (res.statusCode === 400) {
    if (res.data && res.data.error === 'invalid_token') {
      wx.navigateTo({
        url: "/pages/login/index",
      })
    } else {
      return rejected();
    }
  } else if (res.statusCode === 401) {
    wx.navigateTo({
      url: "/pages/login/index",
    })
  } else {
    wx.showModal({
      title: '提示',
      content: '攻城狮正在抢修，请稍后再试！',
      showCancel: false,
      success: function (res) {
        wx.reLaunch({
          url: '/pages/index/index',
        })
      },
      confirmText: "重新加载",
    })
  }
  return rejected();
}

module.exports = {
  login: login,
  post: postWithTokenCheck,
  put: putWithTokenCheck,
  get: getWithTokenCheck,
  delete: deleteWithTokenCheck,
  refreshToken: refreshToken,
  checkoutToken: checkoutToken
}
