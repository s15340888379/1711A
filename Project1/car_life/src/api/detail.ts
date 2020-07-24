import request from '@/util/request'

// 获取车系详情
export let getSerialDetail = (SerialID: number) => {
    return request.get('/v2-car-getInfoAndListById.html', {params: {SerialID}});
}
