import request from '@/utils/request'

export function getAll() {
  return request({
    url: '/analysis/datatype/all',
    method: 'get',
  })
}
