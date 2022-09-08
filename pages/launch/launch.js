import userApi from '../../api/user'

Page({
    onShow: async function () {
        wx.showLoading({
            title: '用户登陆中...'
        })
        try {
            let userInfoRes = await userApi.userInfo()
            if (userInfoRes.statusCode === 401) {
                console.log('用户登陆token失效 401，重新发起登陆')
                let login = await userApi.login()
                if (login === false) {
                    console.log('用户未注册，跳转登陆页面')
                    wx.hideLoading({})
                    wx.showToast({
                        title: '用户未注册',
                        icon: 'loading'
                    })
                    wx.redirectTo({
                        url: '/pages/login/login'
                    })
                } else {
                    wx.hideLoading({})
                    wx.switchTab({
                        url: '/pages/index/index'
                    })
                }
            } else {
                let userInfo = userInfoRes.data.data
                getApp().globalData.userInfo = userInfo
                wx.setStorageSync('user.nickName', userInfo.nickName)
                wx.setStorageSync('user.avatarUrl', userInfo.avatarUrl)
                wx.hideLoading({})
                wx.switchTab({
                    url: '/pages/index/index'
                })
            }
        } catch (error) {
            wx.hideLoading({})
            wx.showToast({
                title: '服务器异常',
                icon: 'error'
            })
            console.error('用户登陆失败', error)
        }
    }
})