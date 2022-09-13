import cacheUtil from '../../utils/cache'

Page({
    data: {
        nickName: '',
        avatarUrl: '',
        year: '2022',
        month: '09',
        theme: '',
        bill: {
            icon: '😂',
            desc: '这里是账单说明',
            tag: '标签',
            amount: -14.50
        }
    },
    onLoad() {
        this.setData({
            theme: wx.getSystemInfoSync().theme
        })
        wx.onThemeChange((result) => {
            this.setData({
                theme: result.theme
            })
        })
    },
    onUnload() {
        wx.offThemeChange((result) => { })
    },
    onShow() {
        let userInfo = cacheUtil.getUserInfo()
        this.setData({
            nickName: userInfo.nickName,
            avatarUrl: userInfo.avatarUrl
        })
    },
    selectMonth(event) {
        let month = event.detail.value
        let year = month.substr(0, 4)
        month = month.substr(5, 2)
        this.setData({
            year: year,
            month: month
        })
    }
})
