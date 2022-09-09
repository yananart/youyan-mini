import cacheUtil from '../../utils/cache'

Page({
    data: {
        user: {
            nickName: '',
            avatarUrl: '',
            theme: ''
        }
    },
    onLoad(options) {
        this.setData({
            theme: wx.getSystemInfoSync().theme
        })
        wx.onThemeChange((result) => {
            this.setData({
                theme: result.theme
            })
        })
    },
    onReady() {

    },
    onShow() {
        let user = cacheUtil.getUserInfo()
        this.setData({
            user: user
        })
    },
    onHide() {
    },
    onUnload() {
        wx.offThemeChange((result) => { })
    },
    onPullDownRefresh() {

    },
    onReachBottom() {

    },
    onShareAppMessage() {

    },
    toUserUpdae() {
        wx.navigateTo({
            url: '/pages/user-update/user-update'
        })
    }
})