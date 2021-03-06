import http from './utils/httpUtils.js';
import {
  getVersionAuditStatus
} from './api/version.js'


//app.js
App({
  onLaunch: function () {
    let that = this;
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
        }
      })
    }

    // 获取当前版本审核状态
    getVersionAuditStatus(that.globalData.currentVersion).then(status => {
      console.log(status);
      that.globalData.auditStatus = status;
    })

    // 登录
    wx.login({
      success: res => {
        http.login(res.code).then((userInfo) => {
          console.log(userInfo);
        });
      }
    });


    wx.getSystemInfo({
      success(res) {
        console.log(res);
        that.globalData.screenWidth = res.screenWidth;
        that.globalData.screenHeight = res.screenHeight;
        that.mobileModel = res.model;
      }
    })
  },

  // 引入`towxml3.0`解析方法
  towxml: require('/towxml/index'),


  globalData: {
    screenWidth: 0,
    screenHeight: 0,
    currentVersion: '1.2.1',
    auditStatus: false,

    mobileModel: 'iPhone X',
    globalColor: '#27A4FB',

    topBgColorChange: true,
    homeBgColor: null,
    homeTopBackgroundImgSrc: '',
  }
})