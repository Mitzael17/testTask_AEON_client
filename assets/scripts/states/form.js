import {create_loading_element} from "../components/create_loading_element.js";

export function get_form_state(is_loading_callback) {

    let error_element;
    let button;

    const state = new Proxy({error: '', is_loading: false}, {

        set(target, prop, value) {

            if(prop === 'error') {

                target[prop] = value;

                if(error_element === undefined) return true;

                if(value.length > 0) {

                    error_element.firstElementChild.innerHTML = value;

                    error_element.style.height = 'auto';

                    const height = error_element.offsetHeight;

                    error_element.style.height = '0';


                    setTimeout(() => {

                        error_element.style.height = height + 'px';

                    }, 50);


                } else {

                    error_element.style.height = error_element.offsetHeight + 'px';

                    setTimeout(() => {

                        error_element.style.height = '0';

                    }, 50);

                }

                return true;

            }

            if(prop === 'is_loading') {

                target[prop] = value;

                if(button === undefined) return true;

                if(!value) {

                    button.disabled = false;

                    button.innerHTML = is_loading_callback(target);

                }

                if(value) {

                    button.disabled = true;

                    button.innerHTML = '';
                    button.append(create_loading_element());

                }

                return true;

            }

        }

    })

    function set_elements({error_element: new_error_element, button: new_button}) {

        error_element = new_error_element ?? error_element;
        button = new_button ?? button;

    }

    return [state, set_elements];

}