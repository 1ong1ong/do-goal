// pages/report-share/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: app.globalData.screenWidth,
    height: app.globalData.screenHeight
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.draw();
  },

  draw() {

    const width = this.data.width;
    const ctx = wx.createCanvasContext('myCanvas') //创建Canvas
    ctx.setFillStyle('green') //选择填充颜色
    ctx.fillRect(0, 10, width, width*2) //形状描述
 

    ctx.setFillStyle('red') //选择填充颜色
    ctx.fillRect(10, 20, width-20, 20) //形状描述
    ctx.draw() //绘制图像
    const bot = wx.createCanvasContext('myCanvas')

    bot.moveTo(0, 0)
    bot.lineTo(width , 0)
    bot.lineTo(width , 35)
    bot.lineTo(10, 35)
    bot.arc(0 + 10, 35 - 10, 10, Math.PI * 0.5, Math.PI)//勾画圆角矩形的线段
    bot.setFillStyle('#FF9955')
    bot.fill()
    bot.setFillStyle('#414141')
    bot.setFontSize(20)
    bot.fillText('重填问卷', 50, 25)
    bot.draw()
  }
})