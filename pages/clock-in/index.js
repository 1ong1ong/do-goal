// pages/clock-in/index.js
Page({
  data: {
    screenWidth: 0, //屏幕宽度
  },

  onLoad: function () {
    let that = this;
    // 获取屏幕宽度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          screenWidth: res.screenWidth
        })
      },
    })
  },

  /**
   * 打卡确认
    */
  goalConfirm() {
    console.log("confirm")
  }
})
