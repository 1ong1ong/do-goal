// pages/theme-manage/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    themeList: [{
        id: "1",
        name: '春季主题',
        backgroundColor: '#00a85d',
        homeTopBackgroundImgSrc: '/assets/imgs/top-spring.png'
      },
      {
        id: "2",
        name: '冬季主题',
        backgroundColor: '#1989fa',
        homeTopBackgroundImgSrc: '/assets/imgs/top.png'
      }
    ],
    radio: '1',
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

  },

  onClick(event) {
    const theme = event.currentTarget.dataset.theme;
    console.log(theme);
    app.globalData.globalColor = theme.backgroundColor;
    app.globalData.homeTopBackgroundImgSrc = theme.homeTopBackgroundImgSrc;
      console.log(app.globalData.globalColor)
    this.setData({
      radio: theme.id,
    });
  },
})