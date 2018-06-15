// pages/center/orderDetail.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderDetail:{}
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
        let self = this
        self.getOrderDetail(options.order_id)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    // 获取订单详情
    getOrderDetail(order_id) {
        app.api.post('order/Order/order_detail',{
            order_id:order_id
        }).then(res=>{
            this.setData({
                orderDetail:res.data
            })
        })
    }
})