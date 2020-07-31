// pages/clock-in/index.js
Page({
  data: {
    screenWidth: 0, //屏幕宽度
    screenHeight: 0, // 屏幕高度
    backgroundImageUrl: "https://imgs.cxlsky.com/zaoqi.png",
    goalName: '',
    goalId: 0
  },

  onLoad: function (options) {
    this.initScreenWidthAndHeight();
    console.log(options);
    this.setData({
      goalId: options.goalId,
      goalName: options.goalName
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
    wx.redirectTo({
      url: `/pages/clock-in-detail/index?goalId=${this.data.goalId}`
    })
  },

  /**
   * 回到上一页
   */
  goBackPage() {
    wx.navigateBack();
  }
})
