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

});
