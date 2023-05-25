import {create_element} from "./create_element.js";

export function create_error_element(state) {

    return create_element('div', {
        class_names: ['error', 'message'],
        children: [create_element('div', {
            innerHTML: state.error
        })],
        ontransitionend: (event) => {

            if(event.propertyName !== 'height') return;

            if(state.error.length > 0) event.currentTarget.style.height = 'auto';
            else event.currentTarget.firstElementChild.innerHTML = '';

        }
    });

}