/**
 * Created by flyjennyetn on 2016-10-24.
 */
const {IPLOCATION} = require('./config.js')

function xFetch(options,callback) {
    wx.request({
        url: IPLOCATION + options.requestUrl,
        data: options,
        success: function(responseData) {
            if(responseData.statusCode === 200){
               if(responseData.data.result === false){
                    wx.showModal({
                        content: responseData.data.msg.toString(),
                        showCancel: false,
                        success: function (res) {
                            if (res.confirm) {
                                console.log('用户点击确定')
                            }
                        }
                    });
                }else{
                    callback(responseData.data.t);
                }
            }
        },
        fail: function(err) {
            console.log(err)
        }
    })
}

module.exports = {
    xFetch:xFetch
}