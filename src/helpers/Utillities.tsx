import { IUtillities } from "../helpers/IUtillities";
import axios from "axios";
import { config } from "../axiosConfig/axiosConfig";
import { isEmpty } from "@microsoft/sp-lodash-subset";
// config.headers['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhY2FsaXh2IiwiZXhwIjoxNjAxMTc1MDg1fQ.zhLXIuDaFVTJ1-TjJbRI-4NYyrJSYjvksZdkfQToH7k';
const api = axios.create(config);

api.interceptors.request.use(
    async config => {
        const TOKEN = localStorage.getItem('USER_TOKEN')
        config.headers = (TOKEN) ? { 'Authorization': `Bearer ${TOKEN}` } : { 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBY2FsaXgiLCJleHAiOjE2MzUyNjM2OTZ9.JkcMboLFcBhASwka9YrENqvJD9_a6_-BnVNCRo59kbs' };
        return config;
    },
    error => {
        Promise.reject(error)
    });

async function getData(props: IUtillities) {
    try {
        const datos = await api.get(props.url).then(datos => {
            return datos.data;
        }).catch(error => {
            return {message: 'No se pudieron obtener los datos', error: error}
        });
        if (!isEmpty(datos.data)) {
            return datos.data;
        } else return [{ message: 'No se pudieron obtener los datos' }]
    } catch (err) {
        console.error(err);
    }
};

async function saveData(props: IUtillities) {
    try {
        const { data } = props;
        return await api.post(props.url, data)
            .then(response => {
                return response.status;
            })
            .catch(error => { return { message: error } });
    } catch (error) {
        console.error(error)
    }
}

async function updateData(props: IUtillities) {
    try {
        config['content-type'] = 'application/x-www-form-urlencoded'
        const { data } = props;
        return await api.put(props.url, data)
            .then(response => {
                return response.status;
            })
            .catch(error => {
                return { message: error }
            });
    } catch (error) {
        console.error(error)
    }
}

async function deleteData(props: IUtillities) {
    try {
        return await api.delete(props.url)
            .then(response => {
                return response.status;
            })
            .catch(error => { return { message: error } });
    } catch (error) {
        console.error(error)
    }
}

async function LogIn(props: IUtillities) {
    config['content-type'] = 'application/x-www-form-urlencoded'
    delete api.defaults.headers.common['Authorization'];
    try {
        const { data, url } = props;
        return await api.post(url, data)
            .then(response => {
                if (response['status'] !== undefined) {
                    localStorage.setItem('USER_TOKEN', response.data.token);
                    return { status: response.status, Token: `${response.data.token}`, nombreUsuario: response.data.nombreUsuario };
                } else {
                    return { status: 401 };
                }
            })
            .catch(error => { return { message: error } });
    } catch (error) {
        console.error(error)
    }
}

async function LogOut() {
    localStorage.clear();
}

async function checkUser(props: IUtillities) {
    config['content-type'] = 'application/x-www-form-urlencoded'
    try {
        return await api.get(props.url)
            .then(response => {
                if (response.status === 200) {
                    return { user: response.data, status: response.status }
                } else {
                    return { message: 'Error de autenticación' }
                }
            }).catch(error => { return { status: 401, error: error } })
    } catch (error) {
        console.error('catch', error)
    }
}

function getToken() {
    const tokenStored = localStorage.getItem('USER_TOKEN');
    if (!isEmpty(tokenStored)) {
        return true
    } else {
        return false
    }
}
export {
    getData,
    saveData,
    deleteData,
    updateData,
    LogIn,
    checkUser,
    getToken,
    LogOut
};