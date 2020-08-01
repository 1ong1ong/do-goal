// pages/goal-detail/index.js
let app = getApp();
import { remove, indexOf } from '../../utils/listUtil.js';
import Toast from '../../components/vant/toast/toast.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backgroundImageUrl: "https://imgs.cxlsky.com/zaoqi.png",
    height: app.globalData.screenHeight,
    width: app.globalData.screenWidth,
    goalInfo: null,
    popupShow: false,
    notifyTimeList: []
  },

  onLoad(options) {
    let notifyTimeList = this.data.notifyTimeList;
    notifyTimeList.push(options.notifyTime);
    this.setData({
      goalInfo: options,
      notifyTimeList: notifyTimeList
    })
    console.log(options);
  },

  delNotifyTime(e) {
    let time = e.target.dataset.time;
    let tempList = this.data.notifyTimeList;
    tempList.remove(time);
    this.setData({
      notifyTimeList: tempList
    })
    
  },

  openPopup() {
    this.setData({
      popupShow: true
    })
  },

  closePopup() {
    this.setData({
      popupShow: false
    })
  },

  addNotifyTime(event) {
    let notifyTime = event.detail;
    let notifyTimeList = this.data.notifyTimeList;
    let index = notifyTimeList.indexOf(notifyTime);
    // 不存在则添加
    if(index === -1) {
      notifyTimeList.push(event.detail);
      this.setData({
        notifyTimeList: notifyTimeList,
        popupShow: false
      })
    } else {
      Toast.fail('此时间已添加');
    }
  },

  /**
   * 回到上一页
   */
  goBackPage() {
    wx.navigateBack();
  },

  /**
   * 添加目标
   */
  addGoal() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  }
})