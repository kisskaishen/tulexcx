// pages/center/order.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navs: [
            {
                id: '',
                name: '全部订单'
            },
            {
                id: '20',
                name: '已支付订单'
            },
            {
                id: '10',
                name: '待支付订单'
            }
        ],
        navIndexId: '',//当前
        // 参数
        payType: '',
        member_id:'',
        orderList:[],
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
        self.setData({
            payType: options.payType
        })
        wx.getStorage({
            key: 'userInfo',
            success: function (res) {
                self.setData({
                    member_id: res.data.member_id
                })
                self.getOrder(self.data.navIndexId)
            },
        })
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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

    // 点击nav选择
    navClick(e) {
        this.setData({
            navIndexId: e.target.dataset.id
        })
        this.getOrder(this.data.navIndexId)
    },

    // 订单列表
    getOrder(type) {
        app.api.post('order/Order/order_list',{
            member_id:this.data.member_id,
            order_state:type || ''
        }).then(res=>{
            this.setData({
                orderList:res.data
            })
        })
    }
})