// app.js
App({
    onLaunch() {
        // 展示本地存储能力
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        function doLogin() {
            wx.login({
                success: res => {
                    // 发送 res.code 到后台换取 openId, sessionKey, unionId
                    console.log(res.code)
                    wx.request({
                        method: 'POST',
                        url: 'https://api.yananart.cn/user/wechat/miniprogram/login',
                        data: {
                            code: res.code
                        },
                        success: loginRes => {
                            console.log('token: ' + loginRes.data.data)
                            wx.setStorageSync('token', loginRes.data.data)
                            wx.getUserInfo({
                                withCredentials: true,
                                lang: 'zh_CN',
                                success: userInfoRes => {
                                    wx.request({
                                        method: 'POST',
                                        url: 'https://api.yananart.cn/user/wechat/miniprogram/update',
                                        header: {
                                            Authorization: 'Bearer ' + wx.getStorageSync('token')
                                        },
                                        data: {
                                            rawData: userInfoRes.rawData,
                                            signature: userInfoRes.signature,
                                            encryptedData: userInfoRes.encryptedData,
                                            iv: userInfoRes.iv
                                        },
                                        success: updateRes => {
                                            console.log(updateRes)
                                        }
                                    })
                                }
                            })
                        },
                        fail: loginRes => {
                            console.warn('登陆服务器失败')
                            console.warn(loginRes)
                        }
                    })
                }
            })
        }

        // 检测登陆信息
        wx.checkSession({
            success: () => {
                wx.request({
                    url: 'https://api.yananart.cn/user/isLogin',
                    header: {
                        Authorization: 'Bearer ' + wx.getStorageSync('token')
                    },
                    success: isLoginRes => {
                        console.log(isLoginRes)
                        if (isLoginRes.statusCode == 401) {
                            console.info('用户状态 401，重新登陆')
                            doLogin()
                        } else {
                            console.info('token有效，用户登陆成功')
                        }
                    },
                    fail: () => {
                        console.info('token失效，重新登陆')
                        doLogin()
                    }
                })
            },
            fail: () => {
                console.info('会话失效，重新登陆')
                // 登录
                doLogin()
            }
        })
    },
    globalData: {
        userInfo: null,
        token: ''
    }
})