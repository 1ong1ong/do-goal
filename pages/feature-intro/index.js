// pages/feature-intro/index.js
import { getUpdateLogs } from '../../api/article.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    updateLogList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    getUpdateLogs().then(list=> {
      this.setData({
        updateLogList: list
      })
    })
  },

  goLogDetail(e) {
    console.log(e)
    let log = e.target.dataset.log;
    wx.navigateTo({
      url: `/pages/web/index?articleId=${log.id}&title=${log.title}`,
    })
  }
})