// pages/pay/index.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        visitorList: [],
        ticket_id: '',      // 门票id
        member_id: '',
        info: {},
        userInfoList: [],        // 选中游客信息列表
        userInfoListLength: 0,
        code: '',
        visit_id_arr: [],        // 选中游客id
        orderInfo: {},           // 下单成功后的订单信息
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
                    ticket_id: options.ticket_id,
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
            ticket_id: self.data.ticket_id
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
        let tags = this.data.visitorList
        tags[index].state = !tags[index].state
        this.setData({
            visitorList: tags
        })



        // 取数量
        let userInfoListTags = new Set()            // es6 去重
        let visit_id_arr = []
        for (var i = 0; i < this.data.visitorList.length; i++) {
            if (this.data.visitorList[i].state == true) {
                userInfoListTags.add(this.data.visitorList[i])
                visit_id_arr.push(this.data.visitorList[i].visit_id)
            }
        }

        this.setData({
            userInfoList: userInfoListTags,
            userInfoListLength: userInfoListTags.size,
            visit_id_arr: visit_id_arr
        })
    },
    // 立即支付
    toPay() {
        let that = this;
        if (that.data.userInfoListLength == '0' || that.data.visit_id_arr == '') {
            wx.showToast({
                title: '请先选择游客',
                image: '/images/icon-tips.png',
                duration: 1600
            })
        } else {
            app.api.post('order/buy/submit_order', {
                cart_id: that.data.ticket_id + '|' + that.data.userInfoListLength,
                member_id: that.data.member_id,
                union_type: '1',
                visit_id_arr: JSON.stringify(that.data.visit_id_arr)
            }).then(res => {
                wx.showToast({
                    title: '订单提交成功',
                    duration: 1000
                })
                that.setData({
                    orderInfo: res.data
                })
                that.pay()
            })
        }
    },
    // 支付方法
    pay() {
        let that = this;
        wx.login({
            success: function (res) {
                that.setData({
                    code: res.code
                })
                app.api.post('order/buy/WeixinRequest', {
                    order_amount: that.data.orderInfo.pay_info.order_pay_amount,
                    pay_sn: that.data.orderInfo.pay_sn,
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
                            wx.showToast({
                                title: '支付成功',
                                duration: 1000
                            })
                            wx.redirectTo({
                                url: '/pages/center/orderDetail?order_id=' + that.data.orderInfo.pay_info.order_id,
                            })
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