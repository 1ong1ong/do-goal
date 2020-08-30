// pages/clock-in-detail/index.js
let app = getApp();
import {
  getGoalMakeDetail,
  getGoalRankList,
  userMakeGoal
} from '../../api/goals.js';
import {
  getGoalPostsByGoalId
} from '../../api/goalPost.js';
import {
  getUserInfo
} from '../../utils/userInfoUtil';
import {
  randomShareImg
} from '../../api/shareImg.js';
import {
  getCurrentUserInfo
} from '../../api/user.js';

import Dialog from '../../components/vant/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: app.globalData.screenHeight,
    width: app.globalData.screenWidth / (app.globalData.screenWidth / 750),
    widthCanvas: app.globalData.screenWidth,
    height: app.globalData.screenHeight,
    current: null,
    goalName: '',
    goalId: 0,
    icon: '',
    charts: [],
    earliestTime: '',
    finishNum: 0,
    finishTime: '',
    latestTime: '',
    level: 0,
    nextLevelNum: 0,
    levelShowList: [],
    goalRankList: [],
    selfRankInfo: {},
    postList: [],
    globalColor: app.globalData.globalColor,
    auditStatus: app.globalData.auditStatus,
    canvasHide: true,
    shareInfo: null,
    tempFilePath: ''
  },

  onLoad(options) {
    this.setData({
      goalId: options.goalId,
      goalName: options.goalName,
      icon: options.icon
    });
    wx.setNavigationBarTitle({
      title: options.goalName
    });
  },

  onShow() {
    this.setData({
      auditStatus: app.globalData.auditStatus
    })
    this.initNavigationBar();
    this.getGoalMakeDetail();
    this.getGoalRankList();
    // this.getGoalPostsByGoalId();
  },

  // 设置顶部导航栏
  initNavigationBar() {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: app.globalData.globalColor,
    });
    wx.setBackgroundColor({
      backgroundColor: app.globalData.globalColor,
    })
    wx.setNavigationBarTitle({
      title: this.data.goalName,
    })
    this.setData({
      globalColor: app.globalData.globalColor
    })
  },

  onShareAppMessage(res) {

    console.log("==============")
    // let gbid = res.target.dataset.info.order_id;
    return {
      title: '分享',
      path: '/pages/index/index?fromUserId=' + 1,
      // imageUrl: 'https://......./img/groupshare.png',  //用户分享出去的自定义图片大小为5:4,
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: "分享成功",
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        // 分享失败
      },
    }

  },
  getGoalPostsByGoalId() {
    getGoalPostsByGoalId(this.data.goalId).then(data => {
      this.setData({
        postList: data
      })
    })
  },

  getGoalRankList() {
    getGoalRankList(this.data.goalId).then(data => {
      this.setData({
        goalRankList: data.rankList,
        selfRankInfo: data.self
      })
    })
  },


  getGoalMakeDetail() {
    let that = this;
    return new Promise((resolve, reject) => {
      getGoalMakeDetail(that.data.goalId).then(data => {
        that.putData(data).then(() => resolve());
      }).catch(() => reject())
    })
  },


  putData(data) {
    let that = this;
    return new Promise((resolve, reject) => {
      getCurrentUserInfo().then(userInfo => {
        let levelShowList = that.getLevelShowList(data.level);
        let shareInfo = {
          finishTime: data.finishTime,
          finishNum: data.finishNum,
          nickName: userInfo.nickName,
          avatarImg: userInfo.avatar
        };
        that.setData({
          charts: data.charts,
          earliestTime: data.earliestTime,
          finishNum: data.finishNum,
          finishTime: data.finishTime,
          latestTime: data.latestTime,
          level: data.level,
          nextLevelNum: data.nextLevelNum,
          levelShowList: levelShowList,
          shareInfo: shareInfo
        });
        resolve();
      }).catch(() => reject())
    })

  },

  getLevelShowList(level) {
    let levelShowList = [];
    if (level <= 2) {
      for (let i = 0; i < level; i++) {
        levelShowList.push("star");
      }
    } else if (level <= 4) {
      for (let i = 0; i < level - 2; i++) {
        levelShowList.push("moon");
      }
    } else if (level <= 6) {
      for (let i = 0; i < level - 4; i++) {
        levelShowList.push("taiyang");
      }
    } else {
      for (let i = 0; i < level - 6; i++) {
        levelShowList.push("huangguan");
      }
    }
    return levelShowList;
  },

  /**
   * 返回
   */
  goBackPage() {
    wx.navigateBack();
  },

  /**
   * 开始按压
   * @param e
   */
  touchPercent(e) {
    this.setData({
      current: e.currentTarget.dataset.index
    })
  },

  /**
   * 结束按压
   */
  touchPercentEnd() {
    setTimeout(() => {
      this.setData({
        current: null
      })
    }, 500)
  },

  /**
   * 发票动态
   */
  // routePostTalking() {
  //   wx.navigateTo({
  //     url: `/pages/post-talking/index?goalId=${this.data.goalId}&goalName=${this.data.goalName}&icon=${this.data.icon}&finishNum=${this.data.finishNum}`
  //   })
  // }

  hideCanvas() {
    let that = this;
    that.getGoalMakeDetail().then(() => {
      that.setData({
        canvasHide: true
      });
    })
    that.getGoalRankList();
  },

  message() {
    let that = this;
    wx.requestSubscribeMessage({
      tmplIds: ['QAEIUBgrncQV9hVxbhf4pPKVA0aaKivOm31jLhPpIM8', 'UHggJVhRqb1k42hqxbdETUfuiIa2zTXvwOnqF7oNr0E'],
      success(res) {
        console.log("requestSubscribeMessage success result:", res);
        if (res['QAEIUBgrncQV9hVxbhf4pPKVA0aaKivOm31jLhPpIM8'] === "accept" || res['UHggJVhRqb1k42hqxbdETUfuiIa2zTXvwOnqF7oNr0E'] === "accept") {
          console.log("=============================requestSubscribeMessage success")
          // that.makeGoal();
          that.drawAfterGetUserInfo()
        } else {
          Dialog.alert({
            title: '打卡提示',
            message: '>_< 您拒绝了消息提醒，将不会收到提醒消息！',
          }).then(() => {
            console.log("=============================requestSubscribeMessage reject")
            that.drawAfterGetUserInfo()
            // that.makeGoal();
          });
        }
      },
      fail(res) {
        Dialog.alert({
          title: '打卡提示',
          message: '>_< 您关闭了消息提醒，将不会收到提醒消息！',
        }).then(() => {
          console.log("=============================requestSubscribeMessage fail")
          that.drawAfterGetUserInfo()
          // that.makeGoal();
        });
        // console.log("requestSubscribeMessage fail result:", res);
      },
      complete(res) {

      }
    });
  },

  move() {

  },

  drawAfterGetUserInfo() {
    let _this = this;
    getUserInfo().then(() => {
      _this.drawCanvas();
    }).catch(() => {
      wx.showModal({
        content: '需要授权获取您的头像',
        showCancel: false,
        confirmText: '去设置',
        confirmColor: 'red',
        success: function (res) {
          wx.openSetting({
            success(res) {
              if (res.authSetting['scope.userInfo']) {
                _this.drawCanvas();
              } else {
                wx.showToast({
                  title: '您没有授权，无法打卡',
                  icon: 'none'
                });
              }
            }
          })
        }
      })
    });
  },

  bindGetUserInfo(e) {
    
  },

  drawCanvas() {
    let that = this;
    userMakeGoal(that.data.goalId).then((data) => {
      console.log("=============================data", data)
      that.putData(data).then(() => {
        that.canvas();
      })
    })
  },

  canvas() {

    console.log(this.data.shareInfo)

    let that = this;
    this.setData({
      canvasHide: false
    });
    wx.showToast({
      title: '生成打卡图片...',
      icon: 'loading'
    });

    let promise1 = new Promise(function (resolve, reject) {
      randomShareImg().then(coverImgUrl => {
        wx.getImageInfo({
          src: coverImgUrl,
          success: function (res1) {
            resolve(res1);
          }
        })
      }).catch(() => reject());
    });

    let promise2 = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: that.data.shareInfo.avatarImg,
        success: function (res1) {
          resolve(res1);
        }
      })
    });

    let promise3 = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: 'https://imgs.cxlsky.com/blog/qrcode_1598279758731.jpg',
        success: function (res1) {
          resolve(res1);
        }
      })
    });

    Promise.all([
      promise1, promise2, promise3
    ]).then(res1 => {
      const ctx = wx.createCanvasContext('Canvas', this);

      // 绘制背景
      let bg_x = 0;
      let bg_y = 0;
      let bg_w = 320;
      let bg_h = 320;
      ctx.drawImage(res1[0].path, bg_x, bg_y, bg_w, bg_h);

      // 绘制头像
      ctx.save();
      let avatar_x = 20;
      let avatar_y = 20;
      let avatar_w = 50;
      let avatar_h = 50;
      ctx.beginPath();
      ctx.arc(avatar_w / 2 + avatar_x, avatar_h / 2 + avatar_y, avatar_w / 2, 0, Math.PI * 2, false);
      ctx.clip();
      ctx.drawImage(res1[1].path, avatar_x, avatar_y, avatar_w, avatar_h);
      ctx.restore();

      ctx.font = 'normal 20px bolder 微软雅黑 ';
      ctx.setFillStyle('white');
      ctx.fillText('目标：' + that.data.goalName, avatar_w + avatar_x + 30, avatar_y + 20);

      ctx.font = 'normal 14px Arial,sans-serif ';
      ctx.setFillStyle('#ddd');
      ctx.fillText(new Date().toLocaleDateString(), avatar_w + avatar_x + 30, avatar_y + 42);

      // 完美日
      ctx.font = 'normal 14px 微软雅黑';
      ctx.setFillStyle('#ddd');
      ctx.fillText('打卡时间', avatar_x, avatar_y + 90);

      ctx.font = 'normal 26px bolder 微软雅黑';
      ctx.setFillStyle('white');
      ctx.fillText(that.data.shareInfo.finishTime + '', avatar_x, avatar_y + 122);

      // ctx.font = 'normal 14px 微软雅黑';
      // ctx.setFillStyle('#ddd');
      // ctx.fillText('天', avatar_x + 20, avatar_y + 122);

      // 打卡天数
      ctx.font = 'normal 14px 微软雅黑';
      ctx.setFillStyle('#ddd');
      ctx.fillText('坚持天数', avatar_x, avatar_y + 160);

      let finishNum = that.data.shareInfo.finishNum;
      ctx.font = 'normal 26px bolder 微软雅黑';
      ctx.setFillStyle('white');
      ctx.fillText(finishNum + '', avatar_x, avatar_y + 192);

      ctx.font = 'normal 14px 微软雅黑';
      ctx.setFillStyle('#ddd');
      ctx.fillText('天', avatar_x + (finishNum > 9 ? 30 : finishNum > 99 ? 40 : finishNum > 999 ? 50 : 20), avatar_y + 192);

      ctx.font = 'normal 14px bolder 微软雅黑';
      ctx.setFillStyle('white');
      ctx.fillText('逆风的方向更适合飞翔', avatar_x, 282);

      ctx.font = 'normal 14px bolder 微软雅黑';
      ctx.setFillStyle('white');
      ctx.fillText('不怕万人阻挡只怕自己投降', avatar_x, 300);

      // 绘制二维码
      let qr_x = 275;
      let qr_y = 275;
      let qr_w = 50;
      let qr_h = 50;
      ctx.beginPath();
      ctx.drawImage(res1[2].path, qr_x - qr_w / 2, qr_y - qr_h / 2, qr_w, qr_h);

      ctx.setFontSize(10);
      ctx.setFillStyle('white');
      ctx.fillText('一起定目标', qr_x - qr_w / 2, qr_y - 5 - qr_h / 2);

      ctx.stroke();
      ctx.draw();
      ctx.restore();

      //绘制图片
      ctx.draw(true, setTimeout(() => {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 320,
          height: 320,
          destWidth: 320 * 3,
          destHeight: 320 * 3,
          canvasId: 'Canvas',
          success: function (res) {
            that.setData({
              canvasHide: false,
              tempFilePath: res.tempFilePath
            });
            // that.save(res.tempFilePath);
            wx.hideToast()
          },
          fail: function (res) {

          }
        }, this)
      }, 200));
    })
  },

  // 保存到相册
  save() {
    let that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.writePhotosAlbum']) {
          that.saveImg();
        } else if (res.authSetting['scope.writePhotosAlbum'] === undefined) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              that.saveImg();
            },
            fail() {
              wx.showToast({
                title: '您没有授权，无法保存到相册',
                icon: 'none'
              })
            }
          })
        } else {
          wx.showModal({
            content: '需要授权，才可以保存相册',
            showCancel: false,
            confirmText: '去设置',
            confirmColor: 'red',
            success: function (res) {
              wx.openSetting({
                success(res) {
                  if (res.authSetting['scope.writePhotosAlbum']) {
                    that.saveImg();
                  } else {
                    wx.showToast({
                      title: '您没有授权，无法保存到相册',
                      icon: 'none'
                    });
                  }
                }
              })
            }
          })
        }
      }
    })
  },
  saveImg() {
    let that = this;
    wx.saveImageToPhotosAlbum({
      filePath: that.data.tempFilePath,
      success(res) {
        that.hideCanvas();
      }
    })
  }
});