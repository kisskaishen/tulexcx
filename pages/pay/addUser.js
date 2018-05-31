// pages/pay/addUser.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        visit_name: '',
        visit_phone: '',
        vist_idcard_num: '',
        member_id: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.getStorage({
            key: 'userInfo',
            success: function (res) {
                this.setData({
                    member_id: res.data.member_id
                })
            },
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    telChange(e) {
        this.setData({
            visit_phone: e.detail.value
        })
    },
    nameChange(e) {
        this.setData({
            visit_name: e.detail.value
        })
    },
    idCardChange(e) {
        this.setData({
            vist_idcard_num: e.detail.value
        })
    },

    // 确定
    sureBtn() {
        app.api.post('member/Visiter/visiter_add', {
            member_id: this.data.member_id,
            visit_name: this.data.visit_name,
            visit_phone: this.data.visit_phone,
            vist_idcard_num: this.data.vist_idcard_num,
        }).then(res => {
            console.log(res)
            wx.showToast({
                title: '添加成功',
                icon: 'success',
                duration: 1200
            })
            setTimeout(() => {
                wx.navigateBack(1)
            }, 1400)
        })

    }
})