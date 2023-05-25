import {create_element} from "./create_element.js";

export function create_success_message(loading, message) {

    const spans = loading.querySelectorAll('span');

    const message_element = create_element('div', {
        class_names: ['loading_text'],
        innerHTML: message
    });

    loading.append(message_element);

    spans.forEach( (span, index) => {

        loading.classList.add('success_message');

        span.style.transform = getComputedStyle(span).transform;

        span.style.animationIterationCount = '0';

        setTimeout( () => {

            span.style.top = '50%';
            span.style.left = '47%';

            if(index === 0) {

                span.style.transform = 'translate(-50%, -70%) rotate(45deg)';
                span.style.width = '4%';

                return;
            }

            if(index === 1) {

                span.style.transform = 'translate(-38%, -55%) rotate(-45deg)';

            }

        }, 30)

    })

    loading.style.position = 'fixed';
    loading.style.zIndex = '50';
    loading.style.bottom = '50%';
    loading.style.right = '50%';
    loading.style.transform = 'translate(50%, 50%)';

    setTimeout(() => {

        loading.style.transition = '2s all, 2s transform';
        loading.style.transform = 'translate(0%, 0%)';
        loading.style.position = 'fixed';
        loading.style.bottom = '0%';
        loading.style.right = '0%';

    }, 2000);

    setTimeout(() => {

        loading.style.opacity = '0';

        loading.ontransitionend = (event) => {

            if(event.propertyName === 'opacity') loading.remove();

        }

    }, 8000)

}