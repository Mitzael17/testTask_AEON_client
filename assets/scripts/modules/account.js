import {create_element} from "../components/create_element.js";
import {PAGES} from "../data/config.js";
import {delete_cookie, set_cookie} from "../utils/cookie.js";
import {create_loading_element} from "../components/create_loading_element.js";
import {create_success_message} from "../components/create_success_message.js";
import {get_form_state} from "../states/form.js";
import {create_error_element} from "../components/create_error_element.js";
import {$get_user, $update_user} from "../API/index.js";
import {default_validation} from "../utils/default_validation.js";

export async function account(global_state) {

    const root = document.getElementById('root');


    const [form_states, set_elements] = get_form_state(() => 'Сохранить');

    const states = new Proxy({is_visible_success_message: false}, {

        set(target, prop, value) {

            if(prop === 'is_visible_success_message') {

                target[prop] = value;

                if(value) {

                    success_element.style.height = 'auto';

                    const height = success_element.offsetHeight;

                    success_element.style.height = '0';


                    setTimeout(() => {

                        success_element.style.height = height + 'px';

                    }, 50);


                } else {

                    success_element.style.height = success_element.offsetHeight + 'px';

                    setTimeout(() => {

                        success_element.style.height = '0';

                    }, 50);

                }

                return true;

            }

        }

    })

    
    const loading = create_loading_element('100px', ['white']);

    root.append(loading);


    const data = await $get_user();

    if('status' in data && data['status'] === 'error') {

        alert(data['message']);

        delete_cookie('user_data');
        global_state.page = PAGES.authorization;

        return '';

    }


    if(global_state.show_success_message) create_success_message(loading, 'Вы успешно вошли!');
    else loading.remove();

    
    // Верстка
    
    const error_element = create_error_element(form_states);

    const button_submit = create_element('button', {
        class_names: ['button'],
        type: 'submit',
        innerHTML: 'Сохранить'
    })
    
    set_elements({button: button_submit, error_element});
    
    const success_element = create_element('div', {
        class_names: ['success', 'message'],
        children: [create_element('div', {
            innerHTML: 'Данные успешно обновлены!'
        })],
        ontransitionend: (event) => {

            if(event.propertyName === 'height' && states.is_visible_success_message) event.currentTarget.style.height = 'auto';

        }
    });

    const form_title = create_element('h1', {
        innerHTML: 'Личный кабинет'
    })

    const form_title_container = create_element('div', {
        class_names: ['form_title'],
        children: [form_title]
    })

    const img = create_element('img', {
        src: data.image ?? './assets/images/default_profile.png',
        alt: 'Ваше фото'
    })

    const input_file = create_element('input', {
        type: 'file',
        name: 'image',
        accept: 'image/*',
        onchange: handler_change_image
    })

    const edit_icon = create_element('img', {
        src: './assets/images/edit_icon.svg',
        alt: 'edit'
    })

    const label_img = create_element('label', {
        class_names: ['edit'],
        children: [edit_icon, input_file]
    })

    const img_container = create_element('div', {
        class_names: ['img_container'],
        children: [img]
    })

    const profile_img = create_element('div', {
        class_names: ['profile_img'],
        children: [img_container, label_img]
    })

    const input_name = create_element('input', {
        class_names: ['input'],
        type: 'text',
        name: 'name',
        value: data.name,
        placeholder: 'Введите новый логин...',
        oninput: handler_input
    })

    const input_password = create_element('input', {
        class_names: ['input'],
        type: 'password',
        value: data.password,
        name: 'password',
        placeholder: 'Введите новый пароль...',
        oninput: handler_input
    })

    const input_date = create_element('input', {
        class_names: ['input'],
        type: 'date',
        value: data.date_birthday ?? '',
        name: 'date_birthday',
        placeholder: 'Укажите ваш день рождения',
        oninput: handler_input
    })

    const button_logout = create_element('button', {
        class_names: ['button'],
        type: 'button',
        innerHTML: 'Выйти',
        onclick: handler_logout
    })

    const buttons_container = create_element('div', {
        class_names: ['form_buttons_container'],
        children: [button_submit, button_logout]
    })

    const messages = create_element('div', {
        children: [error_element, success_element]
    });

    const form_content = create_element('div', {
        class_names: ['form_content'],
        children: [profile_img, input_name, input_password, input_date, buttons_container, messages]
    })

    const form = create_element('form', {
        class_names: ['form'],
        children: [form_title_container, form_content],
        onsubmit: handler_submit
    });

    return form;

    async function handler_submit(event) {

       event.preventDefault();

       if(!default_validation(input_name, input_password) || form_states.is_loading) return;

       form_states.is_loading = true;


       const new_data = new FormData(form);

       new_data.delete('image');

       if(input_file.files[0] !== undefined) {

           new_data.append('image', input_file.files[0]);

        }


       const result = await $update_user(new_data);

       form_states.is_loading = false;


       if('status' in result && result['status'] === 'error') {

           form_states.error = result['message'];
           return;

       }

       set_cookie('user_data', result['user_data_encrypt'], {'max-age': 31536000});
       states.is_visible_success_message = true;

    }

    function handler_logout() {

        delete_cookie('user_data');
        global_state.page = PAGES.authorization;

    }

    function handler_change_image(event) {

        const reader = new FileReader();

        reader.readAsDataURL(event.currentTarget.files[0]);

        reader.onload = (event) => {

            img.src = event.target.result

        }

    }

    function handler_input() {

        form_states.error = '';
        states.is_visible_success_message = false;

    }

}
