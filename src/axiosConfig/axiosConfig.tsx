import { AxiosRequestConfig } from 'axios';

const baseUrls = {
    dev: 'http://localhost:3300/api',
    produccion: 'http://apielecciones2021.azurewebsites.net/api'
}

const config: AxiosRequestConfig = {
    baseURL: baseUrls.produccion,
    headers: {
        'content-type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
}

export { config };