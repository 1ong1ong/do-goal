// pages/clock-in-detail/index.js
let app = getApp();
import {
  getGoalMakeDetail
} from '../../api/goals.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: app.globalData.screenHeight,
    width: app.globalData.screenWidth / (app.globalData.screenWidth / 750),
    current: null,
    goalName: '',
    goalId: 0,
    charts: [],
    earliestTime: '',
    finishNum: 0,
    finishTime: '',
    latestTime: '',
    level: 0,
    nextLevelNum: 0,
  },

  onLoad(options) {
    this.setData({
      goalId: options.goalId,
      goalName: options.goalName
    })
    wx.setNavigationBarTitle({
      title: options.goalName
    })
    
  },

  getGoalMakeDetail() {
    getGoalMakeDetail(this.data.goalId).then(data => {
      this.setData({
        charts: data.charts,
        earliestTime: data.earliestTime,
        finishNum: data.finishNum,
        finishTime: data.finishTime,
        goalId: data.goalId,
        latestTime: data.latestTime,
        level: data.level,
        nextLevelNum: data.nextLevelNum,
      })
    })
  },

  onShow() {
    this.getGoalMakeDetail();
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