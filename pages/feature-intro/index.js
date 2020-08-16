// pages/feature-intro/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    updateLogList:[
      {
        id:1,
        title:'Do目标1.0.0主要更新内容',
        time:'2020年08月11日',
        webUrl:'https://www.cxlsky.com/archives/doris-mysql-table'
      }
    ]
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

  },

  goLogDetail(e) {
    console.log(e)
    let log = e.target.dataset.log;
    wx.navigateTo({
      url: `/pages/web/index?webUrl=${log.webUrl}`,
    })
  }
})