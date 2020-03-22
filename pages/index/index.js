// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentDay: 6
  },

  /**
   * 路由到周报页面
   */
  goWeekReport() {
    wx.navigateTo({
      url: '/pages/week-report/index'
    });
  },
  
})