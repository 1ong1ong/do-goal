// pages/history-week-report-detail/index.js
import {
  getWeekReportHisDetail
} from '../../api/goalWeekReport.js';
import {
  randomShareImg
} from '../../api/shareImg.js';
import {
  getUserInfo
} from '../../utils/userInfoUtil';
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    size: 60 / (750 / app.globalData.screenWidth),
    weekReportHisDetail: null,
    startDate: '',
    endDate:'',
    canvasHide: true,
    shareInfo: null,
  },

  onLoad(options) {
    console.log(options)
    this.setData({
      startDate: options.startDate,
      endDate: options.endDate
    })
  },

  onShow() {
    this.getWeekReportHisDetail();
  },

  getWeekReportHisDetail() {
    wx.showLoading({
      title: '加载中',
    })
    let params = {
      startDate: this.data.startDate,
      endDate: this.data.endDate
    }
    getWeekReportHisDetail(params).then(data=> {
      wx.hideLoading();
      let userInfo = wx.getStorageSync("userInfo");
      let lastWeekReport = data;
      let shareInfo = {
        beginDate: lastWeekReport.beginDateShare,
        endDate: lastWeekReport.endDateShare,
        doingDays: lastWeekReport.doingDays,
        makeGoalNums: lastWeekReport.makeGoalNums,
        nickName: userInfo.nickName,
        avatarImg: userInfo.avatar
      };
      this.setData({
        weekReportHisDetail: lastWeekReport,
        shareInfo: shareInfo
      })
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


  
  move() {
    // 不要删除，防止页面滚动
  },

  hideCanvas() {
    this.setData({
      canvasHide: true
    });
  },

  /**
   * 用户信息授权成功回调
   */
  bindGetUserInfo(e) {
    let _this = this;
    console.log(e)
    getUserInfo().then(() => {
      _this.drawCanvas();
    }).catch(()=>{
      wx.showModal({
        content: '需要授权获取您的头像才可以分享',
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
                  title: '您没有授权，无法分享',
                  icon: 'none'
                });
              }
            }
          })
        }
      })
    });
  },

  drawCanvas() {
    let that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.writePhotosAlbum']) {
          that.canvas();
        } else if (res.authSetting['scope.writePhotosAlbum'] === undefined) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              that.canvas();
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
                    that.canvas();
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
  canvas() {
    let that = this;
    console.log(that.data.shareInfo)
    this.setData({
      canvasHide: false
    });
    wx.showToast({
      title: '分享图片生成中...',
      icon: 'loading'
    });

    let promise1 = new Promise(function (resolve, reject) {
      randomShareImg().then(coverImgUrl => {
        console.log(coverImgUrl);
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
      console.log(res1);
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
      ctx.fillText(that.data.shareInfo.nickName, avatar_w + avatar_x + 30, avatar_y + 20);

      ctx.font = 'normal 14px Arial,sans-serif ';
      ctx.setFillStyle('#ddd');
      ctx.fillText(that.data.shareInfo.beginDate + ' ~ ' + that.data.shareInfo.endDate, avatar_w + avatar_x + 30, avatar_y + 42);

      // 完美日
      ctx.font = 'normal 14px 微软雅黑';
      ctx.setFillStyle('#ddd');
      ctx.fillText('打卡天数', avatar_x, avatar_y + 90);

      ctx.font = 'normal 26px bolder 微软雅黑';
      ctx.setFillStyle('white');
      ctx.fillText(that.data.shareInfo.doingDays + '', avatar_x, avatar_y + 122);

      ctx.font = 'normal 14px 微软雅黑';
      ctx.setFillStyle('#ddd');
      ctx.fillText('天', avatar_x + 20, avatar_y + 122);

      // 打卡天数
      ctx.font = 'normal 14px 微软雅黑';
      ctx.setFillStyle('#ddd');
      ctx.fillText('打卡次数', avatar_x, avatar_y + 160);

      let makeGoalNums = that.data.shareInfo.makeGoalNums;
      ctx.font = 'normal 26px bolder 微软雅黑';
      ctx.setFillStyle('white');
      ctx.fillText(makeGoalNums + '', avatar_x, avatar_y + 192);

      ctx.font = 'normal 14px 微软雅黑';
      ctx.setFillStyle('#ddd');
      ctx.fillText('次', avatar_x + (makeGoalNums > 9 ? 30 : 20), avatar_y + 192);

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
              canvasHide: false
            });
            that.save(res.tempFilePath);
            wx.hideToast()
          },
          fail: function (res) {

          }
        }, this)
      }, 200));
    })
  },

  // 保存到相册
  save(canvasImg) {
    let that = this;
    wx.saveImageToPhotosAlbum({
      filePath: canvasImg,
      success(res) {
        that.setData({
          canvasHide: false
        });
      }
    })
  },




})