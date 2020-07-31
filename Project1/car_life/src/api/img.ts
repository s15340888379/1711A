import request from '@/util/request'

// 获取车系图片列表
export let getImageList = (params: {}) => {
    return request.get('/v2-car-getImageList.html', {params});
}

// 获取汽车颜色列表
export let getModelImageYearColor = (SerialID: string) => {
    return request.get('/v2-car-getModelImageYearColor.html', {params: {SerialID}});
}

// 获取车系图片分类列表
export let getCategoryImageList = (SerialID: string, ImageID: string, Page: number= 0, PageSize: number= 30) => {
    return request.get('/v2-car-getCategoryImageList.html', {params: {SerialID, ImageID, Page, PageSize}});
}
