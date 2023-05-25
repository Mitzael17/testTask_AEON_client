import {create_element} from "../components/create_element.js";
import {PAGES} from "../data/config.js";
import {set_cookie} from "../utils/cookie.js";
import {get_form_state} from "../states/form.js";
import {create_error_element} from "../components/create_error_element.js";
import {$login, $registration} from "../API/index.js";
import {default_validation} from "../utils/default_validation.js";

export function authorization(global_state) {

    const states = new Proxy({is_login: true}, {

        set(target, prop, value) {

            if(prop === 'is_login') {

                target[prop] = value;

                if(value) {

                    toggle_mode_button.innerHTML = 'Зарегистрироваться';
                    form_title.innerHTML = 'Вход';
                    button.innerHTML = 'Войти';

                    if(input_repeat_password) input_repeat_password.remove();

                    input_repeat_password = undefined;

                }

                if(!value) {

                    toggle_mode_button.innerHTML = 'Войти';
                    form_title.innerHTML = 'Регистрация';
                    button.innerHTML = 'Зарегистрироваться';

                    input_repeat_password = create_element('input', {
                        class_names: ['input'],
                        type: 'password',
                        name: 'repeat_password',
                        placeholder: 'Повторите пароль...',
                        oninput: () => form_states.error = ''
                    });

                    input_password.insertAdjacentElement('afterend', input_repeat_password);

                }

                return true;

            }

        }

    });

    const [form_states, set_elements] = get_form_state((states) => {
        
        if(states.is_login) return 'Регистрация';
        return 'Вход';
        
    });


    // Верстка

    const error_element = create_error_element(form_states);

    const button = create_element('button', {
        class_names: ['button'],
        type: 'submit',
        innerHTML: 'Войти'
    })

    // записываем элементы для form_states
    set_elements({error_element, button});

    const form_title = create_element('h1', {
        innerHTML: 'Вход'
    })

    const form_title_container = create_element('div', {
        class_names: ['form_title'],
        children: [form_title]
    })

    const input_name = create_element('input', {
        class_names: ['input'],
        type: 'text',
        name: 'name',
        placeholder: 'Введите логин...',
        oninput: () => form_states.error = ''
    })

    const input_password = create_element('input', {
        class_names: ['input'],
        type: 'password',
        name: 'password',
        placeholder: 'Введите пароль...',
        oninput: () => form_states.error = ''
    })

    let input_repeat_password;

    const toggle_mode_button = create_element('div', {
        class_names: ['link'],
        innerHTML: 'Войти',
        onclick: () => states.is_login = !states.is_login
    })

    const form_block = create_element('div', {
        class_names: ['form_block'],
        children: [button, toggle_mode_button]
    })

    const form_content = create_element('div', {
        class_names: ['form_content'],
        children: [input_name, input_password, form_block, error_element]
    })

    const form = create_element('form', {
        class_names: ['form'],
        onsubmit: handler_submit,
        children: [form_title_container, form_content]
    });


    states.is_login = true;

    return form;

    async function handler_submit(event) {

        event.preventDefault();

        if(!validation() || form_states.is_loading) return;

        form_states.is_loading = true;


        let result;

        if(states.is_login) result = await $login(new FormData(form));

        if(!states.is_login) result = await $registration(new FormData(form));


        form_states.is_loading = false;

        if('status' in result && result['status'] === 'error') {

            form_states.error = result.message;

            return false;

        }

        if(!('user_data_encrypt' in result)) {

            alert('Ошибка!');
            return false;

        }

        set_cookie('user_data', result['user_data_encrypt'], {'max-age': 31536000});

        global_state.show_success_message = true;
        global_state.page = PAGES.account;

    }

    function validation() {

        let default_validation_result = default_validation(input_name, input_password, form_states);

        if(!default_validation_result) return false;

        if(!states.is_login && input_repeat_password.value !== input_password.value) {

            form_states.error = 'Пароли не совпадают!';

            return false;

        }

        return true;

    }

}