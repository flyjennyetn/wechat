const {gradeGather} = require('../../../utils/util.js')
Page({
  data: {
    userInfo: null
  },
  onLoad: function () {
    try {
      this.setData({userInfo:wx.getStorageSync('userInfo')})
    } catch (e) {
      console.log(e)
    }
  },
  chooseImage: function (e) {
    wx.chooseImage({
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success:  (res)=> {
            this.setData({
                files: res.tempFilePaths[0]
            });
        }
    })
  }
})