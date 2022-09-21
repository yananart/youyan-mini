Page({
    data: {
        theme: '',
        select: 0,
        showEdit: false,
        selectType: {},
        input: '',
        category: [
            [
                {
                    icon: '🍱',
                    name: '餐饮'
                }, {
                    icon: '🥤',
                    name: '饮料'
                }, {
                    icon: '🛒',
                    name: '购物'
                }, {
                    icon: '🚌',
                    name: '交通'
                }, {
                    icon: '🤑',
                    name: '储蓄'
                }, {
                    icon: '🍎',
                    name: '水果'
                }, {
                    icon: '✈️',
                    name: '旅行'
                }, {
                    icon: '🎮',
                    name: '游戏'
                }
            ], [
                {
                    icon: '💵',
                    name: '工资'
                }, {
                    icon: '💰',
                    name: '奖金'
                }, {
                    icon: '🧧',
                    name: '红包'
                }
            ]
        ],
        keyboardKeys: [
            '7', '8', '9', '今天',
            '4', '5', '6', '+',
            '1', '2', '3', '-',
            '.', '0', '←', '完成'
        ]
    },
    onLoad(options) {
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
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
    selectOutlay() {
        this.setData({ select: 0 })
    },
    selectIncome() {
        this.setData({ select: 1 })
    },
    selectIcon(event) {
        const selectType = event.currentTarget.dataset.type;
        this.setData({
            selectType: selectType,
            showEdit: true
        })
    },
    hitKeyboard(event) {
        const key = event.currentTarget.dataset.key;
        let input = this.data.input;
        if (key === this.data.keyboardKeys[14]) {
            input = input.substr(0, input.length - 1)
        } else {
            input = input + key;
        }
        this.setData({
            input: input
        })
    },
    choseDay() {
        console.log('选择日期');
    },
    finishEdit() {
        wx.showToast({
            title: '还没做提交',
            icon: 'error'
        })
    }
})