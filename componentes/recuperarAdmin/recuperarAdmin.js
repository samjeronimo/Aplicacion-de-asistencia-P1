import { cargarLoginAdmin } from "../login/loginAdmin.js";
import { cargarHeaderAdmin } from "../header/headerAdmin.js";


function cargarRecuperarAdmin() {
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

    cuadro.appendChild(createInputField("Correo Electrónico", "email", "correo")); // Campo para el correo
    cuadro.appendChild(createInputField("Código de Recuperación", "text", "codigoRecuperacion")); // Campo para el código

    // Botón para enviar código
    const sendCodeBtn = document.createElement('button');
    sendCodeBtn.className = "btn-send-code";
    sendCodeBtn.textContent = "Enviar Código al Correo";
    cuadro.appendChild(sendCodeBtn);

    // Botón para recuperar contraseña
    const recoverPasswordBtn = document.createElement('button');
    recoverPasswordBtn.className = "btn-recover-password";
    recoverPasswordBtn.textContent = "Recuperar Contraseña";
    cuadro.appendChild(recoverPasswordBtn);

    // Botón para volver al login
    const backBtn = document.createElement('button');
    backBtn.className = "btn-back";
    backBtn.textContent = "Volver al Login";
    cuadro.appendChild(backBtn);

    // Event Listeners
    sendCodeBtn.addEventListener('click', async () => {
        const correo = document.getElementById('correo').value.trim(); // Obtener el correo ingresado
        if (!correo) {
            alert("Por favor ingrese su correo electrónico.");
            return;
        }

        try {
            // Simulación de envío de código al correo
            await fetch("http://localhost:3000/send-code", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ correo })
            });
            alert(`Se ha enviado un código de recuperación al correo: ${correo}`);
        } catch (error) {
            console.error("Error al enviar el código:", error);
            alert("Error al enviar el código de recuperación.");
        }
    });

    recoverPasswordBtn.addEventListener('click', async () => {
        const correo = document.getElementById('correo').value.trim();
        const codigo = document.getElementById('codigoRecuperacion').value.trim();
    
        if (!correo || !codigo) {
            alert("Por favor complete todos los campos.");
            return;
        }
    
        try {
            const response = await fetch("http://localhost:3000/verificar-codigo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ correo, codigoIngresado: codigo })
            });
    
            const data = await response.json();
            if (response.ok) {
                alert("Revisa tu correo: se ha enviado tu contraseña.");
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("Error al verificar el código.");
        }
    });

    backBtn.addEventListener('click', () => {
        const DOM = document.querySelector('#root'); // Seleccionar el contenedor principal
        DOM.innerHTML = ""; // Limpiar el DOM
        DOM.appendChild(cargarHeaderAdmin());
        DOM.appendChild(cargarLoginAdmin()); // Cargar la vista de login
    });

    return recoveryContainer;
}

export { cargarRecuperarAdmin };