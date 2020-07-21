import axios from 'axios'

const instance = axios.create({
    baseURL: '//baojia.chelun.com',
    timeout: 3000,
});

// Add a request interceptor
instance.interceptors.request.use(function(config) {
    // Do something before request is sent
    return config;
}, function(error) {
    // Do something with request error
    return Promise.resolve(error);
});

// Add a response interceptor
instance.interceptors.response.use(function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // return response;
    if (response.status !== 200) {
        // 请求错误
        console.log('response error...', response);
        return Promise.resolve();
    } else if (response.data.code !== 1) {
        // 业务逻辑错误
        console.log('data error...', response.data)
        return Promise.resolve();
    } else {
        return response.data;
    }
}, function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.resolve(error);
});

export default instance
