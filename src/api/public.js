import request from '@/utils/request'

// 银行数据
// /bank/list get
export function getBankList(params) {
    return request({
        url: '/bank/list',
        method: 'get',
        params: params
    })
}
// /bank/update post
export function updateBank(params) {
    return request({
        url: '/bank/update',
        method: 'post',
        data: params
    })
}
// /bank/delete/{id} post
export function deleteBank(params) {
    return request({
        url: '/bank/delete/' + params,
        method: 'post'
    })
}

// 民航离岗记录
// /mhlgjl/list
export function getMhlgjlList(params) {
    return request({
        url: '/mhlgjl/list',
        method: 'get',
        params: params
    })
}
// /mhlgjl/update post
export function updateMhlgjl(params) {
    return request({
        url: '/mhlgjl/update',
        method: 'post',
        data: params
    })
}
// /mhlgjl/delete/{id} post
export function deleteMhlgjl(params) {
    return request({
        url: '/mhlgjl/delete/' + params,
        method: 'post'
    })
}

// 人员电子档案
// /rydzda/list
export function getRydzdaList(params) {
    return request({
        url: '/rydzda/list',
        method: 'get',
        params: params
    })
}
// /rydzda/update post
export function updateRydzda(params) {
    return request({
        url: '/rydzda/update',
        method: 'post',
        data: params
    })
}
// /rydzda/delete/{id} post
export function deleteRydzda(params) {
    return request({
        url: '/rydzda/delete/' + params,
        method: 'post'
    })
}

// 民航订票记录
// /mhdpjl/list
export function getMhdpjlList(params) {
    return request({
        url: '/mhdpjl/list',
        method: 'get',
        params: params
    })
}
// /mhdpjl/update post
export function updateMhdpjl(params) {
    return request({
        url: '/mhdpjl/update',
        method: 'post',
        data: params
    })
}
// /mhdpjl/delete/{id} post
export function deleteMhdpjl(params) {
    return request({
        url: '/mhdpjl/delete/' + params,
        method: 'post'
    })
}

// 全国驾驶人
// /qgjsr/list
export function getQgjsrList(params) {
    return request({
        url: '/qgjsr/list',
        method: 'get',
        params: params
    })
}
// /qgjsr/update post
export function updateQgjsr(params) {
    return request({
        url: '/qgjsr/update',
        method: 'post',
        data: params
    })
}
// /qgjsr/delete/{id} post
export function deleteQgjsr(params) {
    return request({
        url: '/qgjsr/delete/' + params,
        method: 'post'
    })
}

// 铁路售票信息
// /tlspxx/list
export function getTlspxxList(params) {
    return request({
        url: '/tlspxx/list',
        method: 'get',
        params: params
    })
}
// /tlspxx/update post
export function updateTlspxx(params) {
    return request({
        url: '/tlspxx/update',
        method: 'post',
        data: params
    })
}
// /tlspxx/delete/{id} post
export function deleteTlspxx(params) {
    return request({
        url: '/tlspxx/delete/' + params,
        method: 'post'
    })
}

// 全国机动车
// /qgjdc/list
export function getQgjdcList(params) {
    return request({
        url: '/qgjdc/list',
        method: 'get',
        params: params
    })
}
// /qgjdc/update post
export function updateQgjdc(params) {
    return request({
        url: '/qgjdc/update',
        method: 'post',
        data: params
    })
}
// /qgjdc/delete/{id} post
export function deleteQgjdc(params) {
    return request({
        url: '/qgjdc/delete/' + params,
        method: 'post'
    })
}

// 旅客住宿记录
// /lkzsxx/list
export function getLkzsxxList(params) {
    return request({
        url: '/lkzsxx/list',
        method: 'get',
        params: params
    })
}
// /lkzsxx/update post
export function updateLkzsxx(params) {
    return request({
        url: '/lkzsxx/update',
        method: 'post',
        data: params
    })
}
// /lkzsxx/delete/{id} post
export function deleteLkzsxx(params) {
    return request({
        url: '/lkzsxx/delete/' + params,
        method: 'post'
    })
}

// 出入境证件
// /crjzj/list
export function getCrjzjList(params) {
    return request({
        url: '/crjzj/list',
        method: 'get',
        params: params
    })
}
// /crjzj/update post
export function updateCrjzj(params) {
    return request({
        url: '/crjzj/update',
        method: 'post',
        data: params
    })
}
// /crjzj/delete/{id} post
export function deleteCrjzj(params) {
    return request({
        url: '/crjzj/delete/' + params,
        method: 'post'
    })
}

// 全部轨迹
// /qbgj/list
export function getQbgjList(params) {
    return request({
        url: '/qbgj/list',
        method: 'get',
        params: params
    })
}
// /qbgj/update post
export function updateQbgj(params) {
    return request({
        url: '/qbgj/update',
        method: 'post',
        data: params
    })
}
// /qbgj/delete/{id} post
export function deleteQbgj(params) {
    return request({
        url: '/qbgj/delete/' + params,
        method: 'post'
    })
}

