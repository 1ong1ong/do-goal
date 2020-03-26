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
        that.globalData.screenWidth= res.screenWidth;
        that.globalData.screenHeight= res.screenHeight / (res.screenWidth / 750)
      }
    })

  },
  globalData: {
    userInfo: null,
    screenWidth: 0,
    screenHeight: 0
  }
})
