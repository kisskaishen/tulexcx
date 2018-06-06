// pages/pay/index.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        visitorList: [],
        id: '',
        member_id:'',
        info: {},
        userInfoList: [],        // 选中游客信息列表
        code: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let self = this;
        wx.getStorage({
            key: 'userInfo',
            success: function (res) {
                self.setData({
                    id: options.ticket_id,                    
                    member_id: res.data.member_id
                })              
                self.getDetail()
                self.getVisitor()        
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
        wx.showNavigationBarLoading()
        console.log('开始刷新')
        setTimeout(() => {
            console.log('1s后刷新结束')
            wx.stopPullDownRefresh()
            wx.hideNavigationBarLoading()
        }, 1000)
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    // 先获取详情
    getDetail() {
        let self = this
        app.api.post('ticket/expert/ticket_detail', {
            ticket_id: self.data.id
        }).then(res => {
            self.setData({
                info: res.data
            })
        })
    },

    // 获取游客列表
    getVisitor() {
        let self = this
        app.api.post('member/Visiter/visiter_list', {
            member_id: self.data.member_id
        }).then(res => {
            self.setData({
                visitorList: res.data
            })
        })
    },
    // 注意事项弹框
    showAttention() {
        wx.showModal({
            title: '注意事项',
            content: this.data.info.attention,
            showCancel: false
        })
    },
    // 选择添加联系人信息
    chooseUser(e) {
        let index = e.currentTarget.dataset.key
        let tags = this.data.allUserInfo
        tags[index].state = !tags[index].state
        this.setData({
            allUserInfo: tags
        })
        for (var i = 0; i < this.data.allUserInfo.length; i++) {
            if (this.data.allUserInfo[i].state == true) {
                console.log(this.data.allUserInfo.length)
            }
        }
    },
    // 立即支付
    toPay() {
        let that = this;
        wx.login({
            success: function (res) {
                that.setData({
                    code: res.code
                })
                app.api.post('order/buy/WeixinRequest', {
                    order_amount: '0.01',
                    pay_sn: '570580347858754001',
                    code: that.data.code
                }).then(res => {
                    wx.showToast({
                        title: '支付中',
                        icon: 'loading',
                        duration: 1000
                    })
                    wx.requestPayment({
                        'timeStamp': res.data.timestamp.toString(),
                        'nonceStr': res.data.noncestr,
                        'package': 'prepay_id=' + res.data.prepayid,
                        'signType': 'MD5',
                        'paySign': res.data.paysign,
                        'success': function (res) {
                            console.log(res)
                        },
                        'fail': function (res) {
                            console.log(res)
                        }
                    })

                })
            }
        })

    }

})