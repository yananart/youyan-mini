import { getToday } from '../../utils/date'

Page({
    data: {
        year: '2022',
        month: '09',
        theme: '',
        income: 800.00,
        outlay: 1000.00,
        data: [
            {
                date: '2022-09-14',
                income: 0,
                outlay: 20,
                detail: [
                    {
                        category: {
                            id: 2,
                            icon: '🥤',
                            name: '饮料'
                        },
                        desc: '碳酸饮料 快乐水',
                        tag: '商超',
                        type: 0,
                        amount: 5
                    },
                    {
                        category: {
                            id: 1,
                            icon: '🍱',
                            name: '餐饮'
                        },
                        desc: '中饭 食堂',
                        tag: '午餐',
                        type: 0,
                        amount: 15
                    }
                ]
            },
            {
                date: '2022-09-13',
                income: 0,
                outlay: 30,
                detail: [
                    {
                        category: {
                            id: 1,
                            icon: '🍱',
                            name: '餐饮'
                        },
                        desc: '晚饭 饿了么',
                        tag: '晚餐',
                        type: 0,
                        amount: 15
                    }, {
                        category: {
                            id: 1,
                            icon: '🍱',
                            name: '餐饮'
                        },
                        desc: '中饭 食堂',
                        tag: '午餐',
                        type: 0,
                        amount: 15
                    }
                ]
            },
            {
                date: '2022-09-12',
                income: 100,
                outlay: 33.5,
                detail: [
                    {
                        category: {
                            id: 103,
                            icon: '🧧',
                            name: '红包'
                        },
                        desc: '微信红包',
                        tag: '微信',
                        type: 1,
                        amount: 100
                    },
                    {
                        category: {
                            id: 1,
                            icon: '🍱',
                            name: '餐饮'
                        },
                        desc: '晚饭 饿了么',
                        tag: '晚餐',
                        type: 0,
                        amount: 15
                    }, {
                        category: {
                            id: 2,
                            icon: '🥤',
                            name: '饮料'
                        },
                        desc: '碳酸饮料600ml',
                        tag: '商超',
                        type: 0,
                        amount: 3.5
                    }, {
                        category: {
                            id: 1,
                            icon: '🍱',
                            name: '餐饮'
                        },
                        desc: '中饭 食堂',
                        tag: '午餐',
                        type: 0,
                        amount: 15
                    }
                ]
            }
        ]
    },
    onLoad() {
        this.setData({
            theme: wx.getSystemInfoSync().theme
        })
        wx.onThemeChange((result) => {
            this.setData({
                theme: result.theme
            })
        })

        let today = getToday()
        this.setData({
            year: today.substring(0, 4),
            month: today.substring(5, 7)
        })
    },
    onUnload() {
        wx.offThemeChange((result) => { })
    },
    onShow() {
    },
    onShareAppMessage() {
        const message = this.data.month + '月，收入' + this.data.income + '元，支出' + this.data.outlay + '元'
        return {
            title: message,
            path: '/pages/launch/launch',
            // imageUrl: '/icons/common/icon.png'
        }
    },
    selectMonth(event) {
        let month = event.detail.value
        let year = month.substr(0, 4)
        month = month.substr(5, 2)
        this.setData({
            year: year,
            month: month
        })
    },
    toBillDetail(event) {
        let billDetail = event.currentTarget.dataset.bill
        let date = event.currentTarget.dataset.date
        billDetail.date = date
        wx.navigateTo({
            url: '/pages/bill-detail/bill-detail',
            success: function (res) {
                res.eventChannel.emit('billDetail', billDetail)
            }
        })
    }
})
