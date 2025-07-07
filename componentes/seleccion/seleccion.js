import { cargarHeader } from '../header/header.js';
import { cargarHeaderAdmin } from '../header/headerAdmin.js';
import { cargarLogin } from '../login/login.js';
import { cargarLoginAdmin } from '../login/loginAdmin.js';

function cargarSeleccion() {
    let seleccionDiv = document.createElement('div');
    seleccionDiv.className = "div-seleccion-scl";

    // Logo del colegio
    let logoContainer = document.createElement('div');
    logoContainer.className = "logo-container";
    
    let logo = document.createElement('img');
    logo.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr-nqwS5G2tvPr5nXbz9fsC646akdRq0T_8BCLqaQyzqVe7EpuFJafFHY7wgKsyv-lUnU&usqp=CAUg"; // Reemplaza con el logo real
    logo.alt = "Logo SCL";
    logo.className = "logo-scl";
    logoContainer.appendChild(logo);
    seleccionDiv.appendChild(logoContainer);

    // Título principal
    let titulo = document.createElement('h1');
    titulo.className = "titulo-seleccion-scl";
    titulo.innerHTML = 'Sistema de Asistencia <span class="nombre-colegio">SCL</span>';
    seleccionDiv.appendChild(titulo);

    // Contenedor principal
    let contenedor = document.createElement('div');
    contenedor.className = "contenedor-seleccion-scl";
    seleccionDiv.appendChild(contenedor);

    // Opción ADMINISTRADOR (Estilo más formal)
    let adminDiv = document.createElement('div');
    adminDiv.className = "opcion-scl opcion-admin-scl";
    
    let adminIcon = document.createElement('div');
    adminIcon.className = "opcion-icono-scl";
    adminIcon.innerHTML = `📊`;
    
    let adminTexto = document.createElement('span');
    adminTexto.className = "opcion-texto-scl";
    adminTexto.textContent = "ADMINISTRATIVO";
    
    let adminDesc = document.createElement('p');
    adminDesc.className = "opcion-desc-scl";
    adminDesc.textContent = "Acceso al panel de control institucional";
    
    adminDiv.appendChild(adminIcon);
    adminDiv.appendChild(adminTexto);
    adminDiv.appendChild(adminDesc);
    contenedor.appendChild(adminDiv);

    // Evento para ADMINISTRADOR
    adminDiv.addEventListener('click', () => {
        const DOM = document.querySelector('#root');
        DOM.innerHTML = "";
        DOM.appendChild(cargarHeaderAdmin());
        DOM.appendChild(cargarLoginAdmin());
    });

    // Opción PROFESOR (Estilo educativo)
    let profesorDiv = document.createElement('div');
    profesorDiv.className = "opcion-scl opcion-profesor-scl";
    
    let profesorIcon = document.createElement('div');
    profesorIcon.className = "opcion-icono-scl";
    profesorIcon.innerHTML = `✏️`;
    
    let profesorTexto = document.createElement('span');
    profesorTexto.className = "opcion-texto-scl";
    profesorTexto.textContent = "DOCENTE";
    
    let profesorDesc = document.createElement('p');
    profesorDesc.className = "opcion-desc-scl";
    profesorDesc.textContent = "Registro y consulta de asistencia escolar";
    
    profesorDiv.appendChild(profesorIcon);
    profesorDiv.appendChild(profesorTexto);
    profesorDiv.appendChild(profesorDesc);
    contenedor.appendChild(profesorDiv);

    // Evento para PROFESOR
    profesorDiv.addEventListener('click', () => {
        const DOM = document.querySelector('#root');
        DOM.innerHTML = "";
        DOM.appendChild(cargarHeader());
        DOM.appendChild(cargarLogin());
    });

    // Pie de página institucional
    let footer = document.createElement('div');
    footer.className = "footer-scl";
    footer.innerHTML = `
        <p>Colegio Santa Catalina Labouré © ${new Date().getFullYear()}</p>
        <p>"Educando con valores cristianos"</p>
    `;
    seleccionDiv.appendChild(footer);

    return seleccionDiv;
}

export { cargarSeleccion };