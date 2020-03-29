// pages/post-talking/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authProps: [
      {
        name: '所有人可见'
      },
      {
        name: '仅自己可见'
      }
    ],
    inputHeight: 0,
    focused: true
  },

  talkingFocus(e) {
    let inputHeight = 0;
    if (e.detail.height) {
      inputHeight = e.detail.height
    }
    this.setData({
      inputHeight: inputHeight
    })
  },
  talkingBlur() {
    this.setData({
      inputHeight: 0
    })
  },
  inputAreaClick() {
    this.setData({
      focused: true
    })
  },
  publishConfirm() {
    wx.navigateBack()
  }
})