import { cargarGradosAdmin } from "../gradosAdmin/gradosAdmin.js";

function cargarProfesores() {

    let profesores = document.createElement('div');
    profesores.className = 'profesores';

    let mainContainer = document.createElement('div');
    mainContainer.className = "main-container";
    profesores.appendChild(mainContainer);

    // Header container
    let header = document.createElement('header');
    header.className = "app-header";
    mainContainer.appendChild(header);
    
    // Logo and title container
    let logoTitleContainer = document.createElement('div');
    logoTitleContainer.className = "logo-title-container";
    header.appendChild(logoTitleContainer);
    
    // Logo
    let logoImg = document.createElement('img');
    logoImg.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq-IciWxLW5lsM2Oco4VluWyfOBSmgukVu6w&s"; 
    logoImg.className = "app-logo";
    logoImg.alt = "Logo Grados SCL";
    logoTitleContainer.appendChild(logoImg);
    
    // Title and date container
    let titleDateContainer = document.createElement('div');
    titleDateContainer.className = "title-date-container";
    logoTitleContainer.appendChild(titleDateContainer);
    
    // App title
    let appTitle = document.createElement('h1');
    appTitle.className = "app-title";
    appTitle.textContent = "Profesores SCL";
    titleDateContainer.appendChild(appTitle);
    
    // Current date container
    let dateContainer = document.createElement('div');
    dateContainer.className = "date-container";
    titleDateContainer.appendChild(dateContainer);
    
    // Calendar input with better styling
    let datePickerContainer = document.createElement('div');
    datePickerContainer.className = "date-picker-container";
    dateContainer.appendChild(datePickerContainer);
    
    let datePicker = document.createElement('input');
    datePicker.type = "date";
    datePicker.className = "date-picker";
    datePicker.id = "fecha-actual";
    datePickerContainer.appendChild(datePicker);
    
    // Set current date as default
    const today = new Date();
    const formattedDate = today.toISOString().substr(0, 10);
    datePicker.value = formattedDate;
    
    // Custom date display
    let customDateDisplay = document.createElement('div');
    customDateDisplay.className = "custom-date-display";
    customDateDisplay.textContent = today.toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    datePickerContainer.appendChild(customDateDisplay);

    let logoutButton = document.createElement('button');
    logoutButton.textContent = "Volver a grados";
    logoutButton.className = "logout-button";
    logoutButton.addEventListener('click', () => {
        const DOM = document.querySelector('#root');
        DOM.innerHTML = ''; // Limpiar contenedor
        DOM.appendChild(cargarGradosAdmin());
    });

    header.appendChild(logoutButton);

    const btnAgregarHeader = document.createElement('button');
    btnAgregarHeader.className = 'btn-agregar-profe';
    btnAgregarHeader.textContent = 'Agregar Profesor';
    btnAgregarHeader.addEventListener('click', () => {

        if (document.querySelector('.modal-overlay')) return;
    
        // Fondo oscuro
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
    
        // Cuadro modal
        const modal = document.createElement('div');
        modal.className = 'modal-form';
    
        const form = document.createElement('form');
        form.classList.add('form-agregar-alumno');
    
        const campos = [
            { name: 'nombre', placeholder: 'Nombre', type: 'text' },
            { name: 'password', placeholder: 'Contraseña', type: 'text' },
            { name: 'correo', placeholder: 'Correo institucional', type: 'email' }
        ];
    
        campos.forEach(({ name, placeholder, type }) => {
            const input = document.createElement('input');
            input.name = name;
            input.placeholder = placeholder;
            input.type = type;
            input.required = true;
            form.appendChild(input);
        });
    
        const btnGuardar = document.createElement('button');
        btnGuardar.type = 'submit';
        btnGuardar.textContent = 'Guardar';
        btnGuardar.classList.add('btn-guardar');
        form.appendChild(btnGuardar);

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
        
            const nombre = form.nombre.value.trim();
            const correo = form.correo.value.trim();
            const password = form.password.value.trim();
        
            if (!nombre || !correo || !password) {
                alert('Por favor, completa todos los campos.');
                return;
            }
        
            try {
                const res = await fetch('https://backend-app-asistencia-n58n.onrender.com/appi/crear-profesor', {

                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre, correo, password })
                });
        
                const data = await res.json();
        
                if (res.ok) {
                    alert('Profesor agregado correctamente.');
                    overlay.remove();
                    location.reload(); // recargar para ver nuevo profesor
                } else {
                    alert(data.message || 'Error al agregar profesor.');
                }
        
            } catch (error) {
                console.error('Error:', error);
                alert('Error de conexión con el servidor.');
            }
        });
        
    
        const btnCerrar = document.createElement('button');
        btnCerrar.type = 'button';
        btnCerrar.textContent = 'Cancelar';
        btnCerrar.classList.add('btn-cancelar');
        btnCerrar.addEventListener('click', () => overlay.remove());
    
        form.appendChild(btnCerrar);
        modal.appendChild(form);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);

    });

    header.appendChild(btnAgregarHeader);


    // Contenedor para la lista de profesores
    let listaProfesores = document.createElement('div');
    listaProfesores.className = 'lista-profesores';
    mainContainer.appendChild(listaProfesores);


    // Obtener los profesores del backend
    fetch('https://backend-app-asistencia-n58n.onrender.com/api/profesores')
        .then(res => res.json())
        .then(data => {
            if (data.length === 0) {
                listaProfesores.textContent = 'No hay profesores registrados.';
                return;
            }

            data.forEach(profe => {
                const { id_profesor, nombre, email } = profe;
            
                const profesorCard = document.createElement('div');
                profesorCard.classList.add('profesor-card');
            
                const inicial = document.createElement('div');
                inicial.classList.add('profesor-icon');
                inicial.textContent = nombre.charAt(0).toUpperCase();
            
                const info = document.createElement('div');
                info.classList.add('profesor-info');
            
                const nombreElem = document.createElement('h3');
                nombreElem.textContent = nombre;
            
                const emailElem = document.createElement('p');
                emailElem.textContent = `Email: ${email}`;
            
                info.appendChild(nombreElem);
                info.appendChild(emailElem);
            
                const eliminarBtn = document.createElement('button');
                eliminarBtn.textContent = 'Eliminar';
                eliminarBtn.className = 'btn-eliminar';
            
                const correoAdmin = localStorage.getItem('correoAdmin'); // Obtener el correo guardado
                console.log(localStorage.getItem('correoAdmin'));


                eliminarBtn.addEventListener('click', () => {
                    const password = prompt(`Para confirmar la eliminación del profesor ${nombre}, ingresa tu contraseña:`);
                
                    if (!password) {
                        alert('No ingresaste la contraseña.');
                        return;
                    }
                
                    if (!correoAdmin) {
                        alert('No se encontró usuario logueado.');
                        return;
                    }
                
                    fetch('https://backend-app-asistencia-n58n.onrender.com/api/validar-password', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ correo: correoAdmin, contrasena: password })
                    })
                    .then(res => res.json())
                    .then(data => {
                        if (data.valid) {
                            // Contraseña correcta, proceder a eliminar profesor
                            fetch(`https://backend-app-asistencia-n58n.onrender.com/profesores/${id_profesor}`, { method: 'DELETE' })

                            .then(res => {
                                if (res.ok) {
                                    profesorCard.remove();
                                    alert('Profesor eliminado correctamente.');
                                } else {
                                    alert('Error al eliminar el profesor.');
                                }
                            })
                            .catch(err => {
                                console.error('Error al eliminar:', err);
                                alert('Error de conexión al eliminar.');
                            });
                        } else {
                            alert(data.message || 'Contraseña incorrecta.');
                        }
                    })
                    .catch(err => {
                        console.error('Error al validar contraseña:', err);
                        alert('Error al validar la contraseña.');
                    });
                });

            
                const infoGroup = document.createElement('div');
                infoGroup.className = 'profesor-info-group';
                infoGroup.appendChild(inicial);
                infoGroup.appendChild(info);

                profesorCard.appendChild(infoGroup); // izquierda
                profesorCard.appendChild(eliminarBtn); // derecha

            
                listaProfesores.appendChild(profesorCard);
            });
            
                      
        })
        .catch(err => {
            console.error('Error al cargar profesores:', err);
            listaProfesores.textContent = 'Error al cargar los profesores.';
        });

    

    return profesores;

}


export { cargarProfesores }