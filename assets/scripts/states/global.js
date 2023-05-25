import {router} from "../modules/router.js";

const root = document.querySelector('#root');
export const global_state = new Proxy({page: '', show_success_message: false}, {

    async set(target, prop, value) {

        if(prop === 'page') {

            target[prop] = value;

            root.innerHTML = '';

            root.append(await router(value, global_state));

            return true;

        }

        if(prop === 'show_success_message') {

            target[prop] = value;
            return true;

        }

        return false;

    }

});
