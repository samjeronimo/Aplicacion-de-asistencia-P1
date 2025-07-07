//import { cargarHeader } from "./componentes/header/header.js";
//import { cargarLogin } from "./componentes/login/login.js";
import { cargarSeleccion } from "./componentes/seleccion/seleccion.js";

function cargarDOM() {

    let DOM = document.querySelector('#root');

    /*DOM.appendChild(cargarHeader());
    DOM.appendChild(cargarLogin());*/
    DOM.appendChild(cargarSeleccion());


    return DOM;

}

cargarDOM();

export { cargarDOM }