import request from '@/util/request'

// 获取品牌数据
export let getBrandList = () => {
    return request.get('/v2-car-getMasterBrandList.html');
}

// 获取车系数据
export let getSerialList = (MasterID: number) => {
    return request.get('/v2-car-getMakeListByMasterBrandId.html', {params: {MasterID}});
}
