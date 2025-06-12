import { cargarLogin } from "../login/login.js";
import { cargarHeader } from "../header/header.js";

function cargarRecuperar() {
    const recoveryContainer = document.createElement('div');
    recoveryContainer.className = "div-recovery";

    const cuadro = document.createElement('div');
    cuadro.className = "cuadro-recovery";
    recoveryContainer.appendChild(cuadro);


    const title = document.createElement('h1');
    title.textContent = "Recuperar Contraseña";
    cuadro.appendChild(title);

    // Campos del formulario
    const createInputField = (labelText, inputType, inputId) => {
        const group = document.createElement('div');
        group.className = "input-group";

        const label = document.createElement('h2');
        label.textContent = labelText;
        label.className = "input-label";
        group.appendChild(label);

        const input = document.createElement('input');
        input.type = inputType;
        input.id = inputId;
        input.className = "input-field";
        group.appendChild(input);

        return group;
    };

    cuadro.appendChild(createInputField("Nombre", "text", "nombre"));
    cuadro.appendChild(createInputField("Apellido", "text", "apellido"));

    // Contenedor para el campo de "Nueva Contraseña" y el botón de visibilidad
    const passwordGroup = document.createElement('div');
    passwordGroup.className = "password-group";

    const nuevaPasswordInput = document.createElement('input');
    nuevaPasswordInput.type = "password";
    nuevaPasswordInput.id = "nuevaPassword";
    nuevaPasswordInput.className = "input-field";
    passwordGroup.appendChild(nuevaPasswordInput);

    const togglePasswordBtn = document.createElement('button');
    togglePasswordBtn.textContent = "👁️";
    togglePasswordBtn.className = "toggle-password-btn";
    passwordGroup.appendChild(togglePasswordBtn);

    togglePasswordBtn.addEventListener('click', () => {
        if (nuevaPasswordInput.type === "password") {
            nuevaPasswordInput.type = "text";
        } else {
            nuevaPasswordInput.type = "password";
        }
    });

    const passwordLabel = document.createElement('h2');
    passwordLabel.textContent = "Nueva Contraseña";
    passwordLabel.className = "input-label";
    cuadro.appendChild(passwordLabel);
    cuadro.appendChild(passwordGroup);

    cuadro.appendChild(createInputField("Código de Recuperación", "text", "codigoRecuperacion"));

    // Botón para enviar código
    const sendCodeBtn = document.createElement('button');
    sendCodeBtn.className = "btn-send-code";
    sendCodeBtn.textContent = "Enviar Código al Correo";
    cuadro.appendChild(sendCodeBtn);

    // Botones de acción
    const btnContainer = document.createElement('div');
    btnContainer.className = "btn-container";
    cuadro.appendChild(btnContainer);

    const submitBtn = document.createElement('button');
    submitBtn.className = "btn-submit";
    submitBtn.textContent = "Actualizar Contraseña";
    btnContainer.appendChild(submitBtn);

    const backBtn = document.createElement('button');
    backBtn.className = "btn-back";
    backBtn.textContent = "Volver al Login";
    btnContainer.appendChild(backBtn);

    // Event Listeners
    sendCodeBtn.addEventListener('click', () => {
        alert("Se ha enviado un código de recuperación a tu correo electrónico");
    });

    submitBtn.addEventListener('click', async () => {
        const nombre = document.getElementById('nombre').value.trim();
        const apellido = document.getElementById('apellido').value.trim();
        const nuevaPassword = document.getElementById('nuevaPassword').value.trim();
        const codigo = document.getElementById('codigoRecuperacion').value.trim();

        if (!nombre || !apellido || !nuevaPassword || !codigo) {
            alert("Por favor complete todos los campos");
            return;
        }

        // Aquí iría la lógica para validar el código y actualizar la contraseña
        try {
            // Simulación de petición al servidor
            alert("Contraseña actualizada correctamente");
            cargarLogin(); // Volver al login después de actualizar
        } catch (error) {
            console.error("Error al recuperar contraseña:", error);
            alert("Error al procesar la solicitud");
        }
    });

    backBtn.addEventListener('click', () => {
        const DOM = document.querySelector('#root'); // Seleccionar el contenedor principal
        DOM.innerHTML = ""; // Limpiar el DOM
        DOM.appendChild(cargarHeader());
        DOM.appendChild(cargarLogin()); // Cargar la vista de login
    });

    return recoveryContainer;
}

export { cargarRecuperar };