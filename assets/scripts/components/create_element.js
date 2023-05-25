export function create_element(tag, settings = {}) {

    const element = document.createElement(tag);

    for( const [key, value] of Object.entries(settings) ) {

        if(key === 'class_names') {

            element.classList.add(...value);

            continue;

        }

        if(key === 'children') {

            element.append(...value);

            continue;

        }

        element[key] = value;

    }

    return element;

}