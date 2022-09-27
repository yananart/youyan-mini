/**
 * 获取今天
 * @returns {String} YYYY-MM-DD
 */
export function getToday() {
    const now = new Date()
    return now.getFullYear() + '-' + (now.getMonth() + 1).toString().padStart(2, '0') + '-' + now.getDate().toString().padStart(2, '0')
}