Page({
    data: {
        year: '2022',
        month: '09',
        theme: '',
        data: [
            {
                date: '09-14',
                income: 0,
                outlay: 20,
                detail: [
                    {
                        icon: '🥤',
                        desc: '碳酸饮料 快乐水',
                        tag: '商超',
                        amount: '-5'
                    },
                    {
                        icon: '🍱',
                        desc: '中饭 食堂',
                        tag: '中餐',
                        amount: '-15'
                    }
                ]
            },
            {
                date: '09-13',
                income: 0,
                outlay: 30,
                detail: [
                    {
                        icon: '🍱',
                        desc: '晚饭 饿了么',
                        tag: '晚餐',
                        amount: '-15'
                    },{
                        icon: '🍱',
                        desc: '中饭 食堂',
                        tag: '中餐',
                        amount: '-15'
                    }
                ]
            },
            {
                date: '09-12',
                income: 100,
                outlay: 33.5,
                detail: [
                    {
                        icon: '🧧',
                        desc: '微信红包',
                        tag: '微信',
                        amount: '+100'
                    },
                    {
                        icon: '🍱',
                        desc: '晚饭 饿了么',
                        tag: '晚餐',
                        amount: '-15'
                    },{
                        icon: '🥤',
                        desc: '碳酸饮料600ml',
                        tag: '商超',
                        amount: '-3.5'
                    },{
                        icon: '🍱',
                        desc: '中饭 食堂',
                        tag: '中餐',
                        amount: '-15'
                    }
                ]
            },
            {
                date: '09-10',
                income: 0,
                outlay: 1234.56,
                detail: [
                    {
                        icon: '❓',
                        desc: '测试输入',
                        tag: '测试',
                        amount: '-100.01'
                    },
                    {
                        icon: '❓',
                        desc: '测试输入',
                        tag: '测试',
                        amount: '-100.01'
                    },{
                        icon: '❓',
                        desc: '测试输入',
                        tag: '测试',
                        amount: '-100.01'
                    },{
                        icon: '❓',
                        desc: '测试输入',
                        tag: '测试',
                        amount: '-100.01'
                    },{
                        icon: '❓',
                        desc: '测试输入',
                        tag: '测试',
                        amount: '-100.01'
                    },{
                        icon: '❓',
                        desc: '测试输入',
                        tag: '测试',
                        amount: '-100.01'
                    },{
                        icon: '❓',
                        desc: '测试输入',
                        tag: '测试',
                        amount: '-100.01'
                    },{
                        icon: '❓',
                        desc: '测试输入',
                        tag: '测试',
                        amount: '-100.01'
                    },{
                        icon: '❓',
                        desc: '测试输入',
                        tag: '测试',
                        amount: '-100.01'
                    },{
                        icon: '❓',
                        desc: '测试输入',
                        tag: '测试',
                        amount: '-100.01'
                    },{
                        icon: '❓',
                        desc: '测试输入',
                        tag: '测试',
                        amount: '-100.01'
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
    },
    onUnload() {
        wx.offThemeChange((result) => { })
    },
    onShow() {
    },
    selectMonth(event) {
        let month = event.detail.value
        let year = month.substr(0, 4)
        month = month.substr(5, 2)
        this.setData({
            year: year,
            month: month
        })
    }
})
