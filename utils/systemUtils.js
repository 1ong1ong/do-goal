export function getMobileModel() {
  let model = '';
  wx.getSystemInfo({
    success(res) {
      console.log(res);
      model = res.model;
    }
  })
  return model;
}