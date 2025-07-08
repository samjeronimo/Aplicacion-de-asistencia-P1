import { cargarGradosAdmin } from "../gradosAdmin/gradosAdmin.js";

export function mostrarProyeccionesAdmin() {
    const lista = document.querySelector('#root');
    lista.innerHTML = ''; // Limpiar contenedor

    // Contenedor principal con imagen de fondo
    let mainContainer = document.createElement('div');
    mainContainer.className = "main-container";
    lista.appendChild(mainContainer);
    
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
    appTitle.textContent = "Proyecciones SCL";
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

    // Botones para las proyecciones
    let buttonsContainer = document.createElement('div');
    buttonsContainer.className = "buttons-container";
    mainContainer.appendChild(buttonsContainer);

    // Botón: Proyección de asistencia de todos los grados
    let btnGrados = document.createElement('button');
    btnGrados.textContent = "Proyección de asistencia de todos los grados";
    btnGrados.className = "projection-button";
    btnGrados.addEventListener('click', () => {
        mostrarGraficaGrados();
    });
    buttonsContainer.appendChild(btnGrados);

    // Botón: Proyección de todos los alumnos de un grado
    let btnAlumnosGrado = document.createElement('button');
    btnAlumnosGrado.textContent = "Proyección de todos los alumnos de un grado";
    btnAlumnosGrado.className = "projection-button";
    btnAlumnosGrado.addEventListener('click', () => {
        mostrarGraficaAlumnosGrado();
    });
    buttonsContainer.appendChild(btnAlumnosGrado);

    // Botón: Proyección de asistencia de cada alumno
    let btnAsistenciaAlumno = document.createElement('button');
    btnAsistenciaAlumno.textContent = "Proyección de asistencia de cada alumno";
    btnAsistenciaAlumno.className = "projection-button";
    btnAsistenciaAlumno.addEventListener('click', () => {
        mostrarGraficaAsistenciaAlumno();
    });
    buttonsContainer.appendChild(btnAsistenciaAlumno);
    

    return lista;
}

// Funciones para manejar las proyecciones
function mostrarGraficaGrados() {
<<<<<<< HEAD
    fetch('https://backend-app-asistencia-n58n.onrender.com/asistencia/grados')
=======
    fetch('http://localhost:3000/asistencia/grados')
>>>>>>> a68d10cbcc0001fb6b67c88d19af82a238dbfda5
        .then(res => {
            if (!res.ok) throw new Error(`Error HTTP! estado: ${res.status}`);
            return res.json();
        })
        .then(data => {
            
            if (!Array.isArray(data)) {
                console.error('Los datos no son un array:', data);
                return;
            }

            // Crear modal y gráfica
            let existingModal = document.getElementById('grafica-modal');
            if (existingModal) existingModal.remove();

            const overlay = document.createElement('div');
            overlay.id = 'grafica-modal';
            overlay.className = 'modal-overlay';

            const modalContent = document.createElement('div');
            modalContent.className = 'modal-content';

            const closeBtn = document.createElement('span');
            closeBtn.textContent = '×';
            closeBtn.className = 'close-button';
            closeBtn.onclick = () => overlay.remove();

            const canvas = document.createElement('canvas');
            canvas.id = 'graficaGrados';
            canvas.style.maxWidth = '100%';

            modalContent.appendChild(closeBtn);
            modalContent.appendChild(canvas);
            overlay.appendChild(modalContent);
            document.body.appendChild(overlay);


            // Configurar gráfica
            const ctx = canvas.getContext('2d');
            const labels = data.map(d => d.grado);
            const presentes = data.map(d => d.Presente);
            const tardes = data.map(d => d.Tardanza);
            const ausentes = data.map(d => d.Ausente);

            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels,
                    datasets: [
                        { 
                            label: 'Presente', 
                            data: presentes, 
                            backgroundColor: 'rgba(75, 192, 192, 0.7)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        },
                        { 
                            label: 'Tardanza', 
                            data: tardes, 
                            backgroundColor: 'rgba(255, 206, 86, 0.7)',
                            borderColor: 'rgba(255, 206, 86, 1)',
                            borderWidth: 1
                        },
                        { 
                            label: 'Ausente', 
                            data: ausentes, 
                            backgroundColor: 'rgba(255, 99, 132, 0.7)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                precision: 0,
                                stepSize: 1
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Asistencia por Grado',
                            font: {
                                size: 16
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.dataset.label}: ${context.raw}`;
                                }
                            }
                        }
                    }
                }
            });
        })
        .catch(err => {
            console.error('Error:', err);
            alert('Error al cargar los datos de asistencia. Por favor, inténtalo de nuevo.');
        });
}

//--------------------------------------------------------------------------------------------------------

function mostrarGraficaAlumnosGrado() {
    // Mostrar loader
    const loader = mostrarLoader();
    
<<<<<<< HEAD
    fetch('https://backend-app-asistencia-n58n.onrender.com/grados/lista')
=======
    fetch('http://localhost:3000/grados/lista')
>>>>>>> a68d10cbcc0001fb6b67c88d19af82a238dbfda5
        .then(async (res) => {
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Error ${res.status}: ${errorText}`);
            }
            const contentType = res.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await res.text();
                throw new Error(`Respuesta inesperada: ${text.substring(0, 100)}...`);
            }
            
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error || 'Error en la solicitud');
            }
            
            return res.json();
        })
        .then(grados => {
            ocultarLoader(loader);
            
            if (!Array.isArray(grados)) {
                throw new Error('La respuesta no es un array válido');
            }
            
            if (grados.length === 0) {
                throw new Error('No se encontraron grados disponibles');
            }
            
            // Crear modal para selección de grado
            const overlay = document.createElement('div');
            overlay.className = 'modal-overlay2';
            
            const modal = document.createElement('div');
            modal.className = 'modal-content2';
            
            const select = document.createElement('select');
            select.className = 'grado-select2';
            
            // Llenar select con grados
            grados.forEach(grado => {
                const option = document.createElement('option');
                option.value = grado.id_grado;
                option.textContent = grado.nombre;
                select.appendChild(option);
            });
            
            const button = document.createElement('button');
            button.textContent = 'Continuar';
            button.className = "modal-btn-continuar2";
            button.onclick = () => {
                const idGrado = select.value;
                const nombreGrado = select.options[select.selectedIndex].text;
                overlay.remove();
                cargarSubgrados(idGrado, nombreGrado);
            };
            
            modal.appendChild(select);
            modal.appendChild(button);
            overlay.appendChild(modal);
            document.body.appendChild(overlay);
        })
        .catch(err => {
            ocultarLoader(loader);
            console.error('Error completo:', err);
            mostrarError('Error al cargar grados', 
                `No se pudo cargar la lista de grados. Verifica que el servidor esté funcionando. 
                Detalles: ${err.message}`);
        });
}

