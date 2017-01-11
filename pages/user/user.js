const {IMGADDRESS} = require('../../utils/config.js')
const {xFetch} = require('../../utils/common.js')
const {gradeGather} = require('../../utils/util.js')
Page({
  data: {
    userInfo: null,
    urls:[]
  },
  onLoad: function () {
      try {
          const {token,name,grade} = wx.getStorageSync('userData')
          xFetch({token,requestUrl:'pci/getStuInfo'},(data)=>{
              data.patch = IMGADDRESS + data.patch;
              data.gendercode = data.gendercode == 'M' ? '男' : '女';
              data.name = name;
              data.grade = gradeGather(grade);
              wx.setStorage({
                  key:"userInfo",
                  data:data
              })
              this.data.urls.push(data.patch)
              this.setData({userInfo:data})
          })
        } catch (e) {
          console.log(e)
        }
   },
   previewImage: function(e){
        wx.previewImage({
            current: this.data.userInfo.patch, // 当前显示图片的http链接
            urls: this.data.urls // 需要预览的图片http链接列表
        })
   }
})
