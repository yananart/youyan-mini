Page({
    data: {
        theme: '',
        select: 0,
        showEdit: false,
        selectType: {},
        input: '0',
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
    /**
     * 获取输入信息里面的最后一个数字
     */
    getInputLastNumber() {
        const input = this.data.input
        const length = input.length
        const lastAt = length - 1
        const indexPlus = input.indexOf('+')
        const indexMinus = input.indexOf('-')
        if (indexPlus >= 0 || indexMinus >= 0) {
            if (indexPlus === lastAt || indexMinus === lastAt) {
                return ''
            }
            if (indexPlus >= 0) return input.substring(indexPlus + 1, length)
            else return input.substring(indexMinus + 1, length)
        }
        return input
    },
    calculateInput() {
        const input = this.data.input
        const length = input.length
        const lastAt = length - 1
        const indexPlus = input.indexOf('+')
        const indexMinus = input.indexOf('-')
        if (indexPlus >= 0 || indexMinus >= 0) {
            if (indexPlus === lastAt || indexMinus === lastAt) {
                return parseFloat(input.substring(0, lastAt))
            }
            let index;
            if (indexPlus >= 0) index = indexPlus
            else index = indexMinus
            const first = parseFloat(input.substring(0, index))
            const sencond = parseFloat(input.substring(index + 1, length))
            if (indexPlus >= 0) return parseFloat((first + sencond).toFixed(2))
            else return Math.abs(parseFloat((first - sencond).toFixed(2)))
        }
        return parseFloat(input)
    },
    hitKeyboard(event) {
        const key = event.currentTarget.dataset.key;
        let input = this.data.input;
        if (key === this.data.keyboardKeys[14]) {
            input = input.substr(0, input.length - 1)
            if (input.length === 0) {
                input = '0'
            }
        } else if (key === '.') {
            let last = this.getInputLastNumber()
            if (last.indexOf('.') >= 0 || last.length === 0) return
            input = input + key
        } else if (key === '+' || key === '-') {
            let lastAt = input.length - 1
            const indexPlus = input.indexOf('+')
            const indexMinus = input.indexOf('-')
            if (indexPlus >= 0 || indexMinus >= 0) {
                if (indexPlus == lastAt || indexMinus == lastAt) return
                input = this.calculateInput() + key
            } else {
                input = input + key
            }
        } else {
            let last = this.getInputLastNumber()
            if (key === '0') {
                let last = this.getInputLastNumber()
                if (last === '0' || last === '0.0') return
            }
            if (last === '0') {
                input = input.substring(0, input.length - 1) + key
            } else if (last.length > 0) {
                const indexPoint = last.indexOf('.')
                if (indexPoint >= 0) {
                    if (last.length - indexPoint > 2) return
                } else {
                    if (parseFloat(last) >= 10000000) return
                }
                input = input + key
            } else {
                input = input + key
            }
        }

        this.setData({
            input: input
        })
    },
    choseDay(event) {
        let date = event.detail.value
        const now = new Date()
        const today = now.getFullYear() + '/' + (now.getMonth() + 1).toString().padStart(2, '0') + '/' + now.getDate().toString().padStart(2, '0')
        date = date.replace(/-/g, '/')
        if (today === date) {
            date = '今天'
        }
        this.setData({
            'keyboardKeys[3]': date
        })
    },
    finishEdit() {
        const amount = this.calculateInput()
        if (amount === 0) {
            wx.showToast({
                title: '没有输入金额',
                icon: 'error'
            })
        } else {
            wx.showToast({
                title: '账单' + amount + '元',
                icon: 'success'
            })
            this.setData({
                showEdit: false,
                input: '0'
            })
        }
    }
})