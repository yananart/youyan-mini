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

        wx.onNetworkStatusChange((res) => {
            let msg = ''
            if (!res.isConnected) {
                msg = '当前网络不可用，请检查你的网络设置'
            } else if (res.networkType === 'none') {
                msg = '网络开小差了，请网络良好后重试'
            }
            if (msg) {
                wx.showToast({
                    title: msg,
                    icon: 'none',
                })
                return false
            }
        })
    }
})