// pages/index/goodsList.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bannerImgs:[
            {
                id:'1',
                img:'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
                path:'/pages/equip/detail'
            },
            {
                id: '2',
                img: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
                path: '/pages/equip/detail'
            }
        ],
        menuList:[
            {
                id:'1',
                name:'户外服',
                path:'/pages/equip/detail',
                img:'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
            },
            {
                id: '2',
                name: '户外裤',
                path: '/pages/equip/detail',
                img: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
            },
            {
                id: '3',
                name: '户外鞋',
                path: '/pages/equip/detail',
                img: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
            },
            {
                id: '4',
                name: '露营装备',
                path: '/pages/equip/detail',
                img: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
            },
            {
                id: '5',
                name: '登山装备',
                path: '/pages/equip/detail',
                img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
            },
            {
                id: '6',
                name: '配饰装备',
                path: '/pages/equip/detail',
                img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
            },
            {
                id: '7',
                name: '户外食品',
                path: '/pages/equip/detail',
                img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
            }
        ],
        listData:[
            {
                name:'富贵象40L登山包',
                img:'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
                goods_price:'￥200.00',
                taobao_price:'￥289.00',
                status:'1'
            },
            {
                name: '户外特工 情侣高帮登山鞋H1',
                img: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
                goods_price: '￥339.00',
                taobao_price: '￥669.00',
                status: '0'
            },
            {
                name: '绿色丛林',
                img: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
                goods_price: '￥15.9',
                taobao_price: '￥22.00',
                status: '1'
            },
        ],
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