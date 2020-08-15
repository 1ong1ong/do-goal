// pages/discovry/index.js
Page({


  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
  },

  onShow() {
    this.getTabBar().init();
  }
})