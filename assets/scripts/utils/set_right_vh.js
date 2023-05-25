export function set_right_vh() {

    const handlerResize = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    handlerResize();

    window.addEventListener('resize', handlerResize);

}