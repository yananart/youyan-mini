import cacheUtil from '../../utils/cache'
import userApi from '../../api/user'

Page({
    data: {
        form: {
            nickName: ''
        },
        theme: '',
        errorMsg: '',
        rules: [{
            name: 'nickName',
            rules: [{ required: true, message: '昵称不能为空' }, { maxlength: 20, message: '昵称长度不能超过20' }]
        }]
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        this.setData({
            theme: wx.getSystemInfoSync().theme
        })
        wx.onThemeChange((result) => {
            this.setData({
                theme: result.theme
            })
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        let user = cacheUtil.getUserInfo()
        this.setData({
            'form.nickName': user.nickName
        })
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
        wx.offThemeChange((result) => { })
    },
    handleInput(event) {
        const { field } = event.currentTarget.dataset
        this.setData({
            [`form.${field}`]: event.detail.value
        })
    },
    /**
     * 更新用户信息
     */
    updateUser() {
        const { nickName } = this.data.form
        this.selectComponent('#form').validate(async (valid, errors) => {
            if (valid) {
                wx.showLoading({
                    title: '更新中'
                })
                try {
                    let userInfoRes = await userApi.update(nickName)
                    let userInfo = userInfoRes.data.data
                    cacheUtil.setUserInfo(userInfo)
                    wx.hideLoading()
                    wx.showToast({
                        title: '更新成功',
                        icon: 'success'
                    })
                } catch (error) {
                    wx.hideLoading()
                    console.error('更新用户信息异常', error);
                    wx.showToast({
                        title: '服务器异常',
                        icon: 'error'
                    })
                }
            } else {
                const firstError = Object.keys(errors)
                if (firstError.length) {
                    this.setData({
                        errorMsg: errors[firstError[0]].message
                    })
                }
            }
        })
    }
})