// pages/index/activity.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {         
        imgUrls: [],
        list_info:'',           // 特卖专区列表
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getBanner()
        this.getList()
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
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    // 获取特卖列表
    getList() {
        app.api.post('equip/special/special_selling').then(res=>{
            this.setData({
                list_info:res.data
            })
        })
    }
})