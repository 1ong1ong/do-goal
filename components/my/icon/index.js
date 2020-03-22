// components/my/icon/index.js
Component({
  options: {
    addGlobalClass: true
  },

  externalClasses: ['custom-class'],

  properties: {
    name: String,
    size: String,
    color: String
  },

  methods: {
    onClick() {
      this.triggerEvent('click');
    }
  }
});