// pages/week-report/index.js
import { getWeekReport } from '../../api/goalWeekReport.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onShow() {
    getWeekReport()
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
