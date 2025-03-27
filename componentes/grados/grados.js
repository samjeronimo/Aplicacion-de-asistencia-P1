import { mostrarAlumnosParaAsistencia } from "../asistencia/asistencia-alumnos.js";

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
    
    // Main content
    let lista = document.createElement('div');
    lista.className = "div-lista";
    
    // Add elements to container
    mainContainer.appendChild(header);
    mainContainer.appendChild(lista);
    grados.appendChild(mainContainer);
    

    let gradoActivo = null; // Para manejar la visibilidad de los subgrados
    
        fetch('http://localhost:3000/grados')
        .then(response => {
            if (!response.ok) throw new Error('Error al obtener grados');
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data)) throw new Error('Formato de datos incorrecto');
            
            data.forEach(grado => {
                let gradoElement = document.createElement('div');
                gradoElement.className = 'grado-item';
                
                // Crear estructura interna del grado
                let gradoContenido = document.createElement('div');
                gradoContenido.className = 'grado-contenido';
                
                let gradoNombre = document.createElement('p');
                gradoNombre.textContent = grado.nombre;
                
                let arrow = document.createElement('span');
                arrow.className = 'arrow';
                
                // Verificar si es un grado que debe mostrar subgrados
                const gradosConSubgrados = [4, 5, 6, 7]; // IDs de grados que tienen subgrados
                const esGradoConSubgrados = gradosConSubgrados.includes(grado.id_grado);
                
                if (esGradoConSubgrados) {
                    arrow.textContent = '▶';
                    gradoElement.addEventListener('click', () => {
                        if (gradoActivo === gradoElement) {
                            gradoElement.querySelector('.sub-lista')?.remove();
                            gradoElement.querySelector('.arrow').textContent = '▶';
                            gradoActivo = null;
                        } else {
                            if (gradoActivo) {
                                gradoActivo.querySelector('.sub-lista')?.remove();
                                gradoActivo.querySelector('.arrow').textContent = '▶';
                            }
                            cargarGradosEspecificos(grado.id_grado, gradoElement);
                            gradoElement.querySelector('.arrow').textContent = '▼';
                            gradoActivo = gradoElement;
                        }
                    });
                } else {
                    // Grados sin subgrados (Prekinder, Kinder, Prepa)
                    arrow.textContent = '•';
                    gradoElement.addEventListener('click', () => {
                        // Mostrar directamente la asistencia para este grado
                        mostrarAlumnosParaAsistencia(
                            grado.id_grado, // Usamos el ID del grado principal
                            grado.nombre    // Nombre del grado
                        );
                    });
                }
                
                gradoContenido.appendChild(gradoNombre);
                gradoContenido.appendChild(arrow);
                gradoElement.appendChild(gradoContenido);
                lista.appendChild(gradoElement);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            lista.innerHTML = `<p class="error">Error al cargar los grados: ${error.message}</p>`;
        });
    
        return grados;
    }
    
    function cargarGradosEspecificos(idGrado, gradoElement) {
        console.log(`Cargando subgrados para grado ID: ${idGrado}`);
    
        fetch(`http://localhost:3000/grados-especificos/${idGrado}`)
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