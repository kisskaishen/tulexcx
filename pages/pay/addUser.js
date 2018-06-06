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
        let self = this
        wx.getStorage({
            key: 'userInfo',
            success: function (res) {
                self.setData({
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
        let self = this;

        if (self.data.visit_name == '') {
            wx.showToast({
                title: '姓名不能为空',
                image: '/images/icon-error.png',
                duration: 1200
            })
        } else if (self.data.visit_phone == '') {
            wx.showToast({
                title: '手机号不能为空',
                image: '/images/icon-error.png',
                duration: 1200
            })
        } else if (self.data.vist_idcard_num == '') {
            wx.showToast({
                title: '身份证不能为空',
                image: '/images/icon-error.png',
                duration: 1200
            })
        } else {
            app.api.post('member/Visiter/visiter_add', {
                member_id: self.data.member_id,
                visit_name: self.data.visit_name,
                visit_phone: self.data.visit_phone,
                vist_idcard_num: self.data.vist_idcard_num,
            }).then(res => {
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


    }
})