import userApi from '../../api/user'

Page({
    data: {
        userIsLogin: false,
        nickName: '',
        avatarUrl: ''
    },
    checkLogin() {
        userApi.checkLogin().then((res) => {
            if (res.data.code === 0) {
                this.setData({
                    userIsLogin: true,
                    nickName: '',
                    avatarUrl: ''
                })
                userApi.userInfo().then((res) => {
                    this.setData({
                        userIsLogin: true,
                        nickName: res.data.data.nickName,
                        avatarUrl: res.data.data.avatarUrl
                    })
                })
            }
        }).catch((error) => {
            wx.showToast({
                title: '请求服务器失败',
                icon: 'error'
            })
        })
    },
    userLogin() {
        wx.showLoading({
            title: '登陆中',
        })
        userApi.login().then(() => {
            wx.hideLoading({
                success: (res) => { },
            })
            console.log('登陆成功')
            wx.showToast({
                title: '登陆成功',
                icon: "success"
            })
            this.checkLogin()
        }).catch((error) => {
            wx.hideLoading({
                success: (res) => { },
            })
            console.warn('登陆失败', error)
            wx.showToast({
                title: '登陆失败',
                icon: 'error'
            })
        })
    },
    onLoad() {
        this.checkLogin()
    }
})
