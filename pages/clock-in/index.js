// pages/clock-in/index.js
import {userMakeGoal} from '../../api/goals';
import Toast from '../../components/vant/toast/toast.js';

Page({
  data: {
    screenWidth: 0, //屏幕宽度
    screenHeight: 0, // 屏幕高度
    backgroundImageUrl: "https://imgs.cxlsky.com/zaoqi.png",
    goalName: '',
    goalId: 0,
    icon:''
  },

  onLoad: function (options) {
    this.initScreenWidthAndHeight();
    console.log(options);
    this.setData({
      goalId: options.goalId,
      goalName: options.goalName,
      icon: options.icon
    })
  },

  // 获取屏幕宽度
  initScreenWidthAndHeight() {
    let that = this;
    // 获取屏幕宽度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          screenWidth: res.screenWidth,
          screenHeight: res.screenHeight / (res.screenWidth / 750)
        })
      },
    })
  },

  /**
   * 打卡确认
   */
  goalConfirm() {
    let that = this;
    wx.requestSubscribeMessage({
      tmplIds: ['QAEIUBgrncQV9hVxbhf4pPKVA0aaKivOm31jLhPpIM8'],
      success(res) {},
      fail(res) {
        Toast.fail('您没有授权打卡提醒，将无法提醒！');
      },
      complete(res) {
        let userInfo = wx.getStorageSync("userInfo");
        let userId = userInfo.userId;
        userMakeGoal(that.data.goalId, userId).then(res => {
          if (res) {
            wx.redirectTo({
              url: `/pages/clock-in-detail/index?goalId=${that.data.goalId}&goalName=${that.data.goalName}&icon=${that.data.icon}`
            })
          }
        });
      }
    });
    
  },

  /**
   * 回到上一页
   */
  goBackPage() {
    wx.navigateBack();
  }
})
