// pages/theme-manage/index.js
let app = getApp();
import { getCurrentUserInfo, updateUserTheme } from '../../api/user.js'
import { getTheme } from '../../utils/themeData.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    themeList: [{
        id: 1,
        name: '春季主题',
        backgroundColor: '#00a85d',
        homeTopBackgroundImgSrc: '/assets/imgs/top-spring.png'
      },
      {
        id: 4,
        name: '冬季主题',
        backgroundColor: '#1989fa',
        homeTopBackgroundImgSrc: '/assets/imgs/top.png'
      }
    ],
    radio: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getUserTheme()
  },

  getUserTheme() {
    // 获取用户的主题设置
    wx.showLoading({
      title: '加载中',
    })
    getCurrentUserInfo().then((user) => {
      wx.hideLoading();
      let theme = getTheme(user.theme);
      app.globalData.globalColor = theme.backgroundColor;
      app.globalData.homeTopBackgroundImgSrc = theme.homeTopBackgroundImgSrc;
      this.setData({
        radio: user.theme
      })
    });
  },

  onClick(event) {
    const theme = event.currentTarget.dataset.theme;
    wx.showLoading({
      title: '加载中',
    })
    updateUserTheme(theme.id).then((res)=> {
      wx.hideLoading();
      app.globalData.globalColor = theme.backgroundColor;
      app.globalData.homeTopBackgroundImgSrc = theme.homeTopBackgroundImgSrc;
      this.setData({
        radio: theme.id,
      });
    })
    
  },
})