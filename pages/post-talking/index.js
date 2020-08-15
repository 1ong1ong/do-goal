// pages/post-talking/index.js
import { addGoalPost } from '../../api/goalPost.js'
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authProps: [{
        name: '所有人可见',
        allowWatch: true
      },
      {
        name: '仅自己可见',
        allowWatch: false
      }
    ],
    inputHeight: 0,
    focused: true,
    content: '',
    allowWatch: true,
    showPopup: false,
    goalId: 0,
    goalName: '',
    icon: '',
    finishNum: 0,
    userInfo: null,
    globalColor: app.globalData.globalColor,
  },

  onLoad(options) {
    let userInfo = wx.getStorageSync("userInfo");
    this.setData({
      goalId: options.goalId,
      goalName: options.goalName,
      icon: options.icon,
      finishNum: options.finishNum,
      userInfo: userInfo
    })
  },

  onShow() {
    this.setData({
      globalColor: app.globalData.globalColor  
    })
  },

  
  onChange(e) {
    this.setData({
      content: e.detail
    })
  },
  confirmAuth(e) {
    this.setData({
      allowWatch: e.detail.allowWatch
    })
    this.closePopup();
  },
  openPopup() {
    this.setData({
      showPopup: true
    })
  },
  closePopup() {
    this.setData({
      showPopup: false
    })
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
    let data = {
      goalId: this.data.goalId,
      content: this.data.content,
      currentFinishTimes: this.data.finishNum,
      allowWatch: this.data.allowWatch
    }
    addGoalPost(data).then(res => {
      wx.navigateBack()
    })
  },
})