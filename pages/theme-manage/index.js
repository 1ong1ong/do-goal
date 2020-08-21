// pages/theme-manage/index.js
let app = getApp();
import {
  getCurrentUserInfo,
  updateUserTheme
} from '../../api/user.js'
import {
  getThemes,
  getByThemeId
} from '../../api/theme.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    themeList: [],
    radio: null,
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
    this.getThemes();
    this.getUserTheme()
  },

  getThemes() {
    getThemes().then(data => {
      this.setData({
        themeList: data
      })
    })
  },



  getUserTheme() {
    // 获取用户的主题设置
    wx.showLoading({
      title: '加载中',
    })
    getCurrentUserInfo().then((user) => {
      wx.hideLoading();
      getByThemeId(user.theme).then(data => {
        app.globalData.homeBgColor = data.backgroundColor;
        app.globalData.homeTopBackgroundImgSrc = data.homeTopBackgroundImgSrc;
      })
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
    updateUserTheme(theme.id).then((res) => {
      wx.hideLoading();
      this.setData({
        radio: theme.id,
      });
    })

  },
})