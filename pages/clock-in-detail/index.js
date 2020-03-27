// pages/clock-in-detail/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: app.globalData.screenHeight,
    width: app.globalData.screenWidth / (app.globalData.screenWidth/750)
  },

  goBackPage() {
    wx.navigateBack();
  }
})