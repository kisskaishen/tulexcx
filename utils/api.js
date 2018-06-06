// var Promise = require('../plugins/promise.js');
var baseUrl = 'https://api.jztule.com/public/index.php/';

function post(url, data) {
    return new Promise((resolve,reject)=>{
        wx.request({
            url: baseUrl + url,
            data:data,
            method:'post',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success:function(res) {
                wx.showLoading({
                    title: '加载中',
                })
                if (res.data.code == '200') {
                    wx.hideLoading()
                    resolve(res.data)
                } else {
                    wx.hideLoading()
                    reject({ error: '调用了接口，但不是200', code: '!'+200 });
                    return;
                }
            },
            fail:function(err) {
                console.log('调用接口出错')                
                reject({ error: '网络错误', code: 0 })
            }
        })
    })
}

// 接口调用
module.exports = {
    post
}