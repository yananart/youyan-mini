import requests from '../utils/requests'
import api from '../common/youyanApi'


/**
 * 微信用户登陆
 *
 * @type {function(): Promise<>} 是否注册
 */
const login = () => new Promise((resolve, reject) => {
    // 调用微信登陆api获取code
    wx.login({
        success: wxLoginRes => {
            console.log('微信登陆，获取jsCode', wxLoginRes.code)
            requests.post(api.user.login, {
                code: wxLoginRes.code
            }).then((loginRes) => {
                if (loginRes.data.code === 0) {
                    let data = loginRes.data.data
                    if (data.register && data.register === true) {
                        // 登陆后端成功
                        console.log('login success, token:', data.token)
                        // 存储token
                        wx.setStorageSync('token', data.token)
                        // 存储用户信息
                        const app = getApp()
                        app.globalData.userInfo = data.user
                        resolve(true)
                    } else {
                        console.log("用户未注册")
                        resolve(false)
                    }
                } else {
                    console.warn('服务器登陆失败', loginRes.data)
                    reject('服务器登陆失败，' + loginRes.data.code)
                }
            }).catch((error) => {
                console.warn('服务器登陆失败', error)
                reject('服务器登陆失败')
            })
        },
        fail: error => {
            console.warn('wx.login 失败', error)
            reject('微信登陆失败')
        }
    })
})


/**
 * 用户注册 需要用户点击时调用
 *
 * @type {function(): Promise<boolean>} 注册成功
 */
const register = () => new Promise((resolve, reject) => {
    // 获取用户信息
    wx.getUserProfile({
        desc: '用户登陆',
        success: wxUserRes => {
            console.log('wx.getUserProfile 获取到用户信息，请求远程接口')
            // 调用微信api登陆
            wx.login({
                success: wxLoginRes => {
                    // 发送 res.code 到后台换取 openId, sessionKey, unionId
                    console.log('微信登陆，获取jsCode', wxLoginRes.code)
                    requests.post(api.user.register, {
                        code: wxLoginRes.code,
                        nickName: wxUserRes.userInfo.nickName,
                        avatarUrl: wxUserRes.userInfo.avatarUrl
                    }).then((registerRes) => {
                        if (registerRes.data.code === 0) {
                            let data = registerRes.data.data
                            // 登陆后端成功
                            console.log('login success, token:', data.token)
                            // 存储token
                            wx.setStorageSync('token', data.token)
                            // 存储用户信息
                            const app = getApp()
                            app.globalData.userInfo = data.user
                            resolve()
                        } else {
                            console.warn('login failed', registerRes.data.msg)
                            reject('用户登陆失败')
                        }
                    }).catch((error) => {
                        console.warn('服务器登陆失败', error)
                        reject('服务器登陆失败')
                    })
                },
                fail: error => {
                    console.warn('wx.login 失败', error)
                    reject('微信登陆失败')
                }
            })
        }, fail: error => {
            console.warn('wx.getUserProfile 失败', error)
            reject('用户未登陆')
        }
    })
})


/**
 * 验证用户是否登陆
 *
 * @returns {Promise<RequestSuccessCallbackResult<JSON>>} 响应结果
 */
function checkLogin() {
    return requests.get(api.user.checkLogin)
}


/**
 * 获取用户信息
 *
 * @returns {Promise<RequestSuccessCallbackResult<JSON>>} 响应结果
 */
function userInfo() {
    return requests.get(api.user.userInfo)
}


/**
 * 导出模块
 */
export default {
    login: login,
    register: register,
    checkLogin: checkLogin,
    userInfo: userInfo
}