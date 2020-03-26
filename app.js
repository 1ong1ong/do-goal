//app.js
App({
  onLaunch: function () {
    let that = this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    });

    wx.getSystemInfo({
      success(res) {
        console.log(res);
        that.globalData.navBarHeight = res.statusBarHeight
      }
    })

  },
  globalData: {
    userInfo: null,
    navBarHeight: 0
  }
})
