import {API_URL} from "../data/config.js";
import {get_cookie} from "../utils/cookie.js";

const $API = async (endpoint, method = 'GET', data = undefined) => {

    try {
        const response = await fetch(API_URL + endpoint, {
            method,
            body: data
        })

        return await response.json();
    } catch (e) {

        return {status: 'error', message: 'Ошибка сервера'};

    }

}

const $AUTH_API = async (endpoint, method = 'GET', data = undefined) => {

    try {
        const response = await fetch(API_URL + endpoint, {
            method,
            body: data,
            headers: {
                'Authorization': get_cookie('user_data')
            }
        })

        return await response.json();
    } catch (e) {

        return {status: 'error', message: 'Ошибка сервера'};

    }


}


export const $login = async (data) => {

    return await $API('/login', 'POST', data);

}


export const $registration = async (data) => {

    return await $API('/registration', 'POST', data);

}

export const $get_user = async () => {

    return await $AUTH_API('/user');

}


export const $update_user = async (data) => {

    return await $AUTH_API('/user', 'POST', data);

}