// pages/history-week-report/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 重定向到周报页面
   */
  goWeekReport() {
    wx.redirectTo({
      url: '/pages/history-week-report-detail/index'
    });
  },

})
