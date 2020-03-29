// pages/clock-in-detail/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: app.globalData.screenHeight,
    width: app.globalData.screenWidth / (app.globalData.screenWidth / 750),
    charts: [],
    current: null
  },

  onLoad() {
    let charts = [{
        date: '3月22日',
        time: '07:23',
        percent: 90
      }, {
        date: '23',
        time: '07:23',
        percent: 40
      }, {
        date: '24',
        time: '07:23',
        percent: 50
      }, {
        date: '25',
        time: '07:23',
        percent: 70
      }, {
        date: '26',
        time: '',
        percent: 0
      }, {
        date: '27',
        time: '07:23',
        percent: 10
      }, {
        date: '28',
        time: '07:23',
        percent: 80
      }

    ];
    this.setData({
      charts: charts
    })
  },

  /**
   * 返回
   */
  goBackPage() {
    wx.navigateBack();
  },

  /**
   * 开始按压
   * @param e
   */
  touchPercent(e) {
    this.setData({
      current: e.currentTarget.dataset.index
    })
  },

  /**
   * 结束按压
   */
  touchPercentEnd() {
    setTimeout(() => {
      this.setData({
        current: null
      })
    }, 500)
  },

  /**
   * 发票动态
   */
  routePostTalking() {
    wx.navigateTo({
      url: "/pages/post-talking/index"
    })
  }
});