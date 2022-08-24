import request from '@/utils/request'

export function getListByBelongId(bid) {
  return request({
    url: '/analysis/file/listByBid?bid=' + bid,
    method: 'get',
  })
}
