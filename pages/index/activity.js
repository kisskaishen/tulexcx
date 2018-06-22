// pages/index/activity.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {         
        imgUrls: [],
        list:[],           
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getBanner()
        this.getList(1)
    },
    // 下拉刷新
    onPullDownRefresh() {
        wx.showNavigationBarLoading()
        this.getBanner()
        this.setData({
            page: 1
        })
        this.getList(this.data.page)
        setTimeout(() => {
            wx.stopPullDownRefresh()
            wx.hideNavigationBarLoading()
        }, 1000)
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        
    },

    

    getBanner() {
        app.api.post('home/Banner/banner_list', {
            type: '3'
        }).then(res => {
            this.setData({
                imgUrls: res.data
            })
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        this.setData({
            page: 1
        })
        this.getList(this.data.page)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    // 获取特卖列表
    getList(page) {
        app.api.post('ticket/Expert/Expert_index',{
            is_driving:'2',
            page:page
        }).then(res=>{
            this.setData({
                list:res.data
            })
        })
    }
})