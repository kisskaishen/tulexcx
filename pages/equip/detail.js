// pages/equip/detail.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        bannerImgs:[],
        introduce_images:[],
        // 规格
        spec1: [
            {
                id:'1',
                name: '男款芥黄'
            }, 
            {
                id: '2',
                name: '男款蔚蓝'
            }, 
            {
                id: '3',
                name: '男款橄榄绿'
            }
        ],
        spec2:[
            {
                id:'1',
                name:'M'
            },
            {
                id: '2',
                name: 'L'
            },
            {
                id: '3',
                name: 'XL'
            },
            {
                id: '4',
                name: 'XXL'
            }
        ],
        currentSpec:0,
        current2Spec:0,
        buyNumber:1,
        equip_id:'',        // 装备id
        equip_info:'',      // 装备信息
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
            equip_id: options.equip_id
        })
        this.getDetail(options.equip_id)
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
        setTimeout(()=>{
            wx.showToast({
                title: '此页面仅做查看装备详情，如需购买，可联系客服购买，也进店购买',
                icon: 'none',
                duration: 3000
            })
        },1000)
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
    // 规格选择
    specChoose(e) {
        this.setData({
            currentSpec: e.target.dataset.index
        })
    },
    spec2Choose(e) {
        this.setData({
            current2Spec: e.target.dataset.index
        })
    },
    // 减数量
    reduceNumber() {
        if (this.data.buyNumber == 1) {
            wx.showToast({
                title: '不能再少啦！',
                icon:'none'
            })
        } else {
            this.setData({
                buyNumber: this.data.buyNumber - 1 
            })
        }
    },
    // 增数量
    addNumber() {
        if (this.data.buyNumber == 3) {
            wx.showToast({
                title: '不能再多啦！',
                icon: 'none'
            })
        } else {
            this.setData({
                buyNumber: this.data.buyNumber + 1
            })
        }
    },
    // 回首页
    goIndex() {
        wx.reLaunch({
            url: '/pages/index/index',
        })
    },
    // 拨打客服
    calling() {
        wx.makePhoneCall({
            phoneNumber: '13798238693',
        })
    },
    // 立即购买提示
    buyTip() {
        wx.showToast({
            title: '暂不支持线上购买，可预约进店购买',
            icon:'none',
            duration:3000
        })
    },
    // 获取装备详情
    getDetail(equip_id) {
        app.api.post('equip/Special/equip_detail', { equip_id: this.data.equip_id}).then(res=>{
            this.setData({
                equip_info:res.data
            })
        })
    }
})