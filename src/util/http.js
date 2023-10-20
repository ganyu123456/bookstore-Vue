import { dialog,closeAll } from "./layer";

import axios from "axios";
const instance = axios.create({
    baseURL: 'http://localhost:44311/api/services/app',
    timeout: 5000
});


// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    closeAll();
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    //if (!response.data.success) {
    //    alert("调用接口返回失败！\r\n" + JSON.stringify(response.data));
    //    return Promise.reject(response);
    //}
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    closeAll();
    if (error.response&&error.response.data) {
        dialog(error.response.data.error.message);
    } else {
        dialog("调用接口异常！" + error.message);
    }
    return Promise.reject(error);
});

export function post(url, content) {
    return instance.post(url,content)
}


export function put(url, content) {
    return instance.put(url, content)
}
export function del(url, content) {
    return instance.delete(url, { params: content })
}

export function get(url) {
    return instance.get(url)
}