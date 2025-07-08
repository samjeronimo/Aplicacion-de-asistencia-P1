import { cargarHeaderAdmin } from "../header/headerAdmin.js";
import { cargarLoginAdmin } from "../login/loginAdmin.js";

// ingresarProfe.js
function cargarFormularioRegistroAdmin() {
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
        const nombre = nombreInput.value.trim();
        const email = emailInput.value.trim();
        const password = passInput.value.trim();


        // Realizar la solicitud POST para registrar al profesor (ver backend)
<<<<<<< HEAD
        fetch('https://backend-app-asistencia-n58n.onrender.com/registrar-admin', {
=======
        fetch('http://localhost:3000/registrar-admin', {
>>>>>>> a68d10cbcc0001fb6b67c88d19af82a238dbfda5
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, correo: email, contrasena: password })

        })
        .then(response => response.json())
        .then(data => {
            alert(data.message); // Mostrar mensaje de éxito
            const DOM = document.querySelector('#root');
            DOM.innerHTML = "";
            DOM.appendChild(cargarHeaderAdmin());
            DOM.appendChild(cargarLoginAdmin());  // Volver al login (o al índice de la app)
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
        DOM.appendChild(cargarHeaderAdmin());
        DOM.appendChild(cargarLoginAdmin());
    });

    // Agregar el formulario de registro al DOM
    document.querySelector('#root').innerHTML = '';
    document.querySelector('#root').appendChild(registro);
}

export { cargarFormularioRegistroAdmin };
