/**
 * 程序启动
 */
App({
    globalData: {
        userInfo: {
            nickName: '',
            avatarUrl: ''
        },
        token: ''
    },
    onLaunch: async () => {
        // 展示本地存储能力
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
    }
})