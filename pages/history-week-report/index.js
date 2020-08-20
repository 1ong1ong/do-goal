// pages/history-week-report/index.js
import {getWeekReportHisList} from '../../api/goalWeekReport';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyList:[]
  },

  onShow() {
    getWeekReportHisList().then(data=>{
      this.setData({
        historyList: data
      })
    });
  },

  /**
   * 重定向到周报页面
   */
  goWeekReport(e) {
    console.log(e.target.dataset.item.weekStartDate)

    let startDate = e.target.dataset.item.weekStartDate;
    let endDate = e.target.dataset.item.weekEndDate;
    wx.navigateTo({
      url: `/pages/history-week-report-detail/index?startDate=${startDate}&endDate=${endDate}`
    });
  },

})
