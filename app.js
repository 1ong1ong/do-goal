import http from './utils/httpUtils.js';
import {
  getUserInfo
} from './api/user.js'
import {
  getTheme
} from './utils/themeData.js'
//app.js
App({
  onLaunch: function() {
    let that = this;
    // 登录
    wx.showLoading({
      title: '加载中'
    })
    wx.login({
      success: res => {
        http.login(res.code).then((userInfo) => {
          console.log(userInfo);
          wx.hideLoading();
        });
      }
    });


    wx.getSystemInfo({
      success(res) {
        console.log(res);
        that.globalData.screenWidth = res.screenWidth;
        that.globalData.screenHeight = res.screenHeight;
        that.mobileModel= res.model;
      }
    })


  },
  globalData: {
    screenWidth: 0,
    screenHeight: 0,
    mobileModel: 'iPhone X',
    // 春天
    globalColor: '#00a85d',
    homeTopBackgroundImgSrc: '/assets/imgs/top-spring.png'
    // 冬天
    // globalColor: '#1989fa',
    // homeTopBackgroundImgSrc: '/assets/imgs/top.png'
  }
})