import http from './utils/httpUtils.js';

//app.js
App({
  onLaunch: function() {
    let that = this;
    // 登录
    wx.login({
      success: res => {
        http.login(res.code);
      }
    });

    wx.getSystemInfo({
      success(res) {
        that.globalData.screenWidth = res.screenWidth;
        that.globalData.screenHeight = res.screenHeight;
      }
    })

   
  },
  globalData: {
    userInfo: null,
    screenWidth: 0,
    screenHeight: 0
  }
})
