// pages/index/index.js
import {
  userGoalList
} from '../../api/goals';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentDay: 6,
    goalList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
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
        this.setData({
          goalList: data
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

    wx.navigateTo({
      url: `/pages/clock-in/index?goalId=${goal.id}&goalName=${goal.name}`
    });
  },

  routeGoalList() {
    wx.navigateTo({
      url: '/pages/goal-list/index'
    });
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }

});
