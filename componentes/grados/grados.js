import { mostrarAlumnosParaAsistencia } from "../asistencia/asistencia-alumnos.js";
import {   mostrarProyecciones } from "../proyecciones/proyecciones-grados.js";

<<<<<<< HEAD
const API_BASE = "https://backend-app-asistencia-n58n.onrender.com"; // usa la URL real de tu backend

// Función para verificar si un grado tiene asistencia registrada
function verificarAsistencia(idGrado, fecha) {
    return fetch(`${API_BASE}/verificar-asistencia/${idGrado}/${fecha}`)
=======
// Función para verificar si un grado tiene asistencia registrada
function verificarAsistencia(idGrado, fecha) {
    return fetch(`http://localhost:3000/verificar-asistencia/${idGrado}/${fecha}`)
>>>>>>> a68d10cbcc0001fb6b67c88d19af82a238dbfda5
        .then(response => response.json())
        .then(data => data.tieneAsistencia)
        .catch(() => false);
}

function cargarGrados() {
    let grados = document.createElement('div');
    grados.className = "grados-container";
    
    // Contenedor principal con imagen de fondo
    let mainContainer = document.createElement('div');
    mainContainer.className = "main-container";
    
    // Header container
    let header = document.createElement('header');
    header.className = "app-header";
    
    // Logo and title container
    let logoTitleContainer = document.createElement('div');
    logoTitleContainer.className = "logo-title-container";
    
    // Logo
    let logoImg = document.createElement('img');
    logoImg.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq-IciWxLW5lsM2Oco4VluWyfOBSmgukVu6w&s"; 
    logoImg.className = "app-logo";
    logoImg.alt = "Logo Grados SCL";
    
    // Title and date container
    let titleDateContainer = document.createElement('div');
    titleDateContainer.className = "title-date-container";
    
    // App title
    let appTitle = document.createElement('h1');
    appTitle.className = "app-title";
    appTitle.textContent = "Grados SCL";
    
    // Current date container
    let dateContainer = document.createElement('div');
    dateContainer.className = "date-container";
    
    // Calendar input with better styling
    let datePickerContainer = document.createElement('div');
    datePickerContainer.className = "date-picker-container";
    
    let datePicker = document.createElement('input');
    datePicker.type = "date";
    datePicker.className = "date-picker";
    datePicker.id = "fecha-actual";
    
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
    
    // Update displayed date when picker changes
    datePicker.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        customDateDisplay.textContent = selectedDate.toLocaleDateString('es-ES', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        
        // Recargar los grados con la nueva fecha
        cargarGrados();
    });
    
    // Build structure
    datePickerContainer.appendChild(datePicker);
    datePickerContainer.appendChild(customDateDisplay);
    dateContainer.appendChild(datePickerContainer);
    titleDateContainer.appendChild(appTitle);
    titleDateContainer.appendChild(dateContainer);
    logoTitleContainer.appendChild(logoImg);
    logoTitleContainer.appendChild(titleDateContainer);
    header.appendChild(logoTitleContainer);

    // Botón de cerrar sesión
    let logoutButton = document.createElement('button');
    logoutButton.textContent = "Cerrar sesión";
    logoutButton.className = "logout-button";
    logoutButton.addEventListener('click', () => {

        // Redirige al index (o login)
        window.location.href = "index.html";
    });

    header.appendChild(logoutButton);

    // Botón de proyecciones (después del botón de cerrar sesión)
    let proyeccionesButton = document.createElement('button');
    proyeccionesButton.textContent = "📊 Proyecciones";
    proyeccionesButton.className = "proyecciones-button";
    proyeccionesButton.addEventListener('click', mostrarProyecciones);
    
    header.appendChild(proyeccionesButton);

    
    // Main content
    let lista = document.createElement('div');
    lista.className = "div-lista";
    
    // Add elements to container
    mainContainer.appendChild(header);
    mainContainer.appendChild(lista);
    grados.appendChild(mainContainer);
    

    let gradoActivo = null; // Para manejar la visibilidad de los subgrados
    
        fetch(`${API_BASE}/grados`)
        .then(response => {
            if (!response.ok) throw new Error('Error al obtener grados');
            return response.json();
        })
        .then(data => {
<<<<<<< HEAD
            const grados = Array.isArray(data) ? data : data.grados;        
=======
            if (!Array.isArray(data)) throw new Error('Formato de datos incorrecto');
>>>>>>> a68d10cbcc0001fb6b67c88d19af82a238dbfda5

            const fechaSeleccionada = document.getElementById('fecha-actual').value;
            const lista = document.querySelector('.div-lista');
            lista.innerHTML = ''; // Limpiar lista existente

            // Procesar cada grado en paralelo
            const promesas = data.map(grado => {
                return verificarAsistencia(grado.id_grado, fechaSeleccionada)
                    .then(tieneAsistencia => {
                        // Crear elemento del grado
                        const gradoElement = document.createElement('div');
                        gradoElement.className = 'grado-item';

                        // Añadir clase si tiene asistencia
                        if (tieneAsistencia) {
                            gradoElement.classList.add('asistencia-registrada');
                        }

                        // Contenido del grado (tu código original)
                        const gradoContenido = document.createElement('div');
                        gradoContenido.className = 'grado-contenido';

                        const gradoNombre = document.createElement('p');
                        gradoNombre.textContent = grado.nombre;

                        const arrow = document.createElement('span');
                        arrow.className = 'arrow';

                        // Grados con subgrados (IDs 4,5,6,7)
                        if ([4, 5, 6, 7].includes(grado.id_grado)) {
                            arrow.textContent = '▶';
                            gradoElement.addEventListener('click', () => toggleSubgrados(grado, gradoElement, arrow));
                        } else {
                            // Grados sin subgrados
                            arrow.textContent = '•';
                            gradoElement.addEventListener('click', () => {
                                mostrarAlumnosParaAsistencia(grado.id_grado, grado.nombre);
                            });
                        }

                        gradoContenido.appendChild(gradoNombre);
                        gradoContenido.appendChild(arrow);
                        gradoElement.appendChild(gradoContenido);

                        return gradoElement;
                    });
            });

            // Agregar todos los grados al DOM cuando estén listos
            return Promise.all(promesas).then(elementos => {
                elementos.forEach(elemento => lista.appendChild(elemento));
            });
        })
        .catch(error => {
            console.error('Error:', error);
            document.querySelector('.div-lista').innerHTML = `
                <p class="error">Error al cargar los grados: ${error.message}</p>
            `;
        });

        return grados;
    }


    // Función para mostrar/ocultar subgrados
    function toggleSubgrados(grado, gradoElement, arrow) {
        const subLista = gradoElement.querySelector('.sub-lista');

        if (subLista) {
            subLista.remove();
            arrow.textContent = '▶';
            return;
        }

        // Cargar subgrados
<<<<<<< HEAD
        fetch(`${API_BASE}/grados-especificos/${grado.id_grado}`)
=======
        fetch(`http://localhost:3000/grados-especificos/${grado.id_grado}`)
>>>>>>> a68d10cbcc0001fb6b67c88d19af82a238dbfda5
            .then(response => response.json())
            .then(subgrados => {
                const container = document.createElement('div');
                container.className = 'sub-lista';

                const fechaSeleccionada = document.getElementById('fecha-actual').value;

                // Procesar cada subgrado
                subgrados.forEach(subgrado => {
                    verificarAsistencia(subgrado.id, fechaSeleccionada)
                        .then(tieneAsistencia => {
                            const btn = document.createElement('button');
                            btn.className = 'subgrado-btn';
                            btn.textContent = subgrado.nombre;

                            if (tieneAsistencia) {
                                btn.classList.add('subgrado-con-asistencia');
                            }

                            btn.onclick = (e) => {
                                e.stopPropagation();
                                mostrarAlumnosParaAsistencia(
                                    subgrado.id,
                                    `${grado.nombre} - ${subgrado.nombre}`
                                );
                            };

                            container.appendChild(btn);
                        });
                });

                gradoElement.appendChild(container);
                arrow.textContent = '▼';
            });
    }
    
    function cargarGradosEspecificos(idGrado, gradoElement) {
        console.log(`Cargando subgrados para grado ID: ${idGrado}`);
    
        fetch(`${API_BASE}/grados-especificos/${idGrado}`)
        .then(response => {
            if (!response.ok) {
                // Si no hay subgrados, mostrar mensaje apropiado
                const subLista = document.createElement('div');
                subLista.className = 'sub-lista';
                subLista.textContent = 'No hay secciones disponibles';
                gradoElement.appendChild(subLista);
                gradoElement.querySelector('.arrow').textContent = '▶';
                return;
            }
            return response.json();
        })
        .then(subgrados => {
            if (!subgrados) return; // Si no hay subgrados, ya manejamos el caso
            
            console.log("Subgrados recibidos:", subgrados);
            
            // Limpiar sublista anterior si existe
            const subListaExistente = gradoElement.querySelector('.sub-lista');
            if (subListaExistente) subListaExistente.remove();
    
            // Crear nueva sublista
            const subLista = document.createElement('div');
            subLista.className = 'sub-lista';
    
            if (subgrados.length === 0) {
                subLista.textContent = 'No hay secciones disponibles';
            } else {
                subgrados.forEach(subgrado => {
                    const btn = document.createElement('button');
                    btn.className = 'subgrado-btn';
                    btn.textContent = subgrado.nombre;
                    btn.onclick = (e) => {
                        e.stopPropagation();
                        mostrarAlumnosParaAsistencia(
                            subgrado.id,
                            `${gradoElement.querySelector('p').textContent} - ${subgrado.nombre}`
                        );
                    };
                    subLista.appendChild(btn);
                });
            }
    
            gradoElement.appendChild(subLista);
        })
        .catch(error => {
            console.error('Error:', error);
            const errorMsg = document.createElement('div');
            errorMsg.className = 'error-msg';
            errorMsg.textContent = `Error: ${error.message}`;
            gradoElement.appendChild(errorMsg);
            
            setTimeout(() => errorMsg.remove(), 5000);
        });
    }





export {cargarGrados}