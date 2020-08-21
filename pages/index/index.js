// pages/index/index.js
let app = getApp();
import {
  userGoalList
} from '../../api/goals';
import {
  getUserInfo
} from '../../utils/userInfoUtil';
import {
  getCurrentUserInfo
} from '../../api/user.js'
import {
  getByThemeId
} from '../../api/theme.js';
import {
  getMobileModel
} from '../../utils/systemUtils'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: app.globalData.screenHeight / (app.globalData.screenWidth / 750),
    width: app.globalData.screenWidth / (app.globalData.screenWidth / 750),
    bottom: 130,
    size: 60 / (750 / app.globalData.screenWidth),
    currentDay: 0,
    goalList: [],
    perfectDays: 0,
    reportList: [],
    topShow: false,
    authorize: false,
    homeBgColor: '#27A4FB',
    homeTopBackgroundImgSrc: '',
    globalColor: app.globalData.globalColor
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    // 判断机型
    let model = getMobileModel();
    let bottom = 130;
    console.log(model)
    if (model.indexOf('iPhone X') != -1) {
      console.log("bottom", bottom)
      bottom = 200;
    }

    // 获取用户的授权状态
    let authorize = false;
    let userInfo = wx.getStorageSync("userInfo");
    if (userInfo !== null && userInfo !== '') {
      authorize = userInfo.authorize;
    }
    this.setData({
      authorize: authorize,
      bottom: bottom
    })
  },

  onShow() {
    // 获取用户的主题设置
    this.getUserTheme();
    this.getTabBar().init();
    this.getUserGoalList();
  },

  getUserTheme() {
    let that = this;
    getCurrentUserInfo().then((user) => {
      getByThemeId(user.theme).then(data => {
        that.setData({
          homeBgColor: data.homeBgColor,
          homeTopBackgroundImgSrc: data.homeTopBackgroundImgSrc
        })
      });
    });
  },

  /**
   *  用户目标列表
   */
  getUserGoalList() {
    userGoalList().then(data => {
      wx.hideLoading();
      this.setData({
        goalList: data.goals,
        perfectDays: data.perfectDays,
        reportList: data.reportList,
        currentDay: data.currentWeekDay,
        topShow: true
      });
    });
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
    // 今天打过打卡
    if (goal.finishedToday) {
      wx.navigateTo({
        url: `/pages/clock-in-detail/index?goalId=${goal.id}&goalName=${goal.name}&icon=${goal.icon}`
      });
    }
    // 今天没有打卡了
    else {
      wx.navigateTo({
        url: `/pages/clock-in/index?goalId=${goal.id}&goalName=${goal.name}&icon=${goal.icon}`
      });
    }

  },

  routeGoalList() {
    wx.navigateTo({
      url: '/pages/goal-list/index'
    });
  },

  /**
   * 用户信息授权成功回调
   */
  bindGetUserInfo(e) {
    let _this = this;
    getUserInfo().then(() => {
      _this.setData({
        authorize: true
      });
      wx.navigateTo({
        url: '/pages/goal-list/index'
      });
    });
  },
});