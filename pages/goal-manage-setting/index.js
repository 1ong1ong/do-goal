// pages/goal-manage-setting/index.js
import {
  getUserGoalInfo,
  updateUserGoalInfo
} from '../../api/userGoals.js'
import {
  deleteUserGoal
} from '../../api/goals';
import Dialog from "../../components/vant/dialog/dialog.js"
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goalId: null,
    goalName: '',
    goalDesc: '',
    doingNum: '',
    notifyTime: [],
    showRank: true,
    globalColor: app.globalData.globalColor
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      goalId: options.goalId,
      goalName: options.goalName,
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      globalColor: app.globalData.globalColor
    })
    this.getUserGoalInfo();
  },

  /**
   * 获取用户目标设置
   */
  getUserGoalInfo() {
    wx.showLoading({
      title: '加载中',
    })
    getUserGoalInfo(this.data.goalId)
      .then(data => {
        this.setData({
          showRank: data.showRank,
          goalDesc: data.goalDesc,
          doingNum: data.doingNum,
          notifyTime: data.notifyTimeList
        });
        wx.hideLoading();
      })
  },

  showRankChange(e) {
    let status = e.detail
    let data = {
      showRank: status
    }
    updateUserGoalInfo(this.data.goalId, data).then(res => {
      this.setData({
        showRank: status,

      })
    })
  },

  deleteUserGoal() {
    let that = this;
    // 点击删除
    Dialog.confirm({
      message: '确认删除目标吗？删除目标不会删除打卡记录，可再次添加此目标',
      confirmButtonText: '狠心删除',
      cancelButtonText: '我再想想',
      asyncClose: true
    }).then(() => {
      deleteUserGoal(this.data.goalId).then(() => {
        Dialog.close();
        wx.navigateBack();
      })
    }).catch(() => Dialog.close())

  },

  editUserGoal() {
    let goal={
      id: this.data.goalId,
      name: this.data.goalName,
      description: this.data.goalDesc,
      notifyTime: this.data.notifyTime,
      doingNum:this.data.doingNum
    }
    console.log(goal);
    wx.navigateTo({
      url: `/pages/goal-detail/index?goalId=${goal.id}&goalName=${goal.name}&goalDesc=${goal.description}&doingNum=${goal.doingNum}&notifyTime=${goal.notifyTime}&edit=true`
    })
  }
})