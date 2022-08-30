Page({
    data: {
        nickName: '',
        avatarUrl: ''
    },
    onLoad() {
        let app = getApp()
        this.setData({
            nickName: app.globalData.userInfo.nickName,
            avatarUrl: app.globalData.userInfo.avatarUrl
        })
    }
})
