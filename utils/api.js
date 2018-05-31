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
                if (res.data.code == '200') {
                    resolve(res.data)
                } else {
                    console.log('调用了接口，但不是200')
                    reject({ error: '服务器忙，请稍后重试', code: 500 });
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