import {authorization} from "./authorization.js";
import {account} from "./account.js";
import {PAGES} from "../data/config.js";


export async function router(page, state) {

    switch (page) {

        case PAGES.authorization:

            document.title = 'Авторизация';
            return await authorization(state);

        case PAGES.account:

            document.title = 'Личный кабинет';
            return await account(state);

        default:

            document.title = 'Не найдено';
            return '404. Страница не найдена!';

    }

}
