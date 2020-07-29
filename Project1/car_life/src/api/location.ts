import request from '@/util/request'

// 获取当前位置
export let getLocation = () => {
    return request.get('/location-client.html');
}

// 获取省份城市数据
export let getCityList = (provinceid?: number) => {
    return request.get('/v1-city-alllist.html', {params: {provinceid}});
}

