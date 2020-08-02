// pages/goal-list/index.js
import { getGoalList } from '../../api/goals.js';
let app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: app.globalData.screenHeight - 132,
    width: app.globalData.screenWidth,
    goalList: []
  },

  onShow() {
    if(this.data.goalList.length === 0) {
      this.getGoalList();
    }
  },

  getGoalList() {
    getGoalList().then(data => {
      this.setData({
        goalList: data
      })
    })
  },
  
  /**
   * 返回
   */
  goBackPage() {
    wx.navigateBack();
  },

  /**
   * 去目标详情
   */
  routeGoalDetail(e) {
    let goal = e.target.dataset.goal;
    // 没有添加过，跳转添加页面
    if (!goal.isAdded) {
      wx.navigateTo({
        url: `/pages/goal-detail/index?goalId=${goal.id}&goalName=${goal.name}&goalDesc=${goal.description}&doingNum=${goal.doingNum}&notifyTime=${goal.notifyTime}`
      })
    } 
    // 已经添加过，且今日打过卡
    else if (goal.finishedToday) { 
      wx.navigateTo({
        url: `/pages/clock-in-detail/index?goalId=${goal.id}&goalName=${goal.name}`
      });
    } 
    // 已经添加过，且今日没有打卡
    else { 
      wx.navigateTo({
        url: `/pages/clock-in/index?goalId=${goal.id}&goalName=${goal.name}`
      });
    }
  },

  /**
   * 去目标自定义添加页面
   */
  routeGoalAdd() {
    wx.navigateTo({
      url: "/pages/goal-add/index"
    })
  }
})