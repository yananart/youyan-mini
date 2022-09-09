import cacheUtil from './cache'

/**
 * 获取token
 *
 * @returns {string} token
 */
function getToken() {
    return 'Bearer ' + cacheUtil.getToken()
}


/**
 * Get请求
 *
 * @param {string} url 请求地址
 * @param {Function} success 成功回调
 * @param {Function} fail 失败回调
 */
function get(url, success, fail) {
    wx.request({
        method: 'GET',
        url: url,
        header: {
            Authorization: getToken()
        },
        success: success,
        fail: fail
    })
}


/**
 * Post请求
 *
 * @param {string} url 请求地址
 * @param {JSON} data 请求数据
 * @param {Function} success 成功回调
 * @param {Function} fail 失败回调
 */
function post(url, data, success, fail) {
    wx.request({
        method: 'POST',
        url: url,
        header: {
            Authorization: getToken()
        },
        data: data,
        success: success,
        fail: fail
    })
}


/**
 * Get请求 await
 *
 * @param {string} url 请求地址
 * @returns {Promise<RequestSuccessCallbackResult<JSON>>} 响应结果
 */
function getAwait(url) {
    return new Promise((resolve, reject) => {
        get(url, (success) => {
            if (success.statusCode >= 500) {
                reject(success)
            } else {
                resolve(success)
            }
        }, (fail) => {
            console.warn('GET请求失败', fail)
            reject(fail)
        })
    })
}


/**
 * Post请求 await
 *
 * @param {string} url 请求地址
 * @param {JSON} data 请求数据
 * @returns {Promise<RequestSuccessCallbackResult<JSON>>} 响应结果
 */
function postAwait(url, data) {
    return new Promise((resolve, reject) => {
        post(url, data, (success) => {
            if (success.statusCode >= 500) {
                reject(success)
            } else {
                resolve(success)
            }
        }, (fail) => {
            console.warn('POST请求失败', fail)
            reject(fail)
        })
    })
}


/**
 * 模块导出
 */
export default {
    /**
     * Get请求
     */
    get: getAwait,
    /**
     * Post请求
     */
    post: postAwait
}