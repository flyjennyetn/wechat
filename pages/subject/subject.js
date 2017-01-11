const {IMGADDRESS} = require('../../utils/config.js')
const {xFetch} = require('../../utils/common.js')

Page({
  data: {
    subjectList: null
  },
  onLoad: function () {
      xFetch({startNum: '0',endNum: '12',requestUrl:'interface/getThematicPageList.json'},(items)=>{
          items.forEach((el, k) => {
            el.photoUrl1 = IMGADDRESS + el.photoUrl1;
            items[k].thematicFname = el.thematicFname.split('|');
          })
          this.setData({subjectList:items})
          console.log(this.data.subjectList)
      })
      
  }
})
