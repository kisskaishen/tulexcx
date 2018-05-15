// pages/search/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchVal:''
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
    search() {
        wx.redirectTo({
            url: '/pages/index/goodsList',
        })
    }

})