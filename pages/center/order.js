// pages/center/order.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navs: [
            {
                id: '1',
                name: '全部订单'
            },
            {
                id: '2',
                name: '已支付订单'
            },
            {
                id: '3',
                name: '已评价订单'
            }
        ],
        navIndexId: '1',//当前
        // 参数
        payType: '',
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
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this
        that.setData({
            payType: options.payType
        })
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

    // 点击nav选择
    navClick(e) {
        this.setData({
            navIndexId: e.target.dataset.id
        })
    }
})