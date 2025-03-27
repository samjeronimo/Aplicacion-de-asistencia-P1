import { cargarHeader } from "./componentes/header/header.js";
import { cargarLogin } from "./componentes/login/login.js";

function cargarDOM() {

    let DOM = document.querySelector('#root');

    DOM.appendChild(cargarHeader());
    DOM.appendChild(cargarLogin());


    return DOM;

}

cargarDOM();

export { cargarDOM }