// pages/pay/index.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        payType: 'equip',//来源equip为装备支付，ticket为景点门票
        allUserInfo: [
            {
                username: '秦文凯',
                usertel: '13798238693',
                userIdentity: '41823199510240078'
            },
            {
                username: '秦文凯2',
                usertel: '13798238693',
                userIdentity: '41823199510240078'
            },
            {
                username: '秦文凯3',
                usertel: '13798238693',
                useridentity: '41823199510240078'
            }
        ],
        id: '',
        info: {},
        // activeNum:'',       // 选中游客信息
        userInfoList: [],        // 选中游客信息列表
        code: ''
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
        this.setData({
            id: options.ticket_id
        })
        this.getDetail()
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
    // 先获取详情
    getDetail() {
        app.api.post('ticket/expert/ticket_detail', {
            ticket_id: this.data.id
        }).then(res => {
            this.setData({
                info: res.data
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
        let that = this;
        console.log(e)
        console.log(that.data.userInfoList)
        console.log(e.target.dataset.userinfo)
        that.setData({
            userInfoList: that.data.userInfoList.push(e.target.dataset.userinfo)
        })
        console.log(that.data.userInfoList)
        // if (e.target.dataset.index != this.data.activeNum) {
        //     console.log('==,')
        //     this.setData({
        //         activeNum: e.target.dataset.index
        //     })
        // } else {
        //     console.log('!=')
        //     this.setData({
        //         activeNum: '-1'
        //     })
        // }
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
                    order_amount: '1',
                    pay_sn: '570580347858754001',
                    code: that.data.code
                }).then(res => {
                    console.log(res)
                    wx.requestPayment({
                        'timeStamp': res.data.timestamp.toString(),
                        'nonceStr': res.data.noncestr,
                        'package': res.data.package,
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