// 机构法人信息
// /jgfrxx/list
export function getJgfrxxList(params) {
    return request({
        url: '/jgfrxx/list',
        method: 'get',
        params: params
    })
}
// /jgfrxx/update post
export function updateJgfrxx(params) {
    return request({
        url: '/jgfrxx/update',
        method: 'post',
        data: params
    })
}
// /jgfrxx/delete/{id} post
export function deleteJgfrxx(params) {
    return request({
        url: '/jgfrxx/delete/' + params,
        method: 'post'
    })
}

// 出入境记录
// /crjjl/list
export function getCrjjlList(params) {
    return request({
        url: '/crjjl/list',
        method: 'get',
        params: params
    })
}
// /crjjl/update post
export function updateCrjjl(params) {
    return request({
        url: '/crjjl/update',
        method: 'post',
        data: params
    })
}
// /crjjl/delete/{id} post
export function deleteCrjjl(params) {
    return request({
        url: '/crjjl/delete/' + params,
        method: 'post'
    })
}

// 机动车违章
// /jdcwz/list
export function getJdcwzList(params) {
    return request({
        url: '/jdcwz/list',
        method: 'get',
        params: params
    })
}
// /jdcwz/update post
export function updateJdcwz(params) {
    return request({
        url: '/jdcwz/update',
        method: 'post',
        data: params
    })
}
// /jdcwz/delete/{id} post
export function deleteJdcwz(params) {
    return request({
        url: '/jdcwz/delete/' + params,
        method: 'post'
    })
}

// 银行核查信息
// /yhhcxx/list
export function getYhhcxxList(params) {
    return request({
        url: '/yhhcxx/list',
        method: 'get',
        params: params
    })
}
// /yhhcxx/update post
export function updateYhhcxx(params) {
    return request({
        url: '/yhhcxx/update',
        method: 'post',
        data: params
    })
}
// /yhhcxx/delete/{id} post
export function deleteYhhcxx(params) {
    return request({
        url: '/yhhcxx/delete/' + params,
        method: 'post'
    })
}



// 亲属关系相关接口
// /rydzda/filters get
export function getRyDzdaFilters(params) {
    return request({
        url: '/rydzda/filters',
        method: 'get',
        params: params
    })
}
// /datatype/relation get
export function getDataTypeRelation(params) {
    return request({
        url: '/datatype/relation',
        method: 'get',
        params: params
    })
}
// /qsgx/list get
export function getQsgxList(params) {
    return request({
        url: '/qsgx/list',
        method: 'get',
        params: params
    })
}
// /qsgx/add post
export function addQsgx(params) {
    return request({
        url: '/qsgx/add',
        method: 'post',
        data: params
    })
}
// /qsgx/update
export function updateQsgx(params) {
    return request({
        url: '/qsgx/update',
        method: 'post',
        data: params
    })
}
// /qsgx/delete/{id}
export function deleteQsgx(params) {
    return request({
        url: '/qsgx/delete/' + params,
        method: 'post'
    })
}

// 资产-资源资源部
// /zrzyb/list
export function getZrzybList(params) {
    return request({
        url: '/zrzyb/list',
        method: 'get',
        params: params
    })
}
// /zrzyb/update post
export function updateZrzyb(params) {
    return request({
        url: '/zrzyb/update',
        method: 'post',
        data: params
    })
}
// /zrzyb/delete/{id} post
export function deleteZrzyb(params) {
    return request({
        url: '/zrzyb/delete/' + params,
        method: 'post'
    })
}


// /ai/jyls/list
export function getJylsList(params) {
    return request({
        url: '/jyls/list',
        method: 'get',
        params: params
    })
}
// /jyls/update post
export function updateJyls(params) {
    return request({
        url: '/jyls/update',
        method: 'post',
        data: params
    })
}
// /jyls/delete/{id} post
export function deleteJyls(params) {
    return request({
        url: '/jyls/delete/' + params,
        method: 'post'
    })
}


// 金融理财

// /ai/jrlc/list
export function getJrlcList(params) {
    return request({
        url: '/jrlc/list',
        method: 'get',
        params: params
    })
}
// /jrlc/update post
export function updateJrlc(params) {
    return request({
        url: '/jrlc/update',
        method: 'post',
        data: params
    })
}
// /jrlc/delete/{id} post
export function deleteJrlc(params) {
    return request({
        url: '/jrlc/delete/' + params,
        method: 'post'
    })
}

// 人民银行账户
// /rmyhzh/list
export function getRmyhzhList(params) {
    return request({
        url: '/rmyhzh/list',
        method: 'get',
        params: params
    })
}
// /rmyhzh/update post
export function updateRmyhzh(params) {
    return request({
        url: '/rmyhzh/update',
        method: 'post',
        data: params
    })
}
// /rmyhzh/delete/{id} post
export function deleteRmyhzh(params) {
    return request({
        url: '/rmyhzh/delete/' + params,
        method: 'post'
    })
}
