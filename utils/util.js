

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const isNot = (str)=>{
    if(str === ''){
      return false;
    }else if(str === null){
      return false;
    }else if(str === undefined){
      return false;
    }else{
      return true;
    }
}

const gradeGather = (num)=>{
    let arr = [
        '小学一年级',
        '小学二年级',
        '小学三年级',
        '小学四年级',
        '小学五年级',
        '小学六年级',
        '初中一年级',
        '初中二年级',
        '初中三年级',
        '高中一年级',
        '高中二年级',
        '高中三年级'
      ]
    return arr[num-1]
}


module.exports = {
  formatTime: formatTime,
  isNot:isNot,
  gradeGather:gradeGather
}
