// pages/clock-in/index.js
import {userMakeGoal} from '../../api/goals';
import Dialog from '../../components/vant/dialog/dialog';
let app = getApp();
Page({
  data: {
    screenWidth: 0, //屏幕宽度
    screenHeight: 0, // 屏幕高度
    backgroundImageUrl: "https://imgs.cxlsky.com/zaoqi.png",
    goalName: '',
    goalId: 0,
    icon:'',
    globalColor: app.globalData.globalColor
  },

  onLoad: function (options) {
    this.initScreenWidthAndHeight();
    this.setData({
      goalId: options.goalId,
      goalName: options.goalName,
      icon: options.icon
    });
  },

  onShow() {
    this.initNavigationBar();
  },

  // 设置顶部导航栏
  initNavigationBar() {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: this.data.globalColor,
    });
    wx.setNavigationBarTitle({
      title: this.data.goalName,
    });
    this.setData({
      globalColor: app.globalData.globalColor
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

  makeGoal() {
    let that = this;
    let userInfo = wx.getStorageSync("userInfo");
    let userId = userInfo.userId;
    userMakeGoal(that.data.goalId, userId).then(res => {
      if (res) {
        wx.redirectTo({
          url: `/pages/clock-in-detail/index?goalId=${that.data.goalId}&goalName=${that.data.goalName}&icon=${that.data.icon}`
        })
      }
    });
  },

  /**
   * 打卡确认
   */
  goalConfirm() {
    let that = this;
    wx.requestSubscribeMessage({
      tmplIds: ['QAEIUBgrncQV9hVxbhf4pPKVA0aaKivOm31jLhPpIM8'],
      success(res) {
        console.log("requestSubscribeMessage success result:",res);
        if (res['QAEIUBgrncQV9hVxbhf4pPKVA0aaKivOm31jLhPpIM8'] === "accept") {
          that.makeGoal();
        } else {
          Dialog.alert({
            title: '打卡提示',
            message: '>.< 您狠心拒绝了消息提醒，下次将不会收到提醒消息！',
          }).then(() => {
            that.makeGoal();
          });
        }
      },
      fail(res) {
        console.log("requestSubscribeMessage fail result:", res);
      },
      complete(res) {
        
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
