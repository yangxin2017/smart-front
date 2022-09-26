import request from '@/utils/request'


// mbrData/list
export function getMbrDataList(params) {
    return request({
        url: '/mbrData/list',
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