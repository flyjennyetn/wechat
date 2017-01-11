
const {IMGADDRESS} = require('../../../utils/config.js')
const {xFetch} = require('../../../utils/common.js')

Page({
  data: {  //页面的初始数据
    stuCode:null,
    lessonId:null,
    lessonScore:null,
    examPaperName:null,
    examList:null,
    examSelect:null,
    exam:null,
  },
  selected :function(e){
      if(lessonScore == 'no'){
            state.exam[action.examId] = action.value;
      }
  },
  quizzesGetScoreLog: function (isPassExam,results) {
    var exam = [];
    if (isPassExam == '1') {
      results.map((el, i) => {
        exam[el.subId] = el.subAns;
      });
    } else {
      results.examList.map((el, i) => {
        exam[el.examId] = '';
      });
      results.examSelect.map((el, i) => {
        exam[el.examId] = '';
      });
    }
    return exam;
  },
  subAnswer: function(){
      const {lessonId,stuCode,lessonScore,exam} = this.data;
      if(lessonScore == 'no'){
          let results = '{"results":[';
          let key=1;
          var examState = true;
          exam.map((el,i)=>{
              if(el == ''){
                  wx.showToast({title: '第 '+key+' 题没有作答!'});
                  examState = false;
                  return false;
              }
              results+= '{"subId":"' + i + '","subAns":"' + el + '"},';
              key++;
          })
          results += ']}';
          if(!examState)
              return false;

          xFetch({results,lessonId,stuCode,requestUrl:'interface/getScore.json'},(lessonScore)=>{
              this.setData({lessonScore:lessonScore});
          })
 
      }
  },
  onLoad: function (option) { // 生命周期函数--监听页面加载
    try {
      const {token} = wx.getStorageSync('userData')
      const {lessonId, lessonScore, isPassExam} = option;
      let exam = [];
      this.setData({stuCode:token,lessonId:lessonId});

      xFetch({lessonId,requestUrl:'interface/getListExam.json'},(data)=>{
          if (isPassExam == 1) {
            xFetch({stuCode:token,lessonId,requestUrl:'interface/getScoreLog.json'},(result)=>{
              let str = result.results;
              str = str.substring(0,str.length-3) + str.substring(str.length-2,str.length);
                result = JSON.parse(str).results;
                exam = this.quizzesGetScoreLog(isPassExam,result);
                this.setData({exam:exam});
            })
          } else {
            exam = this.quizzesGetScoreLog(isPassExam,data);
            this.setData({exam:exam});
          }

          let examSelect = [];
          let examListLength = data.examList.length;
          data.examSelect.forEach((el,i)=>{
              if(el.selectType == 2){
                el.options = [
                    ['A',IMGADDRESS+el.optionA],
                    ['B',IMGADDRESS+el.optionB]
                ];   
              }else{
                el.options = [
                    ['A',el.optionA],
                    ['B',el.optionB],
                    ['C',el.optionC],
                    ['D',el.optionD],
                    ['E',el.optionE],
                    ['F',el.optionF]
                ];
              }
              el.index = examListLength + (i+1)
              examSelect.push(el);
          })
          this.setData({
              lessonScore: isPassExam != 0 ? lessonScore : 'no',
              examPaperName: data.examPaperName,
              examList: data.examList,
              examSelect: examSelect
          })
      })
    } catch (e) {
      console.log(e)
    }

  }
})
