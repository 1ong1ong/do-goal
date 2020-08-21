function getTheme(themeId) {
  if (themeId === 1) {
    return {
      id: "1",
      name: '春季主题',
      backgroundColor: '#00a85d',
      homeTopBackgroundImgSrc: '/assets/imgs/top-spring.png'
    }
  } else if (themeId === 4) {
    return {
      id: "4",
      name: '冬季主题',
      backgroundColor: '#27A4FB',
      homeTopBackgroundImgSrc: '/assets/imgs/top.png'
    }
  }
}

module.exports = {
  getTheme: getTheme
}