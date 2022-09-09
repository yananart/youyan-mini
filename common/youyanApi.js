/**
 * 后端服务地址
 */
const apiHome = 'https://api.yananart.cn'

/**
 * 判断用户是否登陆api
 *
 * @type {string} url
 */
const userCheckLoginApi = apiHome + '/user/checkLogin'

/**
 * 用户登陆api
 *
 * @type {String} url
 */
const userLoginApi = apiHome + '/user/wechat/miniprogram/login'

/**
 * 用户注册api
 *
 * @type {String} url
 */
const userRegisterApi = apiHome + '/user/wechat/miniprogram/register'

/**
 * 用户信息api
 *
 * @type {String} url
 */
const userInfoApi = apiHome + '/user/info'

/**
 * 用户更新api
 * 
 * @type {String} url
 */
const userUpdateApi = apiHome + '/user/update'

/**
 * 导出
 */
export default {
    user: {
        checkLogin: userCheckLoginApi,
        login: userLoginApi,
        register: userRegisterApi,
        userInfo: userInfoApi,
        update: userUpdateApi
    }
}