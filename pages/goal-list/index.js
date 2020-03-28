// pages/goal-list/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: app.globalData.screenHeight - 132,
    width: app.globalData.screenWidth
  },

  /**
   * 返回
   */
  goBackPage() {
    wx.navigateBack();
  },

  /**
   * 去目标详情
   */
  routeGoalDetail() {
    wx.navigateTo({
      url: "/pages/goal-detail/index"
    })
  }
})