function cargarSubgrados(idGrado, nombreGrado) {
    const loader = mostrarLoader();
    
<<<<<<< HEAD
    fetch(`https://backend-app-asistencia-n58n.onrender.com/grados-especificos/lista/${idGrado}`)
=======
    fetch(`http://localhost:3000/grados-especificos/lista/${idGrado}`)
>>>>>>> a68d10cbcc0001fb6b67c88d19af82a238dbfda5
        .then(async (res) => {
            // NUEVO: Primero verificar el estado de la respuesta
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Error ${res.status}: ${errorText}`);
            }
            
            // NUEVO: Verificar el tipo de contenido
            const contentType = res.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('La respuesta no es JSON válido');
            }
            
            return res.json();
        })
        .then(subgrados => {
            ocultarLoader(loader);
            
            // Validación de datos recibidos - NUEVO
            if (!Array.isArray(subgrados)) {
                throw new Error('La respuesta no es un array válido');
            }
            
            // Crear modal para selección de subgrado
            const overlay = document.createElement('div');
            overlay.className = 'modal-overlay3';
            
            const modal = document.createElement('div');
            modal.className = 'modal-content3';
            
            const select = document.createElement('select');
            select.className = 'subgrado-select3';
            
            // Opción para todos los alumnos
            const optionTodos = document.createElement('option');
            optionTodos.value = 'todos';
            optionTodos.textContent = `Todos los alumnos de ${nombreGrado}`;
            select.appendChild(optionTodos);
            
            // Llenar select con subgrados
            subgrados.forEach(subgrado => {
                const option = document.createElement('option');
                option.value = subgrado.id;
                option.textContent = subgrado.nombre;
                select.appendChild(option);
            });
            
            const button = document.createElement('button');
            button.textContent = 'Generar Gráfica';
            button.onclick = () => {
                const idSubgrado = select.value;
                const nombreSubgrado = select.options[select.selectedIndex].text;
                overlay.remove();
                
                const loaderGrafica = mostrarLoader(); // NUEVO: Mostrar loader al cargar gráfica
                
                if (idSubgrado === 'todos') {
                    // Cargar todos los alumnos del grado - NUEVO: manejo mejorado de errores
<<<<<<< HEAD
                    fetch(`https://backend-app-asistencia-n58n.onrender.com/asistencia/alumnos/${idGrado}`)
=======
                    fetch(`http://localhost:3000/asistencia/alumnos/${idGrado}`)
>>>>>>> a68d10cbcc0001fb6b67c88d19af82a238dbfda5
                        .then(async (res) => {
                            if (!res.ok) {
                                const errorText = await res.text();
                                throw new Error(`Error ${res.status}: ${errorText}`);
                            }
                            const contentType = res.headers.get('content-type');
                            if (!contentType || !contentType.includes('application/json')) {
                                throw new Error('La respuesta no es JSON válido');
                            }
                            return res.json();
                        })
                        .then(data => {
                            ocultarLoader(loaderGrafica);
                            mostrarGraficaConDatos(data, nombreGrado);
                        })
                        .catch(err => {
                            ocultarLoader(loaderGrafica);
                            mostrarError('Error al cargar alumnos', err.message);
                        });
                } else {
                    // Cargar alumnos del subgrado específico - NUEVO: manejo mejorado de errores
<<<<<<< HEAD
                    fetch(`https://backend-app-asistencia-n58n.onrender.com/asistencia/alumnos-subgrado/${idSubgrado}`)
=======
                    fetch(`http://localhost:3000/asistencia/alumnos-subgrado/${idSubgrado}`)
>>>>>>> a68d10cbcc0001fb6b67c88d19af82a238dbfda5
                        .then(async (res) => {
                            if (!res.ok) {
                                const errorText = await res.text();
                                throw new Error(`Error ${res.status}: ${errorText}`);
                            }
                            const contentType = res.headers.get('content-type');
                            if (!contentType || !contentType.includes('application/json')) {
                                throw new Error('La respuesta no es JSON válido');
                            }
                            return res.json();
                        })
                        .then(data => {
                            ocultarLoader(loaderGrafica);
                            mostrarGraficaConDatos(data, nombreSubgrado);
                        })
                        .catch(err => {
                            ocultarLoader(loaderGrafica);
                            mostrarError('Error al cargar alumnos', err.message);
                        });
                }
            };
            
            modal.appendChild(select);
            modal.appendChild(button);
            overlay.appendChild(modal);
            document.body.appendChild(overlay);
        })
        .catch(err => {
            ocultarLoader(loader);
            console.error('Error al cargar subgrados:', err); // NUEVO: log más detallado
            mostrarError('Error al cargar subgrados', 
                `No se pudieron cargar los subgrados. Verifica la conexión. 
                Detalles: ${err.message}`);
        });
}

