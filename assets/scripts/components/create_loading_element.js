import {create_element} from "./create_element.js";

export function create_loading_element(diameter = '20px' , class_names = []) {

    const loader = create_element('div', {
        style: `width: ${diameter}; height: ${diameter}`,
        class_names: ['loading', ...class_names],
        children: [create_element('span'), create_element('span')]
    })

    return create_element('div', {
        children: [loader],
        class_names: ['loading_container']
    })

}