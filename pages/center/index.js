// pages/center/index.js
//获取应用实例
const app = getApp()
Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        member_id: '',
        hasUserInfo: false,
        is_bind_info: '',
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        tuleUser: {},            // 注册会员绑定信息后得到的数据
        listData: [
            {
                img: '/images/index.png',
                name: '订单订单',
                path: '/pages/center/order?payType=tickets'
            },
            {
                img: '/images/group.png',
                name: '游客列表',
                path: '/pages/center/visitorList'
            }
        ]
    },

    // 下拉刷新
    onPullDownRefresh() {
        wx.showNavigationBarLoading()
        this.getInfo()
        setTimeout(() => {
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
        let that = this
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
        wx.getStorage({
            key: 'userInfo',
            success: function (res) {
                that.setData({
                    member_id: res.data.member_id
                })
                that.getInfo()
            },
        })
    },
    onShow:function() {
        this.getInfo()
    },
    getInfo() {
        app.api.post('member/member/member_index', {
            member_id: this.data.member_id
        }).then(res => {
            this.setData({
                is_bind_info: res.data.is_bind_info
            })
            if (this.data.is_bind_info=='1') {
                app.api.post('member/member/member_info',{
                    member_id:this.data.member_id
                }).then(res=>{
                    console.log(res)
                    this.setData({
                        tuleUser:res.data
                    })
                })
            }
        })
    },
    onGotUserInfo: function (e) {
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
        wx.setStorage({
            key: 'userInfo',
            data: this.data.userInfo,
        })
    }
})
