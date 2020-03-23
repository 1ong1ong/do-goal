// pages/history-week-report/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
