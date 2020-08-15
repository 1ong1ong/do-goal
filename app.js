import http from './utils/httpUtils.js';

//app.js
App({
  onLaunch: function() {
    let that = this;
    // 登录
    wx.showLoading({
      title: '加载中'
    })
    wx.login({
      success: res => {
        http.login(res.code).then(() => {
          wx.hideLoading();
        });
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
    screenWidth: 0,
    screenHeight: 0
  }
})
