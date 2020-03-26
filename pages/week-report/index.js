// pages/week-report/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 路由到历史周报页面
   */
  goHistoryWeekReport() {
    wx.navigateTo({
      url: '/pages/history-week-report/index'
    });
  }

});