// Función para mostrar loader
function mostrarLoader() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
        <div class="spinner"></div>
        <p>Cargando datos...</p>
    `;
    document.body.appendChild(loader);
    return loader;
}

// Función para ocultar loader
function ocultarLoader(loader) {
    if (loader && loader.parentNode) {
        loader.parentNode.removeChild(loader);
    }
}

// Función para mostrar errores
function mostrarError(titulo, mensaje) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <h3>${titulo}</h3>
        <p>${mensaje}</p>
        <button onclick="location.reload()">Reintentar</button>
    `;
    document.body.appendChild(errorDiv);
}

function mostrarGraficaConDatos(data, titulo) {
    if (!data || !Array.isArray(data)) {
        console.error('Datos no válidos:', data);
        mostrarError('Error en los datos', 'La información recibida no es válida');
        return;
    }

    if (data.length === 0) {
        mostrarError('Sin datos', 'No hay registros de asistencia para mostrar');
        return;
    }

    // Crear modal para la gráfica
    let existingModal = document.getElementById('modal-grafica-alumnos');
    if (existingModal) existingModal.remove();

    const overlayAlumnos = document.createElement('div');
    overlayAlumnos.id = 'modal-grafica-alumnos';
    overlayAlumnos.className = 'modal-overlay-alumnos';

    const modalContentAlumnos = document.createElement('div');
    modalContentAlumnos.className = 'modal-content-alumnos';
    modalContentAlumnos.style.width = '90vw';
    modalContentAlumnos.style.maxWidth = '1200px';
    modalContentAlumnos.style.height = `${Math.max(400, data.length * 30)}px`;
    modalContentAlumnos.style.maxHeight = '90vh';
    modalContentAlumnos.style.overflow = 'auto';

    const closeBtnAlumnos = document.createElement('span');
    closeBtnAlumnos.textContent = '×';
    closeBtnAlumnos.className = 'close-button-alumnos';
    closeBtnAlumnos.onclick = () => overlayAlumnos.remove();

    // Título que muestra el grado específico
    const titleAlumnos = document.createElement('h2');
    titleAlumnos.textContent = `Asistencia: ${titulo}`;
    titleAlumnos.style.textAlign = 'center';
    titleAlumnos.style.marginBottom = '20px';

    const canvasContainer = document.createElement('div');
    canvasContainer.style.position = 'relative';
    canvasContainer.style.height = `${Math.max(400, data.length * 30)}px`;
    canvasContainer.style.width = '100%';

    const canvasAlumnos = document.createElement('canvas');
    canvasAlumnos.id = 'canvas-grafica-alumnos';
    canvasAlumnos.className = 'canvas-alumnos2';
    canvasAlumnos.style.width = '100%';
    canvasAlumnos.style.height = '100%';

    canvasContainer.appendChild(canvasAlumnos);
    
    modalContentAlumnos.appendChild(closeBtnAlumnos);
    modalContentAlumnos.appendChild(titleAlumnos);
    modalContentAlumnos.appendChild(canvasContainer);
    overlayAlumnos.appendChild(modalContentAlumnos);
    document.body.appendChild(overlayAlumnos);

    // Configurar gráfica
    const ctxAlumnos = canvasAlumnos.getContext('2d');
    const labelsAlumnos = data.map(d => d.nombre_completo);
    const presentesAlumnos = data.map(d => d.Presente);
    const tardesAlumnos = data.map(d => d.Tardanza);
    const ausentesAlumnos = data.map(d => d.Ausente);

    new Chart(ctxAlumnos, {
        type: 'bar',
        data: {
            labels: labelsAlumnos,
            datasets: [
                { 
                    label: 'Presente', 
                    data: presentesAlumnos,
                    backgroundColor: 'rgba(75, 192, 192, 0.7)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                { 
                    label: 'Tardanza', 
                    data: tardesAlumnos,
                    backgroundColor: 'rgba(255, 206, 86, 0.7)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 1
                },
                { 
                    label: 'Ausente', 
                    data: ausentesAlumnos,
                    backgroundColor: 'rgba(255, 99, 132, 0.7)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
                x: {
                    stacked: true,
                    beginAtZero: true,
                    ticks: {
                        precision: 0,
                        stepSize: 1
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        autoSkip: false,
                        font: {
                            size: 12
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: `Asistencia: ${titulo}`,
                    font: {
                        size: 16
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const alumno = data[context.dataIndex];
                            const subgradoInfo = alumno.nombre_grado_especifico 
                                ? `\nGrado: ${alumno.nombre_grado_especifico}`
                                : '';
                            return `${context.dataset.label}: ${context.raw}${subgradoInfo}`;
                        }
                    }
                }
            },
            barThickness: data.length > 20 ? 'flex' : 20,
            maxBarThickness: 40
        }
    });
}

//--------------------------------------------------------------------------------------------------------

function mostrarGraficaAsistenciaAlumno() {
    const loader = mostrarLoader();
    
<<<<<<< HEAD
    fetch('https://backend-app-asistencia-n58n.onrender.com/grados/lista')
=======
    fetch('http://localhost:3000/grados/lista')
>>>>>>> a68d10cbcc0001fb6b67c88d19af82a238dbfda5
        .then(async (res) => {
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Error ${res.status}: ${errorText}`);
            }
            const contentType = res.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await res.text();
                throw new Error(`Respuesta inesperada: ${text.substring(0, 100)}...`);
            }
            
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error || 'Error en la solicitud');
            }
            
            return res.json();
        })
        .then(grados => {
            ocultarLoader(loader);
            
            if (!Array.isArray(grados)) {
                throw new Error('La respuesta no es un array válido');
            }
            
            if (grados.length === 0) {
                throw new Error('No se encontraron grados disponibles');
            }
            
            // Crear modal para selección de grado
            const overlay = document.createElement('div');
            overlay.className = 'modal-overlay-alumno';
            
            const modal = document.createElement('div');
            modal.className = 'modal-content-alumno';
            
            // Título del modal
            const titulo = document.createElement('h2');
            titulo.textContent = 'Seleccione el grado del alumno';
            titulo.style.textAlign = 'center';
            titulo.style.marginBottom = '20px';
            modal.appendChild(titulo);
            
            const select = document.createElement('select');
            select.className = 'grado-select-alumno';
            
            // Opción por defecto
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = '-- Seleccione un grado --';
            defaultOption.disabled = true;
            defaultOption.selected = true;
            select.appendChild(defaultOption);
            
            // Llenar select con grados
            grados.forEach(grado => {
                const option = document.createElement('option');
                option.value = grado.id_grado;
                option.textContent = grado.nombre;
                select.appendChild(option);
            });
            
            const button = document.createElement('button');
            button.textContent = 'Continuar';
            button.className = "modal-btn-continuar-alumno";
            button.onclick = () => {
                const idGrado = select.value;
                if (!idGrado) {
                    alert('Por favor seleccione un grado');
                    return;
                }
                const nombreGrado = select.options[select.selectedIndex].text;
                overlay.remove();
                cargarSubgradosParaAlumno(idGrado, nombreGrado);
            };
            
            modal.appendChild(select);
            modal.appendChild(button);
            overlay.appendChild(modal);
            document.body.appendChild(overlay);
        })
        .catch(err => {
            ocultarLoader(loader);
            console.error('Error completo:', err);
            mostrarError('Error al cargar grados', 
                `No se pudo cargar la lista de grados. Verifica que el servidor esté funcionando. 
                Detalles: ${err.message}`);
        });
}

function cargarSubgradosParaAlumno(idGrado, nombreGrado) {
    const loader = mostrarLoader();
    
<<<<<<< HEAD
    fetch(`https://backend-app-asistencia-n58n.onrender.com/grados-especificos/lista/${idGrado}`)
=======
    fetch(`http://localhost:3000/grados-especificos/lista/${idGrado}`)
>>>>>>> a68d10cbcc0001fb6b67c88d19af82a238dbfda5
        .then(async (res) => {
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Error ${res.status}: ${errorText}`);
            }
            
            const contentType = res.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('La respuesta no es JSON válido');
            }
            
            return res.json();
        })
        .then(subgrados => {
            ocultarLoader(loader);
            
            if (!Array.isArray(subgrados)) {
                throw new Error('La respuesta no es un array válido');
            }
            
            // Crear modal para selección de subgrado
            const overlay = document.createElement('div');
            overlay.className = 'modal-overlay-subgrado-alumno';
            
            const modal = document.createElement('div');
            modal.className = 'modal-content-subgrado-alumno';
            
            // Título del modal
            const titulo = document.createElement('h2');
            titulo.textContent = `Seleccione el subgrado de ${nombreGrado}`;
            titulo.style.textAlign = 'center';
            titulo.style.marginBottom = '20px';
            modal.appendChild(titulo);
            
            const select = document.createElement('select');
            select.className = 'subgrado-select-alumno';
            
            // Opción por defecto
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = '-- Seleccione un subgrado --';
            defaultOption.disabled = true;
            defaultOption.selected = true;
            select.appendChild(defaultOption);
            
            // Llenar select con subgrados
            subgrados.forEach(subgrado => {
                const option = document.createElement('option');
                option.value = subgrado.id;
                option.textContent = subgrado.nombre;
                select.appendChild(option);
            });
            
            const button = document.createElement('button');
            button.textContent = 'Buscar Alumno';
            button.className = "modal-btn-buscar-alumno";
            button.onclick = () => {
                const idSubgrado = select.value;
                if (!idSubgrado) {
                    alert('Por favor seleccione un subgrado');
                    return;
                }
                const nombreSubgrado = select.options[select.selectedIndex].text;
                overlay.remove();
                mostrarBuscadorAlumno(idGrado, idSubgrado, nombreGrado, nombreSubgrado);
            };
            
            modal.appendChild(select);
            modal.appendChild(button);
            overlay.appendChild(modal);
            document.body.appendChild(overlay);
        })
        .catch(err => {
            ocultarLoader(loader);
            console.error('Error al cargar subgrados:', err);
            mostrarError('Error al cargar subgrados', 
                `No se pudieron cargar los subgrados. Verifica la conexión. 
                Detalles: ${err.message}`);
        });
}

function mostrarBuscadorAlumno(idGrado, idSubgrado, nombreGrado, nombreSubgrado) {
    const loader = mostrarLoader();
    
<<<<<<< HEAD
    fetch(`https://backend-app-asistencia-n58n.onrender.com/asistencia/alumnos-subgrado/${idSubgrado}`)
=======
    fetch(`http://localhost:3000/asistencia/alumnos-subgrado/${idSubgrado}`)
>>>>>>> a68d10cbcc0001fb6b67c88d19af82a238dbfda5
        .then(async (res) => {
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Error ${res.status}: ${errorText}`);
            }
            
            const contentType = res.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('La respuesta no es JSON válido');
            }
            
            return res.json();
        })
        .then(alumnos => {
            ocultarLoader(loader);
            
            if (!Array.isArray(alumnos)) {
                throw new Error('La respuesta no es un array válido');
            }
            
            if (alumnos.length === 0) {
                mostrarError('Sin alumnos', 'No hay alumnos registrados en este subgrado');
                return;
            }
            
            // Crear modal para buscador de alumnos
            const overlay = document.createElement('div');
            overlay.className = 'modal-overlay-buscador-alumno';
            
            const modal = document.createElement('div');
            modal.className = 'modal-content-buscador-alumno';
            
            // Título del modal
            const titulo = document.createElement('h2');
            titulo.textContent = `Buscar alumno en ${nombreGrado} - ${nombreSubgrado}`;
            titulo.style.textAlign = 'center';
            titulo.style.marginBottom = '20px';
            modal.appendChild(titulo);
            
            // Contenedor del buscador
            const buscadorContainer = document.createElement('div');
            buscadorContainer.style.display = 'flex';
            buscadorContainer.style.flexDirection = 'column';
            buscadorContainer.style.gap = '15px';
            buscadorContainer.style.width = '100%';
            buscadorContainer.style.maxWidth = '500px';
            buscadorContainer.style.margin = '0 auto';
            
            // Input de búsqueda
            const inputBusqueda = document.createElement('input');
            inputBusqueda.type = 'text';
            inputBusqueda.placeholder = 'Buscar alumno por nombre...';
            inputBusqueda.className = 'input-busqueda-alumno';
            inputBusqueda.style.padding = '10px';
            inputBusqueda.style.borderRadius = '5px';
            inputBusqueda.style.border = '1px solid #ccc';
            
            // Lista de resultados
            const resultadosContainer = document.createElement('div');
            resultadosContainer.className = 'resultados-busqueda-alumno';
            resultadosContainer.style.maxHeight = '300px';
            resultadosContainer.style.overflowY = 'auto';
            resultadosContainer.style.border = '1px solid #eee';
            resultadosContainer.style.borderRadius = '5px';
            resultadosContainer.style.padding = '10px';
            
            // Función para filtrar alumnos
            const filtrarAlumnos = (termino) => {
                resultadosContainer.innerHTML = '';
                
                if (!termino) return;
                
                const terminoLower = termino.toLowerCase();
                const alumnosFiltrados = alumnos.filter(alumno => 
                    alumno.nombre_completo.toLowerCase().includes(terminoLower)
                );
                
                if (alumnosFiltrados.length === 0) {
                    const noResultados = document.createElement('div');
                    noResultados.textContent = 'No se encontraron alumnos';
                    noResultados.style.padding = '10px';
                    noResultados.style.textAlign = 'center';
                    noResultados.style.color = '#666';
                    resultadosContainer.appendChild(noResultados);
                    return;
                }
                
                alumnosFiltrados.forEach(alumno => {
                    const alumnoElement = document.createElement('div');
                    alumnoElement.className = 'item-alumno';
                    alumnoElement.textContent = alumno.nombre_completo;
                    alumnoElement.style.padding = '10px';
                    alumnoElement.style.cursor = 'pointer';
                    alumnoElement.style.borderBottom = '1px solid #eee';
                    alumnoElement.style.transition = 'background-color 0.2s';
                    
                    alumnoElement.addEventListener('mouseover', () => {
                        alumnoElement.style.backgroundColor = '#f5f5f5';
                    });
                    
                    alumnoElement.addEventListener('mouseout', () => {
                        alumnoElement.style.backgroundColor = 'transparent';
                    });
                    
                    alumnoElement.addEventListener('click', () => {
                        overlay.remove();
                        cargarAsistenciaAlumno(alumno.id_alumno, alumno.nombre_completo, nombreGrado, nombreSubgrado);
                    });
                    
                    resultadosContainer.appendChild(alumnoElement);
                });
            };
            
            // Evento de input para búsqueda en tiempo real
            inputBusqueda.addEventListener('input', (e) => {
                filtrarAlumnos(e.target.value);
            });
            
            // Botón para mostrar todos los alumnos
            const btnMostrarTodos = document.createElement('button');
            btnMostrarTodos.textContent = 'Mostrar todos los alumnos';
            btnMostrarTodos.className = 'btn-mostrar-todos';
            btnMostrarTodos.style.padding = '10px';
            btnMostrarTodos.style.backgroundColor = '#4CAF50';
            btnMostrarTodos.style.color = 'white';
            btnMostrarTodos.style.border = 'none';
            btnMostrarTodos.style.borderRadius = '5px';
            btnMostrarTodos.style.cursor = 'pointer';
            
            btnMostrarTodos.addEventListener('click', () => {
                filtrarAlumnos('');
                inputBusqueda.value = '';
            });
            
            buscadorContainer.appendChild(inputBusqueda);
            buscadorContainer.appendChild(btnMostrarTodos);
            buscadorContainer.appendChild(resultadosContainer);
            
            modal.appendChild(buscadorContainer);
            overlay.appendChild(modal);
            document.body.appendChild(overlay);
            
            // Enfocar el input automáticamente
            inputBusqueda.focus();
        })
        .catch(err => {
            ocultarLoader(loader);
            console.error('Error al cargar alumnos:', err);
            mostrarError('Error al cargar alumnos', 
                `No se pudieron cargar los alumnos. Verifica la conexión. 
                Detalles: ${err.message}`);
        });
}

async function cargarAsistenciaAlumno(idAlumno, nombreAlumno, nombreGrado, nombreSubgrado) {
    const loader = mostrarLoader();
    
    try {
        // URL con parámetros para evitar caché
<<<<<<< HEAD
        const url = new URL(`https://backend-app-asistencia-n58n.onrender.com/asistencia/alumno/${idAlumno}`);
=======
        const url = new URL(`http://localhost:3000/asistencia/alumno/${idAlumno}`);
>>>>>>> a68d10cbcc0001fb6b67c88d19af82a238dbfda5
        url.searchParams.append('_', Date.now());
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.error || `Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Validar estructura básica de los datos
        if (typeof data !== 'object' || data === null) {
            throw new Error('Datos recibidos no son válidos');
        }
        
        ocultarLoader(loader);
        mostrarGraficaAsistenciaIndividual(data, nombreAlumno, nombreGrado, nombreSubgrado);
        
    } catch (error) {
        ocultarLoader(loader);
        console.error('Error al cargar asistencia:', error);
        
        // Mostrar datos vacíos pero permitir que se vea el modal
        mostrarGraficaAsistenciaIndividual({
            Presente: 0,
            Tardanza: 0,
            Ausente: 0,
            alumno: { 
                id_alumno: idAlumno,
                nombre_completo: nombreAlumno 
            },
            reportes: {
                total_reportes: 0,
                reportes_uniforme: 0,
                reportes_comportamiento: 0
            }
        }, nombreAlumno, nombreGrado, nombreSubgrado);
        
        mostrarError('Error', `No se pudieron cargar los datos completos: ${error.message}`);
    }
}

  function mostrarGraficaAsistenciaIndividual(data, nombreAlumno, nombreGrado, nombreSubgrado) {
    // Validación de datos
    if (!data || typeof data !== 'object') {
        console.error('Datos no válidos:', data);
        mostrarError('Error', 'Datos del alumno no válidos');
        return;
    }

    // Crear modal para la gráfica
    let existingModal = document.getElementById('modal-grafica-alumno-individual');
    if (existingModal) existingModal.remove();

    const overlay = document.createElement('div');
    overlay.id = 'modal-grafica-alumno-individual';
    overlay.className = 'modal-overlay-alumno-individual';

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content-alumno-individual';
    modalContent.style.width = '90vw';
    modalContent.style.maxWidth = '800px';
    modalContent.style.maxHeight = '90vh';
    modalContent.style.overflow = 'auto';

    const closeBtn = document.createElement('span');
    closeBtn.textContent = '×';
    closeBtn.className = 'close-button-alumno-individual';
    closeBtn.onclick = () => overlay.remove();

    // Título
    const title = document.createElement('h2');
    title.textContent = `Asistencia de ${nombreAlumno}`;
    title.style.textAlign = 'center';
    title.style.marginBottom = '10px';

    const subtitle = document.createElement('h3');
    subtitle.textContent = `${nombreGrado} - ${nombreSubgrado}`;
    subtitle.style.textAlign = 'center';
    subtitle.style.marginTop = '0';
    subtitle.style.color = '#555';

    // Gráfica de asistencia
    const canvasContainer = document.createElement('div');
    canvasContainer.style.position = 'relative';
    canvasContainer.style.height = '400px';
    canvasContainer.style.width = '100%';

    const canvas = document.createElement('canvas');
    canvas.id = 'canvas-grafica-alumno-individual';
    canvas.width = 800;
    canvas.height = 400;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block'; // Asegurar que sea block

    canvasContainer.appendChild(canvas);
    
    // Información de asistencia
    const infoContainer = document.createElement('div');
    infoContainer.style.marginTop = '20px';
    infoContainer.style.padding = '15px';
    infoContainer.style.backgroundColor = '#f9f9f9';
    infoContainer.style.borderRadius = '5px';
    
    const infoTitle = document.createElement('h3');
    infoTitle.textContent = 'Resumen de Asistencia';
    infoTitle.style.marginTop = '0';
    
    const infoList = document.createElement('ul');
    infoList.style.listStyleType = 'none';
    infoList.style.padding = '0';
    
    const presentismo = document.createElement('li');
    presentismo.innerHTML = `<strong>Presente:</strong> ${data.Presente || 0} días`;
    
    const tardanzas = document.createElement('li');
    tardanzas.innerHTML = `<strong>Tardanzas:</strong> ${data.Tardanza || 0} días`;
    
    const ausencias = document.createElement('li');
    ausencias.innerHTML = `<strong>Ausencias:</strong> ${data.Ausente || 0} días`;
    
    const total = document.createElement('li');
    total.innerHTML = `<strong>Total registros:</strong> ${(data.Presente || 0) + (data.Tardanza || 0) + (data.Ausente || 0)} días`;
    
    infoList.appendChild(presentismo);
    infoList.appendChild(tardanzas);
    infoList.appendChild(ausencias);
    infoList.appendChild(total);
    
    infoContainer.appendChild(infoTitle);
    infoContainer.appendChild(infoList);
    
    // Sección de reportes
    const reportesContainer = document.createElement('div');
    reportesContainer.style.marginTop = '30px';
    reportesContainer.style.padding = '20px';
    reportesContainer.style.backgroundColor = '#f8f9fa';
    reportesContainer.style.borderRadius = '10px';
    
    const reportesTitle = document.createElement('h3');
    reportesTitle.textContent = `Reportes enviados (${data.reportes?.total_reportes || 0})`;
    
    const reportesGrid = document.createElement('div');
    reportesGrid.style.display = 'grid';
    reportesGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
    reportesGrid.style.gap = '15px';
    reportesGrid.style.marginTop = '15px';
    
    // Función para crear tarjetas de reporte
    const crearTarjetaReporte = (valor, etiqueta) => {
        const card = document.createElement('div');
        card.style.background = 'white';
        card.style.padding = '15px';
        card.style.borderRadius = '8px';
        card.style.textAlign = 'center';
        card.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        
        const count = document.createElement('span');
        count.style.fontSize = '24px';
        count.style.fontWeight = 'bold';
        count.style.color = '#dc3545';
        count.style.display = 'block';
        count.textContent = valor || 0;
        
        const label = document.createElement('span');
        label.style.color = '#6c757d';
        label.style.fontSize = '14px';
        label.textContent = etiqueta;
        
        card.appendChild(count);
        card.appendChild(label);
        return card;
    };
    
    reportesGrid.appendChild(crearTarjetaReporte(data.reportes?.total_reportes, 'Total'));
    reportesGrid.appendChild(crearTarjetaReporte(data.reportes?.reportes_uniforme, 'Uniforme'));
    reportesGrid.appendChild(crearTarjetaReporte(data.reportes?.reportes_comportamiento, 'Comportamiento'));
    
    reportesContainer.appendChild(reportesTitle);
    reportesContainer.appendChild(reportesGrid);
    
    // Detalles de reportes
    if (data.reportes?.detalles?.length > 0) {
        const detallesTitle = document.createElement('h4');
        detallesTitle.textContent = 'Detalles de reportes';
        detallesTitle.style.marginTop = '20px';
        detallesTitle.style.marginBottom = '10px';
        
        const detallesList = document.createElement('div');
        detallesList.style.display = 'flex';
        detallesList.style.flexDirection = 'column';
        detallesList.style.gap = '10px';
        
        data.reportes.detalles.forEach(reporte => {
            const reporteEl = document.createElement('div');
            reporteEl.style.padding = '15px';
            reporteEl.style.background = 'white';
            reporteEl.style.borderRadius = '8px';
            reporteEl.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
            
            const fechaTipo = document.createElement('div');
            fechaTipo.style.display = 'flex';
            fechaTipo.style.justifyContent = 'space-between';
            fechaTipo.style.marginBottom = '8px';
            
            const fecha = document.createElement('span');
            fecha.textContent = reporte.fecha || 'Sin fecha';
            fecha.style.fontSize = '0.9em';
            fecha.style.color = '#666';
            
            const tipo = document.createElement('span');
            tipo.textContent = reporte.tipo === 'uniforme' ? 'Uniforme' : 'Comportamiento';
            tipo.style.fontWeight = 'bold';
            tipo.style.color = reporte.tipo === 'uniforme' ? '#4a89dc' : '#e9573f';
            
            fechaTipo.appendChild(fecha);
            fechaTipo.appendChild(tipo);
            
            const mensaje = document.createElement('p');
            mensaje.textContent = reporte.mensaje || 'Sin mensaje';
            mensaje.style.margin = '8px 0 0 0';
            
            // Mostrar prendas si es reporte de uniforme
            if (reporte.tipo === 'uniforme' && reporte.prendas?.length > 0) {
                const prendas = document.createElement('div');
                prendas.style.marginTop = '8px';
                prendas.style.fontSize = '0.9em';
                prendas.innerHTML = `<strong>Prendas:</strong> ${reporte.prendas.join(', ')}`;
                reporteEl.appendChild(prendas);
            }
            
            reporteEl.appendChild(fechaTipo);
            reporteEl.appendChild(mensaje);
            detallesList.appendChild(reporteEl);
        });
        
        reportesContainer.appendChild(detallesTitle);
        reportesContainer.appendChild(detallesList);
    }
    
    // Construir el modal
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(title);
    modalContent.appendChild(subtitle);
    modalContent.appendChild(canvasContainer);
    modalContent.appendChild(infoContainer);
    modalContent.appendChild(reportesContainer);
    
    overlay.appendChild(modalContent);
    document.body.appendChild(overlay);

    // Configurar gráfica - CÓDIGO ACTUALIZADO
    const ctx = canvas.getContext('2d');

    // Destruir gráfica anterior si existe
    if (window.alumnoChart) {
        window.alumnoChart.destroy();
    }

    // Asegurar que los datos sean números
    setTimeout(() => {
        const ctx = canvas.getContext('2d');
        
        // Destruir gráfica anterior si existe
        if (window.alumnoChartInstance) {
            window.alumnoChartInstance.destroy();
        }

        // Convertir datos a números
        const datosGrafica = [
            Number(data.Presente) || 0,
            Number(data.Tardanza) || 0,
            Number(data.Ausente) || 0
        ];

        // Verificar que haya datos para mostrar
        if (datosGrafica.some(val => val > 0)) {
            window.alumnoChartInstance = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Presente', 'Tardanza', 'Ausente'],
                    datasets: [{
                        data: datosGrafica,
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.7)',
                            'rgba(255, 206, 86, 0.7)',
                            'rgba(255, 99, 132, 0.7)'
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(255, 99, 132, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        animateScale: true,
                        animateRotate: true
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: `Asistencia de ${nombreAlumno}`,
                            font: {
                                size: 16
                            }
                        }
                    }
                }
            });
        } else {
            console.log("No hay datos suficientes para mostrar la gráfica");
            // Opcional: Mostrar un mensaje cuando no hay datos
            const noDataMsg = document.createElement('p');
            noDataMsg.textContent = 'No hay datos de asistencia para mostrar';
            noDataMsg.style.textAlign = 'center';
            noDataMsg.style.color = '#666';
            canvasContainer.appendChild(noDataMsg);
        }
    }, 50); // Pequeño retardo para asegurar que el canvas está listo
}

//--------------------------------------------------------------------------------------------------------