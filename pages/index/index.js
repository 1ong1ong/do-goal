// pages/index/index.js
let app = getApp();
import {
  userGoalList
} from '../../api/goals';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: app.globalData.screenHeight / (app.globalData.screenWidth / 750),
    width: app.globalData.screenWidth / (app.globalData.screenWidth / 750),
    size: 60 / (750 / app.globalData.screenWidth),
    currentDay: 0,
    goalList: [],
    perfectDays: 0,
    reportList: [],
    topShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(this.data.height)

  },

  onShow() {
    this.getUserGoalList(); 
  },
  
  

  /**
   *  用户目标列表
   */
  getUserGoalList() {
    let userInfo = wx.getStorageSync("userInfo");
    if (userInfo) {
      let userId = userInfo.userId;
      userGoalList(userId).then(data => {
        wx.hideLoading();
        this.setData({
          goalList: data.goals,
          perfectDays: data.perfectDays,
          reportList: data.reportList,
          currentDay: data.currentWeekDay,
          topShow: true
        });
      });
    }
  },

  /**
   * 路由到周报页面
   */
  goWeekReport() {
    wx.navigateTo({
      url: '/pages/week-report/index'
    });
  },

  /**
   * 路由到打卡详情页面
   */
  goGoalDetail(e) {
    let goal = e.currentTarget.dataset.goal;
    console.log(goal);

    // 今天打过打卡
    if(goal.finishedToday) {
      wx.navigateTo({
        url: `/pages/clock-in-detail/index?goalId=${goal.id}&goalName=${goal.name}`
      });
    } 
    // 今天没有打卡了
    else {
      wx.navigateTo({
        url: `/pages/clock-in/index?goalId=${goal.id}&goalName=${goal.name}`
      });
    }

  },

  routeGoalList() {
    wx.navigateTo({
      url: '/pages/goal-list/index'
    });
  },

});
