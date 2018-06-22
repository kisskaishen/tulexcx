//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        imgUrls: [],
        menuData: [
            {
                name: '票务专区',
                img: '/images/icon-ticket.png',
                path:'/pages/index/goodsList'
            },
            {
                name: '活动专区',
                img: '/images/icon-activity.png',
                path: '/pages/index/activity'
            },
            // {
            //     name: '特卖专区',
            //     img: '/images/icon-sale.png',
            //     path: '/pages/index/activity'                
            // },
            {
                name: '装备专区',
                img: '/images/icon-equip.png',
                path: '/pages/index/equip'                
            }
        ],
        homeData:[],
        list:[],             // 推荐景点列表
        page:1,
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getBanner()
        this.getIndex()
        this.getList(this.data.page)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    // 下拉刷新
    onPullDownRefresh() {
        wx.showNavigationBarLoading()
        this.getBanner()
        this.getIndex()
        this.getList()
        setTimeout(()=>{
            wx.stopPullDownRefresh()
            wx.hideNavigationBarLoading()
        },1000)
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function (options) {
        this.setData({
            page:this.data.page+1
        })
        this.getList(this.data.page)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    // 查找方法
    search() {

    },
    getBanner() {
        app.api.post('home/Banner/banner_list',{
            type:'1'
        }).then(res=>{
            this.setData({
                imgUrls:res.data
            })
        })
    },
    // 获取首页信息
    getIndex() {
        app.api.post('Home/Home/home_index')
            .then(res=>{
                this.setData({
                    homeData:res.data.list
                })
            })
    },
    // 推荐景点
    getList(page) {
        app.api.post('Home/Home/home_list',{
            page:page
        })
            .then(res => {
                this.setData({
                    list: res.data
                })
            })
    },
})
