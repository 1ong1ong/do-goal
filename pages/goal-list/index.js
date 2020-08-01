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
    console.log(e.target.dataset.goal)
    wx.navigateTo({
      url: `/pages/goal-detail/index?goalId=${goal.id}&goalName=${goal.name}&goalDesc=${goal.description}&doingNum=${goal.doingNum}&notifyTime=${goal.notifyTime}`  
    })
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