import request from '@/utils/request'

export function GetProjectList(params) {
  return request({
    url: '/project/list',
    method: 'get',
    params: params
  })
}

export function AddProject(data) {
  return request({
    url: '/project/add',
    method: 'post',
    data: data
  })
}

export function CalcProject(projectId) {
  return request({
    url: '/calc/relation?projectId=' + projectId,
    method: 'get',
  })
}

export function GetRelationshiop(projectId) {
  return request({
    url: '/calc/results?projectId=' + projectId,
    method: 'get',
  })
}


export function UpdateMBR(id, isMBR) {
  return request({
    url: '/rydzda/updatembr',
    method: 'post',
    params: { id, isMBR }
  })
}


// /ai/graph/one
export function GetGraphOne(params) {
  return request({
    url: '/graph/one',
    method: 'get',
    params
  })
}

// /graph/save
export function SaveGraph(data) {
  return request({
    url: '/graph/save',
    method: 'post',
    data
  })
}

// /graph/update
export function UpdateGraph(data) {
  return request({
    url: '/graph/update',
    method: 'post',
    data
  })
}