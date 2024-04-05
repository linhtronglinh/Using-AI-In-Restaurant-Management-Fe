import axios from "axios";
// const apiUrl = 'http://192.168.1.174:8000/api/';
const apiUrl = 'http://127.0.0.1:8000/api/';

export default {
    getHeader(tokenName) {
        const token = tokenName && JSON.parse(window.localStorage.getItem(tokenName))?.access_token;
        return token ? { Authorization: `Bearer ${token}` } : {};
    },
    
    get(url, tokenName, additionalHeaders = {}) {
        const headers = { ...this.getHeader(tokenName), ...additionalHeaders };
        return axios.get(apiUrl + url, { headers });
    },
    post(url, data, tokenName, additionalHeaders = {}) {
        const headers = { ...this.getHeader(tokenName), ...additionalHeaders };
        return axios.post(apiUrl + url, data, { headers });
    },
}