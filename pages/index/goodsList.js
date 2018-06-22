// pages/index/goodsList.js
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        listData:[],
        page:1,
    },
    // 下拉刷新
    onPullDownRefresh() {
        wx.showNavigationBarLoading()
        setTimeout(() => {
            wx.stopPullDownRefresh()
            wx.hideNavigationBarLoading()
        }, 1000)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getList(this.data.page)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.setData({
            page:1
        })
        this.getList(this.data.page)
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        this.setData({
            page: this.data.page
        })
        this.getList(this.data.page)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    // 获取列表
    getList(page) {
        app.api.post('ticket/Expert/Expert_index',{
            is_driving:'1',
            page:page
        })
            .then(res=>{
                this.setData({
                    listData:res.data
                })
            })
    }
})