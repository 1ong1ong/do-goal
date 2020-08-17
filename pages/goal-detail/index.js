// pages/goal-detail/index.js
let app = getApp();
import {
  addSystemGoal, modifySystemGoal
} from '../../api/goals.js';
import {
  remove,
  indexOf
} from '../../utils/listUtil.js';
import Dialog from '../../components/vant/dialog/dialog.js';


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // backgroundImageUrl: "https://imgs.cxlsky.com/zaoqi.png",
    height: app.globalData.screenHeight,
    width: app.globalData.screenWidth,
    globalColor: app.globalData.globalColor,
    goalInfo: null,
    popupShow: false,
    notifyTimeList: [],
  },

  onLoad(options) {
    console.log(options);
    this.setData({
      goalInfo: options,
      notifyTimeList: options.notifyTime.split(",")
    });
    console.log(this.data);
  },

  onShow() {
    this.setData({
      globalColor: app.globalData.globalColor
    })
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
    if (index === -1) {
      notifyTimeList.push(event.detail);
      this.setData({
        notifyTimeList: notifyTimeList,
        popupShow: false
      })
    } else {
      Dialog.alert({ message:'此时间已添加'});
    }
  },

  /**
   * 回到上一页
   */
  goBackPage() {
    wx.navigateBack();
  },

  addGoalReq() {
    let that = this;
    let data = {
      goalId: that.data.goalInfo.goalId,
      notifyTimeList: that.data.notifyTimeList
    };
    // 修改目标
    if (that.data.goalInfo.edit === 'true') {
      modifySystemGoal(that.data.goalInfo.goalId, data).then(data => {
        if (data) {
          wx.navigateBack();
        } else {
          Dialog.alert({ message:'目标添加失败'});
        }
      })
    } else { // 添加目标

      addSystemGoal(that.data.goalInfo.goalId, data).then(data => {
        if (data) {
          wx.switchTab({
            url: '/pages/index/index'
          })
        } else {
          Dialog.alert({ message: '目标添加失败' });
        }
      })
    }

  },
  /**
   * 添加目标
   */
  addGoal() {
    let that = this;
    wx.requestSubscribeMessage({
      tmplIds: ['QAEIUBgrncQV9hVxbhf4pPKVA0aaKivOm31jLhPpIM8'],
      success(res) {
        console.log("requestSubscribeMessage success result:", res);
        if (res['QAEIUBgrncQV9hVxbhf4pPKVA0aaKivOm31jLhPpIM8'] === "accept") {
          that.addGoalReq();
        } else {
          Dialog.alert({
            title: '打卡提示',
            message: '>.< 您狠心拒绝了消息提醒，下次将不会收到提醒消息！',
          }).then(() => {
            that.addGoalReq();
          });
        }
      },
      fail(res) {
        console.log("requestSubscribeMessage fail result:", res);
      }
    })
  },
})
