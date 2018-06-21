// pages/index/goodsList.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrls: [],
        menuList:[],
        listData: [],
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
        this.getBanner()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.getEquipList()
    },

    getBanner() {
        app.api.post('home/Banner/banner_list', {
            type: '2'
        }).then(res => {
            this.setData({
                imgUrls: res.data
            })
        })
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
    },
    // 获取列表
    getEquipList(class_id) {
        app.api.post('equip/special/special_index',{class_id:class_id|| ''}).then(res=>{
            this.setData({
                menuList:res.data.class,
                listData:res.data.list
            })
        })
    },
    // 点击装备分类
    classChoose(e) {
        this.getEquipList(e.currentTarget.dataset.class_id)
    }
})