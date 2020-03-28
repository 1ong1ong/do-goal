// pages/goal-detail/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backgroundImageUrl: "https://imgs.cxlsky.com/zaoqi.png",
    height: app.globalData.screenHeight,
    width: app.globalData.screenWidth
  },

  /**
   * 回到上一页
   */
  goBackPage() {
    wx.navigateBack();
  }

})