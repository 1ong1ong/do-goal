// components/my/day-circle/index.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    drawId: { // 画板元素名称id
      type: String,
      value: 'draw'
    },
    percent: { // 百分比
      type: Number,
      value: 0
    },
    size: { // 大小 width/height
      type: Number,
      value: 60
    },
    text: { // 显示文本
      type: String,
      value: '一'
    },
    circleWidth: { //圆形的宽度
      type: Number,
      value: 2.5
    },
    circleColor: {
      type: String,
      value: '#1989fa'
    },
    showPoint: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },


  observers: {
    'percent': function(val) {
      this.draw(val);
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * el:画圆的元素
     * r:圆的半径
     * w:圆的宽度
     * 功能:画背景
     */
    drawCircleBg(el, r, w) {
      const ctx = wx.createCanvasContext(el, this);
      ctx.setLineWidth(w); // 设置圆环的宽度
      ctx.setStrokeStyle('#E5E5E5'); // 设置圆环的颜色
      ctx.setLineCap('round') // 设置圆环端点的形状
      ctx.beginPath(); //开始一个新的路径
      ctx.arc(r, r, r - w, 0, 2 * Math.PI, false);
      //设置一个原点(110,110)，半径为100的圆的路径到当前路径
      ctx.stroke(); //对当前路径进行描边
      ctx.draw();

    },
    /**
     * el:画圆的元素
     * r:圆的半径
     * w:圆的宽度
     * step:圆的弧度 (0-2)
     * 功能:彩色圆环
     */
    drawCircle(el, r, w, step) {
      if (step === 0) {
        return;
      }
      var context = wx.createCanvasContext(el, this);

      context.setLineWidth(w);
      context.setStrokeStyle(this.data.circleColor);
      context.setLineCap('round')
      context.beginPath(); //开始一个新的路径
      // step 从0到2为一周
      context.arc(r, r, r - w, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
      context.stroke(); //对当前路径进行描边
      context.draw()
    },

    draw(percent) {
      
      const el = this.data.drawId;
      const r = this.data.size / 4;
      const w = this.data.circleWidth;
      const step = percent / 100 * 2;

      //组件入口,调用下面即可绘制 背景圆环和彩色圆环。
      this.drawCircleBg(el + 'bg', r, w); //绘制 背景圆环
      this.drawCircle(el, r, w, step); //绘制 彩色圆环
    }
  },

  /**
   * 生命周期
   */
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached() {
      this.draw(this.data.percent);
    }
  }
})