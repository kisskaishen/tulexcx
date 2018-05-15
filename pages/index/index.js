//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        imgUrls: [
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ],
        menuData: [
            {
                name: '景点专区',
                img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
                path:'/pages/index/goodsList'
            },
            {
                name: '特卖专区',
                img: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
                path: '/pages/index/activity'                
            },
            {
                name: '装备专区',
                img: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
                path: '/pages/index/equip'                
            }
        ],
        homeData:[],
        list:[]             // 推荐景点列表
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getIndex()
        this.getList()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    // 下拉刷新
    onPullDownRefresh() {
        wx.showNavigationBarLoading()
        console.log('开始刷新')
        setTimeout(()=>{
            console.log('1s后刷新结束')
            wx.stopPullDownRefresh()
            wx.hideNavigationBarLoading()
        },1000)
    },

    // 查找方法
    search() {

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
    getList() {
        app.api.post('Home/Home/home_list')
            .then(res => {
                this.setData({
                    list: res.data
                })
            })
    },
})
