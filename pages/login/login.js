const {isNot} = require('../../utils/util.js')
const {xFetch} = require('../../utils/common.js')

Page({
  data: {  //页面的初始数据
    title: '青少年第一人',
    userInfo:{
      name:null,
      password:null
    },
    showTopTips:false,
    msg:''
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: "登录"
    })
  },
  bindKeyName:function(e){
      this.data.userInfo.name = e.detail.value;
  },
  bindKeyPpassword:function(e){
      this.data.userInfo.password = e.detail.value;
  },
  closeTips:function(){
      setTimeout(()=>{
          this.setData({
              showTopTips: false
          });
      }, 3000);
  },
  userVerify: function(){
      const {name,password} = this.data.userInfo

      if(!isNot(name)){
           this.setData({
              showTopTips: true,
              msg:"用户名不能为空"
          });
          this.closeTips();
          return false;
      }

      if(!isNot(password)){
          this.setData({
              showTopTips: true,
              msg:"密码不能为空"
          });
          this.closeTips();
          return false;
      }

      xFetch({name,password,requestUrl:'loginInterface/login.json'},(data)=>{
         let obj = [];
         let operate = data.replace('{','').replace('}','').split(',');
         operate.forEach((el)=>
            obj.push(el.split(':')[1].replace('"','').replace('"',''))
         )
         let userData = {
            name:obj[0],
            grade:obj[1],
            token:obj[2]
         }
         wx.setStorage({
            key:"userData",
            data:userData
         })
         wx.switchTab({
            url: '../index/index'
         })
      })
  }
})
