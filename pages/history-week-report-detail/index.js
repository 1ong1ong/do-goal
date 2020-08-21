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
  },

  onShareAppMessage(res) {
    console.log("==============")
    // let gbid = res.target.dataset.info.order_id;
    return {
      title: '分享',
      path: '/pages/index/index?fromUserId=' + 1,
      // imageUrl: 'https://......./img/groupshare.png',  //用户分享出去的自定义图片大小为5:4,
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: "分享成功",
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        // 分享失败
      },
    }
  },

})