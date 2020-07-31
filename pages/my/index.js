// pages/my/index.js
import {updateUserInfo} from '../../api/user';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorize: false,
    nickName: '',
    gender: '',
    avatarUrl: '',
    location: '',
    country: '',
    province: '',
    city: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this = this;
    let authorize = false;
    let userInfo = wx.getStorageSync("userInfo");
    if (userInfo !== null && userInfo !== '') {
      authorize = userInfo.authorize;
    }

    // 如果之前已经授权了，直接显示
    if (authorize && userInfo !== null) {
      this.setData({
        nickName: userInfo.nickName,
        avatarUrl: userInfo.avatarUrl,
        location: userInfo.country + " " + userInfo.province + " " + userInfo.city,
        country: userInfo.country,
        province: userInfo.province,
        city: userInfo.city,
        authorize: true
      })
    }
    // 如果没有授权，请求用户授权
    else {
      // 查看是否授权
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            _this.getUserInfo();
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 用户信息授权成功回调
   */
  bindGetUserInfo(e) {
    this.getUserInfo();
  },

  /**
   * wx获取用户信息
   */
  getUserInfo() {
    let _this = this;
    let userInfoTmp = wx.getStorageSync("userInfo");

    wx.getUserInfo({
      lang: 'zh_CN',
      success: function(res) {
        let userInfo = res.userInfo;
        // 授权成功，更新用户资料
        updateUserInfo(userInfoTmp.userId, userInfo);
        _this.setData({
          nickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl,
          location: userInfo.country + " " + userInfo.province + " " + userInfo.city,
          country: userInfo.country,
          province: userInfo.province,
          city: userInfo.city,
          authorize: true
        })

      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
