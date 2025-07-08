import { cargarHeader } from "../header/header.js";
import { cargarLogin } from "../login/login.js";

// ingresarProfe.js
function cargarFormularioRegistro() {
    let registro = document.createElement('div');
    registro.className = "div-registro";

    let formContainer = document.createElement('div');
    formContainer.className = "form-container";
    registro.appendChild(formContainer);

    let title = document.createElement('h1');
    title.textContent = "Login";
    formContainer.appendChild(title);

    let nombreLabel = document.createElement('h2');
    nombreLabel.textContent = "Nombre";
    formContainer.appendChild(nombreLabel);

    let nombreInput = document.createElement('input');
    nombreInput.type = "text";
    nombreInput.placeholder = "Nombre completo";
    formContainer.appendChild(nombreInput);

    let emailLabel = document.createElement('h2');
    emailLabel.textContent = "Email";
    formContainer.appendChild(emailLabel);

    let emailInput = document.createElement('input');
    emailInput.type = "email";
    emailInput.placeholder = "Correo electrónico";
    formContainer.appendChild(emailInput);

    let passLabel = document.createElement('h2');
    passLabel.textContent = "Password";
    formContainer.appendChild(passLabel);

    let passInput = document.createElement('input');
    passInput.type = "password";
    passInput.placeholder = "Contraseña";
    formContainer.appendChild(passInput);

    let togglePasswordBtn = document.createElement('button');
    togglePasswordBtn.textContent = "👁️";
    togglePasswordBtn.className = "toggle-password-btn";
    formContainer.appendChild(togglePasswordBtn);

    togglePasswordBtn.addEventListener('click', () => {
        
        if (passInput.type === "password") {
            passInput.type = "text";
        } else {
            passInput.type = "password";
        }

    });

    let btnRegistrar = document.createElement('button');
    btnRegistrar.textContent = "Registrar";
    btnRegistrar.className = "btn-registrar";
    formContainer.appendChild(btnRegistrar);

    let btnRegresar = document.createElement('button');
    btnRegresar.textContent = "Regresar al Login";
    btnRegresar.className = "btn-volver";
    formContainer.appendChild(btnRegresar);

    


    // Evento que maneja el registro de profesor
    btnRegistrar.addEventListener('click', () => {
        const nombre = nombreInput.value;
        const email = emailInput.value;
        const password = passInput.value;

        // Realizar la solicitud POST para registrar al profesor (ver backend)
        fetch('https://backend-app-asistencia-n58n.onrender.com/registrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, email, password })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message); // Mostrar mensaje de éxito
            window.location.href = '/';  // Volver al login (o al índice de la app)
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error en el registro');
        });
    });

    // Regresar al formulario de login
    btnRegresar.addEventListener('click', () => {
        const DOM = document.querySelector('#root');
        DOM.innerHTML = "";
        DOM.appendChild(cargarHeader());
        DOM.appendChild(cargarLogin());
    });

    // Agregar el formulario de registro al DOM
    document.querySelector('#root').innerHTML = '';
    document.querySelector('#root').appendChild(registro);
}

export { cargarFormularioRegistro };
