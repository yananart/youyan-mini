import { getToday } from '../../utils/data'

Page({
    data: {
        /** 主题色 */
        theme: 'light',
        /** 用户选择 */
        select: {
            /** 选择类型 0-支出 1-收入 */
            type: 0,
            /** 选择的账单类别id */
            categoryId: 0
        },
        /** 输入的金额 */
        input: '0',
        /** 输入的描述 */
        desc: '',
        /** 日期 */
        date: '',
        /** 账单类别list */
        categoryList: [
            [
                {
                    id: 1,
                    icon: '🍱',
                    name: '餐饮'
                }, {
                    id: 2,
                    icon: '🥤',
                    name: '饮料'
                }, {
                    id: 3,
                    icon: '🛒',
                    name: '购物'
                }, {
                    id: 4,
                    icon: '🚌',
                    name: '交通'
                }, {
                    id: 5,
                    icon: '🤑',
                    name: '储蓄'
                }, {
                    id: 6,
                    icon: '🍎',
                    name: '水果'
                }, {
                    id: 7,
                    icon: '✈️',
                    name: '旅行'
                }, {
                    id: 8,
                    icon: '🎮',
                    name: '游戏'
                }
            ], [
                {
                    id: 101,
                    icon: '💵',
                    name: '工资'
                }, {
                    id: 102,
                    icon: '💰',
                    name: '奖金'
                }, {
                    id: 103,
                    icon: '🧧',
                    name: '红包'
                }
            ]
        ],
        /** 键盘的按键 */
        keyboardKeys: [
            '7', '8', '9', '今天',
            '4', '5', '6', '+',
            '1', '2', '3', '-',
            '.', '0', '←', '完成'
        ],
        /** 显示编辑框 */
        showEdit: false,
        /** 是否展示键盘 */
        showKeyboard: true,
        /** 系统键盘弹出时输入框与底部的距离 */
        bottom: 0
    },
    onLoad(options) {
        this.setData({
            theme: wx.getSystemInfoSync().theme,
            date: getToday()
        })
        wx.onThemeChange((result) => {
            this.setData({ theme: result.theme })
        })
        // 管道
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.on('billEdit', (data) => {
            // 由详情页面拉起的编辑 接收详情数据
            const type = data.type
            const amount = data.amount.toString()
            const tag = data.tag
            let desc = data.desc
            const categoryId = data.category.id
            if (tag !== '') {
                desc = '#' + tag + ' ' + desc
            }
            this.setData({
                showEdit: true,
                'select.type': type,
                'select.categoryId': categoryId,
                input: amount,
                desc: desc
            })
            const date = data.date
            this.setDate(date)
        })
    },
    /** 选择支出类别 */
    selectOutlay() {
        this.setData({ 'select.type': 0 })
    },
    /** 选择收入类别 */
    selectIncome() {
        this.setData({ 'select.type': 1 })
    },
    /** 选择账单类别 */
    selectCategory(event) {
        const selectCategory = event.currentTarget.dataset.type;
        this.setData({
            selectCategory: selectCategory.id,
            showEdit: true
        })
    },
    /** 获取输入信息里面的最后一个数字 */
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
    /** 
     * 计算输入
     * @returns {number} 金额 
     */
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
    /** 点击键盘 */
    hitKeyboard(event) {
        const key = event.currentTarget.dataset.key;
        let input = this.data.input;
        if (key === this.data.keyboardKeys[14]) {
            // 删除
            input = input.substr(0, input.length - 1)
            if (input.length === 0) {
                input = '0'
            }
        } else if (key === '.') {
            // 小数点
            let last = this.getInputLastNumber()
            if (last.indexOf('.') >= 0 || last.length === 0) return
            input = input + key
        } else if (key === '+' || key === '-') {
            // 加减符号
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
            // 数字
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
        if (input.indexOf('+') >= 0 || input.indexOf('-') >= 0) {
            this.setData({
                'keyboardKeys[15]': '=',
                input: input
            })
        } else {
            this.setData({
                'keyboardKeys[15]': '完成',
                input: input
            })
        }
    },
    /** 选择日期 */
    choseDay(event) {
        let date = event.detail.value
        this.setDate(date)
    },
    /** 完成输入 */
    finishEdit() {
        const amount = this.calculateInput()
        const desc = this.data.desc
        const date = this.data.date
        if (this.data.keyboardKeys[15] === '=') {
            this.setData({
                input: amount.toString(),
                'keyboardKeys[15]': '完成'
            })
        } else {
            if (amount === 0) {
                wx.showModal({
                    title: '没有输入金额',
                    // content: '请输入大于0元的金额',
                    showCancel: false
                })
            } else {
                wx.showToast({
                    title: date + '：账单' + amount + '元，' + desc,
                    icon: 'none'
                })
                this.setData({
                    showEdit: false,
                    desc: '',
                    input: '0'
                })
            }
        }
    },
    /** 输入框获取焦点 */
    inputFocus(event) {
        let height = event.detail.height
        if (height === this.data.bottom) return
        this.setData({
            showKeyboard: height === 0,
            bottom: height
        })
    },
    setDate(date) {
        let today = getToday()
        let showDate = ''
        if (today === date) showDate = '今天'
        else showDate = date.replace(/-/g, '/')
        this.setData({
            date: date,
            'keyboardKeys[3]': showDate
        })
    }
})