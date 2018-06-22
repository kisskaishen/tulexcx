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
        page:1
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
                self.getOrder(self.data.navIndexId, self.data.page)
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
        this.setData({
            page: 1
        })
        this.getOrder(this.data.navIndexId, 1)
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        this.setData({
            page:this.data.page+1
        })
        this.getOrder(this.data.navIndexId, this.data.page)
    },

    // 点击nav选择
    navClick(e) {
        this.setData({
            navIndexId: e.target.dataset.id
        })
        this.getOrder(this.data.navIndexId,1)
    },

    // 订单列表
    getOrder(type,page) {
        app.api.post('order/Order/order_list',{
            member_id:this.data.member_id,
            order_state:type || '',
            page:page
        }).then(res=>{
            this.setData({
                orderList:res.data
            })
        })
    }
})