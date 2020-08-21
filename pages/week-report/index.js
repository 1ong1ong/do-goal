// pages/week-report/index.js
import { getWeekReport } from '../../api/goalWeekReport.js';
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    size: 60 / (750 / app.globalData.screenWidth),
    thisWeekReport: null,
    lastWeekReport: null
  },

  onShow() {
    wx.showLoading({
      title: '加载中',
    })
    getWeekReport().then(data=> {
      wx.hideLoading();
      this.setData({
        thisWeekReport: data.thisWeekReport,
        lastWeekReport: data.lastWeekReport
      })
    })
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
