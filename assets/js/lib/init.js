export default (global) => {
    global = global || window.SHU;

    document.documentElement.classList.remove('js-loading');
    document.documentElement.classList.add('js-loaded');
}
