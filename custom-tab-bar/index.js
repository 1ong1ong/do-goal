let app = getApp();
Component({
  data: {
    active: 0,
    list: [{
      icon: 'app',
      iconActive: 'app_fill',
      text: '首页',
      url: '/pages/index/index'
    }, 
    // {
    //   icon: 'browsing-history-o',
    //   text: '发现',
    //   url: '/pages/discovery/index'
    // },
     {
      icon: 'mine_circle',
      iconActive: 'mine_circle_fill',
      text: '我的',
      url: '/pages/my/index'
    }],
    globalColor: app.globalData.globalColor,
  },

  methods: {
    onChange(event) {
      this.setData({
        active: event.detail
      });
      wx.switchTab({
        url: this.data.list[event.detail].url
      });
    },

    init() {
      const page = getCurrentPages().pop();
      this.setData({
        active: this.data.list.findIndex(item => item.url === `/${page.route}`),
        globalColor: app.globalData.globalColor
      });
    }
  }
});