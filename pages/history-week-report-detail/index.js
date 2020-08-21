// pages/history-week-report-detail/index.js
import {
  getWeekReportHisDetail
} from '../../api/goalWeekReport.js'
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    size: 60 / (750 / app.globalData.screenWidth),
    weekReportHisDetail: null,
    startDate: '',
    endDate:''
  },

  onLoad(options) {
    console.log(options)
    this.setData({
      startDate: options.startDate,
      endDate: options.endDate
    })
  },

  onShow() {
    wx.showLoading({
      title: '加载中',
    })
    let params = {
      startDate: this.data.startDate,
      endDate: this.data.endDate
    }
    getWeekReportHisDetail(params).then(data=> {
      wx.hideLoading();
      this.setData({
        weekReportHisDetail: data
      })
    })
  }

})