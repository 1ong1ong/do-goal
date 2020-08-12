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
      value: 180
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

  },

  /**
   * 组件的方法列表
   */
  methods: {

    // 移动结束
    tapBtn(e) {
      this.triggerEvent("confirm")
    }
  }
});