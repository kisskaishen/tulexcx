// pages/center/user.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 本人信息
        member_id:'',
        member_mobile:'',
        member_truename:'',
        id_card_num:'',
        // 紧急联系人信息
        name:'',
        phone:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let self =this;
        wx.getStorage({
            key: 'userInfo',
            success: function(res) {
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
    memberMobile(e) {
        this.setData({
            member_mobile:e.detail.value
        })
    },
    memberTruename(e) {
        this.setData({
            member_truename: e.detail.value
        })
    },
    idCardNum(e) {
        this.setData({
            id_card_num: e.detail.value
        })
    },
    nameInput(e) {
        this.setData({
            name: e.detail.value
        })
    },
    phoneInput(e) {
        this.setData({
            phone: e.detail.value
        })
    },
    // 提交
    submit() {
        let that = this
        app.api.post('member/Member/bind_member_info', {
            member_id: that.data.member_id,
            member_mobile: that.data.member_mobile,
            id_card_num: that.data.id_card_num,
            member_truename: that.data.member_truename,
            name: that.data.name,
            phone: that.data.phone
        }).then(res=>{
            wx.showToast({
                title: '绑定成功',
                icon: 'success',
                duration: 1200
            })
            setTimeout(()=>{
                wx.navigateBack(1)
            },1400)
            
        })
       
    }
})