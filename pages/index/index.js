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
        userApi.login().then(() => {
            console.log('登陆成功')
            this.checkLogin()
        }).catch((error) => {
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
