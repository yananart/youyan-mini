import requests from '../utils/requests'
import api from '../common/youyanApi'

/**
 * 用户登陆
 * 
 * @returns promise
 */
function login() {
    return new Promise((resolve, reject) =>
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
                        requests.post(api.user.login, {
                            code: wxLoginRes.code,
                            nickName: wxUserRes.userInfo.nickName,
                            avatarUrl: wxUserRes.userInfo.avatarUrl
                        }).then((loginRes) => {
                            if (loginRes.data.code === 0) {
                                // 登陆后端成功
                                console.log('login success, token:', loginRes.data.data)
                                // 存储token
                                wx.setStorageSync('token', loginRes.data.data)
                                // 成功
                                resolve()
                            } else {
                                console.warn('login failed', loginRes.data.msg)
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
    )
}


/**
 * 验证用户是否登陆
 * 
 * @returns promise
 */
function checkLogin() {
    return requests.get(api.user.checkLogin)
}


/**
 * 获取用户信息
 */
function userInfo() {
    return requests.get(api.user.userInfo)
}


/**
 * 导出模块
 */
export default {
    login: login,
    checkLogin: checkLogin,
    userInfo: userInfo
}