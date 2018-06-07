// pages/center/user.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        member_id:'',
        member_mobile:'',
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
    mobileInput(e) {
        this.setData({
            member_mobile:e.detail.value
        })
    },

    // 提交
    submit() {
        app.api.post('member/Member/bind_mobile', {
            member_id: this.data.member_id,
            member_mobile: this.data.member_mobile,
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