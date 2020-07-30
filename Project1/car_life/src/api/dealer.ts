import request from '@/util/request'

// 获取经销商列表
export let getDealerList = (carId: string, cityId: string) => {
    return request.get('/v2-dealer-alllist.html', {params: {carId, cityId}});
}
