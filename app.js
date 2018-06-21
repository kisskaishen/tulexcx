// 引入封装的api
var api = require('/utils/api.js');
//app.js
App({
    onLaunch: function () {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
        
        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                this.globalData.code = res.code
            }
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            api.post('member/Wxapplet/get_applet_member',{
                                code: this.globalData.code,
                                encrypteddata: res.encryptedData,
                                iv: res.iv                    
                            })
                            .then(res=>{
                                wx.setStorage({
                                    key: 'userInfo',
                                    data: res.data,
                                })

                            })

                            // 
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                } else {
                    wx.authorize({
                        scope: 'scope.record',
                        success:function(res) {
                            console.log(res)
                        }
                    })
                }
            }
        })
    },
    globalData: {
        code:'',
        userInfo: null,
    },
    api
})