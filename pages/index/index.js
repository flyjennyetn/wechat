
const {IMGADDRESS} = require('../../utils/config.js')
const {formatTime} = require('../../utils/util.js')
const {xFetch} = require('../../utils/common.js')

Page({
  data: {  //页面的初始数据
    tabs: ["下学期", "上学期"],
    activeIndex: "0",
    sliderOffset: 0,
    sliderLeft: 0,
    coursesUp:null,
    coursesDown:null,
    userData:null
  },
  tabClick: function (e) {
      this.setData({
          sliderOffset: e.currentTarget.offsetLeft,
          activeIndex: e.currentTarget.id
      });
  },
  format: function (data) {
      let list = [];
      data.forEach((el,i)=>{
        el.videoImgUrl = IMGADDRESS + el.videoImgUrl;
        if(el.stuTime !==""){
          el.studyState = "[已学习]";
          el.stuTime = formatTime(new Date(el.stuTime));
        }else{
          el.studyState = "[未学习]";
        }
        list.push(el);
      })
      return list;
  },
  onLoad: function () { // 生命周期函数--监听页面加载

    try {
      const userData = wx.getStorageSync('userData')
      if (userData) {
        this.setData({userData:userData})
        const {token} = userData;
        xFetch({token,stuTerm:1,requestUrl:'interface/getLessonInfoByStuNoForCenter.json'},(data)=>{
            const coursesUp = this.format(data.lessonInfoList);
            this.setData({coursesUp:coursesUp})
        })
        xFetch({token,stuTerm:2,requestUrl:'interface/getLessonInfoByStuNoForCenter.json'},(data)=>{
            const coursesDown = this.format(data.lessonInfoList);
            this.setData({coursesDown:coursesDown})
        })
      }else{
        wx.redirectTo({
          url: '../login/login'
        })
      }
    } catch (e) {
      console.log(e)
    }

    wx.getSystemInfo({
        success: (res)=>{
            this.setData({
                sliderLeft: (res.windowWidth / this.data.tabs.length - 144) / 2
            })
        } 
    });
  },
  onReady: function(options) {
    // 生命周期函数--监听页面初次渲染完成
      wx.setNavigationBarTitle({
        title: "课程"
      })
  },
  onHide: function(options) {
    // 生命周期函数--监听页面隐藏
  },
  onHide: function(options) {
    // 生命周期函数--监听页面卸载
  },
  onPullDownRefresh: function(options) {
    // 生命周期函数--监听页面卸载
  },
  onReachBottom: function(options) {
    // 生命周期函数--监听页面卸载
  },
  onShareAppMessage: function(options) {
    // 在 Page 中定义 onShareAppMessage 函数，设置该页面的分享信息。
  },   
  learningLesson : function(e){
      const {lessonId} = e.target.dataset;
      const {token,grade} = this.data.userData;
      xFetch({token,lessonId,requestUrl:'interface/queryIfExam.json'},(study)=>{
          if (study.isPassStudy == 1) {
              wx.navigateTo({
                url: 'quizzes/quizzes?lessonId='+lessonId+'&lessonScore='+study.lessonScore+'&isPassExam='+study.isPassExam
              })
          } else {
            wx.showToast({
              title: '请先学习视频课程'
            })
          }
      })
  }

})
