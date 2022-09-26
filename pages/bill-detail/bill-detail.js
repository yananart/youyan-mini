Page({

    /**
     * 页面的初始数据
     */
    data: {
        theme: '',
        dialog: false,
        detail: {
            category: {
                id: 0,
                icon: '',
                name: ''
            },
            desc: '',
            tag: '',
            type: 0,
            amount: 0.0,
            date: ''
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            theme: wx.getSystemInfoSync().theme
        })
        wx.onThemeChange((result) => {
            this.setData({
                theme: result.theme
            })
        })
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.on('billDetail', (data) => {
            this.setData({
                detail: data
            })
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
        wx.offThemeChange((result) => { })
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
    clickDialog(event) {
        this.setData({
            dialog: false
        })
        if (event.detail.index == 1) {
            console.log('点击确认');
            wx.showToast({
                title: '还没做呢',
                icon: 'error'
            })
        }
    },
    onDialogClose() {
        console.log('关闭');
    },
    doUpdate() {
        wx.showToast({
            title: '还没做呢',
            icon: 'error'
        })
        const detail = this.data.detail
        wx.navigateTo({
            url: '/pages/bill-edit/bill-edit',
            success: function (res) {
                res.eventChannel.emit('billEdit', detail)
            }
        })
    },
    doDelete() {
        this.setData({
            dialog: true
        })
    }
})