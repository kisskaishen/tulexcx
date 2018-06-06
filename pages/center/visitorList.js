// pages/center/visitorList.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        member_id: '',
        visitorList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let self = this;
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
        let self = this;
        self.getVisitor()
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

    // 获取用户列表
    getVisitor() {
        let self = this
        app.api.post('member/Visiter/visiter_list', {
            member_id: self.data.member_id
        }).then(res => {
            self.setData({
                visitorList: res.data
            })
        })
    },

    // 删除用户
    visitorDelete(e) {
        let self = this;
        console.log(e.target.dataset.item)
        wx.showModal({
            title: '提醒',
            content: '确定要删除此联系人' + e.target.dataset.item.visit_name + '么？',
            success: function (res) {
                if (res.confirm) {
                    console.log('调用删除接口')
                    let list = self.data.visitorList
                    list.splice(e.target.dataset.index, 1)
                    self.setData({
                        visitorList: list
                    })
                }
            }
        })
    }


})