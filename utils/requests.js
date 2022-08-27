/**
 * 获取token
 * 
 * @returns {string} token
 */
function getToken() {
    return 'Bearer ' + wx.getStorageSync('token')
}


/**
 * Get请求
 * 
 * @param {String} url 请求地址
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
 * @param {String} url 请求地址
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
 * @param {String} url 请求地址
 */
function getAwait(url) {
    return new Promise((resolve, reject) => {
        get(url, (success) => {
            resolve(success)
        }, (fail) => {
            console.warn('GET请求失败', fail)
            reject(fail)
        })
    })
}


/**
 * Post请求 await
 * 
 * @param {String} url 请求地址
 * @param {JSON} data 请求数据
 */
function postAwait(url, data) {
    return new Promise((resolve, reject) => {
        post(url, data, (success) => {
            resolve(success)
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