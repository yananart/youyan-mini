/**
 * 获取用户信息
 *
 * @returns {JSON} 用户细腻下
 */
function getUserInfo() {
    let app = getApp()
    let nickName = app.globalData.userInfo.nickName
    if (!nickName) {
        nickName = wx.getStorageSync('user.nickName')
        app.globalData.userInfo.nickName = nickName
    }
    let avatarUrl = app.globalData.avatarUrl
    if (!avatarUrl) {
        avatarUrl = wx.getStorageSync('user.avatarUrl')
        app.globalData.avatarUrl = avatarUrl
    }
    return {
        nickName: nickName,
        avatarUrl: avatarUrl
    }
}


export default {
    getUserInfo: getUserInfo
}