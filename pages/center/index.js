// pages/center/index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),        
        tuleUser:{},            // 注册会员绑定信息后得到的数据
        listData:[
            {
                img:'/images/center.png',
                name:'景点订单',
                path:'/pages/center/order?payType=tickets'
            },
            // {
            //     img: '/images/index.png',
            //     name: '装备订单',
            //     path: '/pages/center/order?payType=equip'
            // }
        ]
    },

    // 下拉刷新
    onPullDownRefresh() {
        wx.showNavigationBarLoading()
        console.log('开始刷新')
        setTimeout(() => {
            console.log('1s后刷新结束')
            wx.stopPullDownRefresh()
            wx.hideNavigationBarLoading()
        }, 1000)
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    
    onLoad: function () {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
    },
    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    }
})
