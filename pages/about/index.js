// pages/about/index.js

let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentVersion: app.globalData.currentVersion,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  routeTofeaturePage() {
    wx.navigateTo({
      url: '/pages/feature-intro/index',
    })
  },

  about() {
    wx.navigateTo({
      url: '/pages/web/index?articleId=1&title=关于作者',
    })
  },

  checkUpdate() {
    // 检查更新
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        console.log('onCheckForUpdate====', res)
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          console.log('res.hasUpdate====')
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                console.log('success====', res)
                // res: {errMsg: "showModal: ok", cancel: false, confirm: true}
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
            })
          })
        } else {
          wx.showToast({
            title: '当前已是最新版本',
            icon: 'success',
            duration: 2000
          })
          // wx.showModal({
          //   title: '更新提示',
          //   content: '当前已是最新版本'
          // })
        }
      })
    }
  }
 
})