// pages/index/goodsList.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        listData:[
            {
                name:'焦作云台山',
                img:'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
                startTime:'2018-03-31',
                storage:'20',
                status:'1'
            },
            {
                name: '山东泰山',
                img: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
                startTime: '2018-04-10',
                storage: '8',
                status: '0'
            },
            {
                name: '西安华山',
                img: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
                startTime: '2018-05-01',
                storage: '4',
                status: '1'
            },
            {
                name: '湖南衡山',
                img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
                startTime: '2018-04-31',
                storage: '20',
                status: '1'
            },
            {
                name: '山西恒山',
                img: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
                startTime: '2018-04-10',
                storage: '8',
                status: '1'
            },
            {
                name: '少林嵩山',
                img: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
                startTime: '2018-05-01',
                storage: '4',
                status: '0'
            }
        ],
        timeArray:[
            {
                id: '0',
                time: '任意天数'
            },
            {
                id:'1',
                time:'一日游'
            },
            {
                id: '2',
                time: '多日游'
            }
        ],
        timeIndex:'0',
        areaArray: [
            {
                id: '0',
                area: '全部地区'
            },
            {
                id: '1',
                area: '省内'
            },
            {
                id: '2',
                area: '省外'
            }
        ],
        areaIndex:'0'
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
    // 时间选择
    timeChange(e) {
        this.setData({
            timeIndex: e.detail.value
        })
    },
    // 地区选择
    areaChange(e) {
        this.setData({
            areaIndex: e.detail.value
        })
    }
})