import { cargarGradosAdmin } from "../gradosAdmin/gradosAdmin.js";
import { cargarFormularioRegistroAdmin } from "../ingresar/ingresarAdmin.js";
import { cargarRecuperarAdmin } from "../recuperarAdmin/recuperarAdmin.js";

function cargarLoginAdmin() {

    let login = document.createElement('div');
    login.className = "div-login";

    let img_fondo = document.createElement('img');
    img_fondo.src = "https://img.freepik.com/vector-premium/escuela-patrones-fisuras_48369-6811.jpg";
    login.appendChild(img_fondo);

    let cuaadro = document.createElement('div');
    cuaadro.className = "cuadro-login";
    login.appendChild(cuaadro);
    
    let person_login = document.createElement('img');
    person_login.src = "https://cengage.my.site.com/resource/1607465003000/loginIcon";
    person_login.className = "logo";
    cuaadro.appendChild(person_login);

    let wolcome = document.createElement('h1');
    wolcome.textContent = "¡Welcome to login!";
    cuaadro.appendChild(wolcome);

    let user = document.createElement('h2');
    user.textContent = "Email";
    user.className = "correo";
    cuaadro.appendChild(user);

    let usuario = document.createElement('input');
    usuario.type = "email";
    usuario.className = "div-user";
    cuaadro.appendChild(usuario);

    let pass = document.createElement('h2');
    pass.textContent = "password"
    pass.className = "pass"
    cuaadro.appendChild(pass);

    let password = document.createElement('input');
    password.type = "password";
    password.className = "div-pass"
    cuaadro.appendChild(password);

    let btn_cuadro = document.createElement('div');
    btn_cuadro.className = "btn-cuadro";
    cuaadro.appendChild(btn_cuadro);

    let btn_registrar = document.createElement('button');
    btn_registrar.className = "btn-registrar";
    btn_registrar.textContent = "Registrar"
    btn_cuadro.appendChild(btn_registrar);

    let btn_ingresar = document.createElement('button');
    btn_ingresar.className = "btn-ingresar";
    btn_ingresar.textContent = "Ingresar"
    btn_cuadro.appendChild(btn_ingresar);

    let btn_recuperar = document.createElement('button');
    btn_recuperar.className = "btn-recuperar";
    btn_recuperar.textContent = "Recuperar Contraseña"
    btn_cuadro.appendChild(btn_recuperar);

    btn_ingresar.addEventListener("click", async () => {
        const correo = usuario.value.trim();
        const contrasena = password.value.trim();
    
        if (!correo || !contrasena) {
            alert("Por favor, complete todos los campos.");
            return;
        }
    
        try {
            const response = await fetch("http://localhost:3000/login-admin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ correo, contrasena })
            });
    
            const data = await response.json();
    
            if (response.ok) {
                localStorage.setItem('correoAdmin', correo);
                const DOM = document.querySelector('#root');
                DOM.innerHTML = "";
                DOM.appendChild(cargarGradosAdmin());  
            } else {
                alert(data.message);  // Mostrar mensaje de error
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            alert("Error en el servidor.");
        }
    });
    
    

    let togglePasswordBtn = document.createElement('button');
    togglePasswordBtn.textContent = "👁️";
    togglePasswordBtn.className = "toggle-password-btn";
    cuaadro.appendChild(togglePasswordBtn);

    togglePasswordBtn.addEventListener('click', () => {
        
        if (password.type === "password") {
            password.type = "text";
        } else {
            password.type = "password";
        }

    });


    // Evento de registro
    btn_registrar.addEventListener('click', () => {
        cargarFormularioRegistroAdmin();  // Llama a la función para cargar el formulario de registro
    });

    // Evento de recuperar contraseña
    btn_recuperar.addEventListener('click', () => {
        const DOM = document.querySelector('#root');
        DOM.innerHTML = ""; // Limpiar el DOM
        DOM.appendChild(cargarRecuperarAdmin()); // Llama a la función para cargar la vista de recuperación
    });

    return login;

}

export { cargarLoginAdmin }