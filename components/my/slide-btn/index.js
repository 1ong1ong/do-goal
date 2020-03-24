// components/my/slide-btn/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    moveBtnColor: {
      type: String,
      value: '#ffbb00'
    },
    sliderColor: {
      type: String,
      value: '#e5e5e5'
    },
    opacity: {
      type: Number,
      value: 0.5
    },
    screenWidth: {
      type: Number,
      value: 0
    },
    sliderWidth: {
      type: Number,
      value: 160
    },
    sliderHeight: {
      type: Number,
      value: 400
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    moveStartY: 0,
    moveBtnBottom: 10,
    moveEnable: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 开始移动
    touchBtnStart(e) {
      if (!this.data.moveEnable) {
        return;
      }
      this.setData({
        moveStartY: e.changedTouches["0"].clientY
      })
    },
    // 移动中
    touchBtnMove(e) {
      if (!this.data.moveEnable) {
        return;
      }
      let bottom = ((this.data.moveStartY - e.touches[0].clientY) / (this.data.screenWidth / 750));
      let maxBottom = this.data.sliderHeight - this.data.sliderWidth + 10;
      if (bottom < 10) {
        this.setData({
          moveBtnBottom: 10
        })
      } else if (bottom <= maxBottom) {
        this.setData({
          moveBtnBottom: bottom
        })
      } else {
        this.setData({
          moveBtnBottom: maxBottom
        })
      }
    },
    // 移动结束
    touchBtnEnd(e) {
      if (!this.data.moveEnable) {
        return;
      }
      let bottom = ((this.data.moveStartY - e.changedTouches[0].clientY) / (this.data.screenWidth / 750));
      let maxBottom = this.data.sliderHeight - this.data.sliderWidth + 10;
      if (bottom < maxBottom/2) {
        this.setData({
          moveBtnBottom: 10
        })
      } else {
        this.setData({
          moveBtnBottom: maxBottom,
          moveEnable: false
        });
        this.triggerEvent("confirm")
      }
    }
  }
});
