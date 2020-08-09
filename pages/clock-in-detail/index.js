// pages/clock-in-detail/index.js
let app = getApp();
import {
  getGoalMakeDetail,
  getGoalRankList
} from '../../api/goals.js';
import {
  getGoalPostsByGoalId
} from '../../api/goalPost.js'
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
    icon: '',
    charts: [],
    earliestTime: '',
    finishNum: 0,
    finishTime: '',
    latestTime: '',
    level: 0,
    nextLevelNum: 0,
    levelShowList: [],
    goalRankList: [],
    selfRankInfo: {},
    postList: []
  },

  onLoad(options) {
    this.setData({
      goalId: options.goalId,
      goalName: options.goalName,
      icon: options.icon
    })
    wx.setNavigationBarTitle({
      title: options.goalName
    })

  },

  onShow() {
    this.getGoalMakeDetail();
    this.getGoalRankList();
    this.getGoalPostsByGoalId();
  },

  getGoalPostsByGoalId() {
    getGoalPostsByGoalId(this.data.goalId).then(data=> {
      this.setData({
        postList: data
      })
    })
  },

  getGoalRankList() {
    getGoalRankList(this.data.goalId).then(data => {
      this.setData({
        goalRankList: data.rankList,
        selfRankInfo: data.self
      })
    })
  },


  getGoalMakeDetail() {
    getGoalMakeDetail(this.data.goalId).then(data => {
      let levelShowList = this.getLevelShowList(data.level);
      this.setData({
        charts: data.charts,
        earliestTime: data.earliestTime,
        finishNum: data.finishNum,
        finishTime: data.finishTime,
        goalId: data.goalId,
        latestTime: data.latestTime,
        level: data.level,
        nextLevelNum: data.nextLevelNum,
        levelShowList: levelShowList
      })
    })
  },

  getLevelShowList(level) {
    let levelShowList = [];
    if (level <= 2) {
      for (let i = 0; i < level; i++) {
        levelShowList.push("star");
      }
    } else if (level <= 4) {
      for (let i = 0; i < level - 2; i++) {
        levelShowList.push("moon");
      }
    } else if (level <= 6) {
      for (let i = 0; i < level - 4; i++) {
        levelShowList.push("taiyang");
      }
    } else {
      for (let i = 0; i < level - 6; i++) {
        levelShowList.push("huangguan");
      }
    }
    return levelShowList;
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
      url: `/pages/post-talking/index?goalId=${this.data.goalId}&goalName=${this.data.goalName}&icon=${this.data.icon}&finishNum=${this.data.finishNum}`
    })
  }
});