import {
  updateUserInfo,
  getCurrentUserInfo
} from '../api/user';
/**
 * wx获取用户信息
 */
export function getUserInfo() {
  let userInfoTmp = wx.getStorageSync("userInfo");
  console.log("getUserInfo",userInfoTmp);
  return new Promise((resolved, rejected) => {
    wx.getUserInfo({
      lang: 'zh_CN',
      success: function (res) {
        console.log("getUserInfo success", res);
        let userInfo = res.userInfo;
        // 授权成功，更新用户资料
        updateUserInfo(userInfoTmp.id, userInfo).then(()=> {
          getCurrentUserInfo().then((userInfo) => {
            wx.setStorage({
              key: "userInfo",
              data: userInfo
            });
          })
        });
        // refreshToken();
        resolved(userInfo);
      },
      fail: function (res) {
        console.log(res);
        rejected();
      }
    })
  })

}