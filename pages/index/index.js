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

  /**
   * 路由到打卡详情页面
   */
  goGoalDetail() {
    wx.navigateTo({
      url: '/pages/clock-in/index'
    });
  }
});
