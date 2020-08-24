// pages/week-report/index.js
import {
  getWeekReport
} from '../../api/goalWeekReport.js';
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: app.globalData.screenWidth,
    height: app.globalData.screenHeight,
    size: 60 / (750 / app.globalData.screenWidth),
    thisWeekReport: null,
    lastWeekReport: null,
    canvasHide: true,
    canvasImg: ''
  },

  onShow() {
    wx.showLoading({
      title: '加载中',
    })
    getWeekReport().then(data => {
      wx.hideLoading();
      this.setData({
        thisWeekReport: data.thisWeekReport,
        lastWeekReport: data.lastWeekReport
      })
    })
  },
  /**
   * 路由到历史周报页面
   */
  goHistoryWeekReport() {
    wx.navigateTo({
      url: '/pages/history-week-report/index'
    });
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

  },

  hideCanvas() {
    this.setData({
      canvasHide: true
    });
  },


  drawCavas() {
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
                    })
                    that.setData({
                      isSaving: false
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
    this.setData({
      canvasHide: false
    });
    wx.showToast({
      title: '分享图片生成中...',
      icon: 'loading'
    });

    var item = {
      headImg: "https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEIlQFib1RvSYkHrndyOyvCTChibjLM5It7NorB7EAf1Wxia7f9tNA83Xo7daZxE2elSHNmXw15HeiaYxw/132",
      cover: "https://imgs.cxlsky.com/blog/thumbnail-4_1588478003128.png",
      nickName: "Longlongago",
      title: "111111111"
    };

    let promise1 = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: item.cover,
        success: function (res1) {
          resolve(res1);
        }
      })
    });

    let promise2 = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: item.headImg,
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

    let that = this;
    Promise.all([
      promise1, promise2, promise3
    ]).then(res1 => {
      console.log(res1)
      const ctx = wx.createCanvasContext('Canvas', this);

      let bg_x = 0;
      let bg_y = 0;
      let bg_w = 320;
      let bg_h = 320;
      let bg_r = 10;
      // 绘制海报背景图片圆角
      // ctx.save()
      // ctx.setFillStyle('transparent')
      // ctx.beginPath()
      // ctx.arc(bg_x + bg_r, bg_y + bg_r, bg_r, Math.PI, Math.PI * 1.5)
      // ctx.arc(bg_x + bg_w - bg_r, bg_y + bg_r, bg_r, Math.PI * 1.5, Math.PI * 2)
      // ctx.arc(bg_x + bg_w - bg_r, bg_y + bg_h - bg_r, bg_r, 0, Math.PI * 0.5)
      // ctx.arc(bg_x + bg_r, bg_y + bg_h - bg_r, bg_r, Math.PI * 0.5, Math.PI)
      // ctx.clip()
      ctx.drawImage(res1[0].path, bg_x, bg_y, bg_w, bg_h)
      // ctx.restore()

      ctx.save()
      let avatar_x = 20;
      let avatar_y = 20;
      let avatar_w = 50;
      let avatar_h = 50;
      // 绘制头像
      ctx.beginPath();
      ctx.arc(avatar_w / 2 + avatar_x, avatar_h / 2 + avatar_y, avatar_w / 2, 0, Math.PI * 2, false);
      ctx.clip();
      ctx.drawImage(res1[1].path, avatar_x, avatar_y, avatar_w, avatar_h);
      ctx.restore()

      ctx.font = 'normal 20px bolder 微软雅黑 '
      ctx.setFillStyle('white')
      ctx.fillText(item.nickName, avatar_w + avatar_x + 30, avatar_y + 20);

      ctx.font = 'normal 14px Arial,sans-serif '
      ctx.setFillStyle('#ddd')
      ctx.fillText('2020.08.20 ~ 2020.08.27', avatar_w + avatar_x + 30, avatar_y + 42)

      // 完美日
      ctx.font = 'normal 14px 微软雅黑'
      ctx.setFillStyle('#ddd')
      ctx.fillText('打卡天数', avatar_x, avatar_y + 90)

      ctx.font = 'normal 26px bolder 微软雅黑'
      ctx.setFillStyle('white')
      ctx.fillText('2', avatar_x, avatar_y + 122)

      ctx.font = 'normal 14px 微软雅黑'
      ctx.setFillStyle('#ddd')
      ctx.fillText('天', avatar_x + 20, avatar_y + 122)

      // 打卡天数
      ctx.font = 'normal 14px 微软雅黑'
      ctx.setFillStyle('#ddd')
      ctx.fillText('打卡次数', avatar_x, avatar_y + 160)

      ctx.font = 'normal 26px bolder 微软雅黑'
      ctx.setFillStyle('white')
      ctx.fillText('4', avatar_x, avatar_y + 192)

      ctx.font = 'normal 14px 微软雅黑'
      ctx.setFillStyle('#ddd')
      ctx.fillText('次', avatar_x + 20, avatar_y + 192)

      ctx.font = 'normal 14px bolder 微软雅黑'
      ctx.setFillStyle('white')
      ctx.fillText('逆风的方向更适合飞翔', avatar_x, 282)

      ctx.font = 'normal 14px bolder 微软雅黑'
      ctx.setFillStyle('white')
      ctx.fillText('不怕万人阻挡只怕自己投降', avatar_x, 300)

      let qr_x = 275;
      let qr_y = 275;
      let qr_w = 50;
      let qr_h = 50;
      // 二维码位置
      ctx.beginPath();
      ctx.drawImage(res1[2].path, qr_x - qr_w / 2, qr_y - qr_h / 2, qr_w, qr_h)

      ctx.setFontSize(10)
      ctx.setFillStyle('white')
      ctx.fillText('一起定目标', qr_x - qr_w / 2, qr_y - 5 - qr_h / 2)

      ctx.stroke()
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
            // that.setData({
            //   canvasImg: res.tempFilePath,
            // })
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

  save(canvasImg) {
    let that = this
    //生产环境时 记得这里要加入获取相册授权的代码
    wx.saveImageToPhotosAlbum({

      filePath: canvasImg,
      success(res) {
        that.setData({
          canvasHide: false
        });
        // wx.showModal({
        //   content: '图片已保存到相册，赶紧晒一下吧~',
        //   showCancel: false,
        //   confirmText: '好',
        //   confirmColor: '#000000',
        //   success: function(res) {
        //     if (res.confirm) {
        //       that.setData({
        //         canvasHide: false
        //       })
        //     }
        //   }
        // })
      }
    })
  },


});