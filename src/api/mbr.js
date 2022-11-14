import request from '@/utils/request'


// mbrData/list
export function getMbrDataList(params) {
    return request({
        url: '/mbrData/list',
        method: 'get',
        params
    })
}
export function getFxdxDataList(params) {
    return request({
        url: '/mbrData/fxdxlist',
        method: 'get',
        params
    })
}

// mbrData/allPeople
export function getMbrDataAllPeople(params) {
    return request({
        url: '/mbrData/allPeople',
        method: 'get',
        params
    })
}

// mbrData/saveMbr
export function saveMbrDataMbr(data) {
    return request({
        url: `/mbrData/saveMbr`,
        method: 'post',
        data
    })
}

export function saveFxdxData(data) {
    return request({
        url: `/mbrData/saveFxdx`,
        method: 'post',
        data
    })
}

export function postRequest(url, data) {
    return request({
        url: url,
        method: 'post',
        data
    })
}
