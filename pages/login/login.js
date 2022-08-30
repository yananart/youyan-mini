import userApi from '../../api/user'

Page({
    data: {},
    onLoad: function (options) {

    },
    register: async () => {
        wx.showLoading({
            title: '登陆中',
        })
        try {
            await userApi.register()
            wx.hideLoading({})
            wx.showToast({
                title: '登陆成功',
                icon: "success"
            })
            setTimeout(() => {
                wx.reLaunch({
                    url: '/pages/index/index'
                })
            }, 500);
        } catch (error) {
            wx.hideLoading({})
            wx.showToast({
                title: '服务异常',
                icon: "error"
            })
        }
    }
});