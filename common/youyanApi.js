/**
 * 后端服务地址
 */
const apiHome = 'https://api.yananart.cn'

/**
 * 判断用户是否登陆api
 */
const userCheckLoginApi = apiHome + '/user/checkLogin'

/**
 * 用户登陆api
 */
const userLoginApi = apiHome + '/user/wechat/miniprogram/login'

/**
 * 用户信息api
 */
const userInfoApi = apiHome + '/user/info'

/**
 * 导出
 */
export default {
    user: {
        checkLogin: userCheckLoginApi,
        login: userLoginApi,
        userInfo: userInfoApi
    }
}