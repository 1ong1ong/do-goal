// pages/goal-manage/index.js
let app = getApp();
import Dialog from "../../components/vant/dialog/dialog.js"
import {
  userGoalList,
  deleteUserGoal
} from '../../api/goals';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    screenWidth: 0, //屏幕宽度
    screenHeight: 0, // 屏幕高度
    goalList: [],
    globalColor: app.globalData.globalColor
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.initScreenWidthAndHeight();
    wx.setNavigationBarTitle({
      title: '目标管理',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  // 获取屏幕宽度
  initScreenWidthAndHeight() {
    let that = this;
    // 获取屏幕宽度
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        that.setData({
          screenWidth: res.screenWidth,
          screenHeight: res.safeArea.height / (res.screenWidth / 750)
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getUserGoalList();
  },

  goGoalManage(e) {
    console.log(e)
    let goal = e.target.dataset.goal;
    let that = this;
    // 点击删除
    if (e.detail === 'left') {
      Dialog.confirm({
        message: '确认删除目标吗？删除目标不会删除打卡记录，可再次添加此目标',
        confirmButtonText: '狠心删除',
        cancelButtonText: '我再想想',
        asyncClose: true
      }).then(() => {
        deleteUserGoal(goal.id).then(() => {
          that.getUserGoalList();
          Dialog.close();
        })
      }).catch(() => Dialog.close())
    } else { // 点击编辑
      wx.navigateTo({
        url: `/pages/goal-manage-setting/index?goalId=${goal.id}&goalName=${goal.name}`,
      })
    }
  },

  /**
   *  用户目标列表
   */
  getUserGoalList() {
    userGoalList().then(data => {
      this.setData({
        goalList: data.goals
      });
    });
  },

})