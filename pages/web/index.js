// pages/web/index.js
const app = getApp();
import { getArticleById } from '../../api/article.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleId: 0,
    title: '',
    article: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      articleId: options.articleId,
      title: options.title
    })
  },

  onShow() {
    wx.setNavigationBarTitle({
      title: this.data.title
    })
    this.getArticle();
  },

  getArticle() {
    wx.showLoading({
      title: '加载中',
    })
    getArticleById(this.data.articleId).then(res=> {
      wx.hideLoading();
      let content = app.towxml(res.mdContent, 'markdown', {
        theme:'light',
        events: {
          tap: e => {
            console.log('tap', e);
          },
          change: e => {
            console.log('todo', e);
          }
        }
      });
      this.setData({
        article: content,
      });
    })
  }
})