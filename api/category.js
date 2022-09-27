import requests from '../utils/requests'
import api from '../common/youyanApi'

/**
 * 查询账单种类的分类信息
 */
export function getCategoryType() {
    return requests.get(api.categoty.type)
}