import cacheUtil from '../../utils/cache'

Page({
    data: {
        nickName: '',
        avatarUrl: ''
    },
    onShow() {
        let userInfo = cacheUtil.getUserInfo()
        this.setData({
            nickName: userInfo.nickName,
            avatarUrl: userInfo.avatarUrl
        })
    }
})
