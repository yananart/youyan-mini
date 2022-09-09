/**
 * token存储key
 */
const KEY_TOKEN = 'token'

/**
 * 用户昵称存储key
 */
const KEY_NICK_NAME = 'user.nickName'

/**
 * 用户头像存储key
 */
const KEY_AVATAR_URL = 'user.avatarUrl'


/**
 * 获取token
 * 
 * @returns {String} token
 */
function getToken() {
    let app = getApp()
    let token = app.globalData.token
    if (!token) {
        console.log('自storage获取token')
        token = wx.getStorageSync(KEY_TOKEN)
        app.globalData.token = token
    }
    return token
}


/**
 * 设置token
 * 
 * @param {String} token token
 */
function setToken(token) {
    let app = getApp()
    app.globalData.token = token
    wx.setStorageSync(KEY_TOKEN, token)
}


/**
 * 获取用户信息
 *
 * @returns {JSON} 用户细腻下
 */
function getUserInfo() {
    let app = getApp()
    let nickName = app.globalData.userInfo.nickName
    if (!nickName) {
        nickName = wx.getStorageSync(KEY_NICK_NAME)
        app.globalData.userInfo.nickName = nickName
    }
    let avatarUrl = app.globalData.userInfo.avatarUrl
    if (!avatarUrl) {
        avatarUrl = wx.getStorageSync(KEY_AVATAR_URL)
        app.globalData.userInfo.avatarUrl = avatarUrl
    }
    return {
        nickName: nickName,
        avatarUrl: avatarUrl
    }
}


/**
 * 更新用户信息
 * 
 * @param {JSON} userInfo 用户信息
 */
function setUserInfo(userInfo) {
    let app = getApp()
    let nickName = userInfo.nickName
    let avatarUrl = userInfo.avatarUrl
    app.globalData.userInfo = userInfo
    wx.setStorageSync(KEY_NICK_NAME, nickName)
    wx.setStorageSync(KEY_AVATAR_URL, avatarUrl)
}


export default {
    getToken: getToken,
    setToken: setToken,
    getUserInfo: getUserInfo,
    setUserInfo: setUserInfo
}