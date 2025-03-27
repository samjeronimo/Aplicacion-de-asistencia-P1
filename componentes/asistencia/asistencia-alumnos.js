export function mostrarAlumnosParaAsistencia(idGrado, nombreGrado, tipoGrado = 'especifico') {
    const main = document.querySelector('main');
    main.textContent = ''; // Limpiar contenido
    
    // Contenedor principal
    const contenedor = document.createElement('div');
    contenedor.className = 'asistencia-container';

    const fechaInput = document.createElement('input');
        fechaInput.type = 'hidden';
        fechaInput.id = 'fecha-asistencia';
        fechaInput.value = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
        contenedor.appendChild(fechaInput);
    
    // Header
    const header = document.createElement('header');
    header.className = 'asistencia-header';
    
    // Botón de regreso
    const btnRegresar = document.createElement('button');
    btnRegresar.className = 'btn-regresar';
    
    const iconoRegresar = document.createElement('span');
    iconoRegresar.className = 'icono-regresar';
    btnRegresar.appendChild(iconoRegresar);
    
    const textoRegresar = document.createElement('span');
    textoRegresar.className = 'texto-regresar';
    textoRegresar.textContent = 'Volver a Grados';
    btnRegresar.appendChild(textoRegresar);
    
    btnRegresar.addEventListener('click', () => {
        import('../grados/grados.js').then(module => {
            main.textContent = '';
            main.appendChild(module.cargarGrados());
        });
    });
    
    // Contenedor del título
    const tituloContainer = document.createElement('div');
    tituloContainer.className = 'titulo-container';
    
    const titulo = document.createElement('h2');
    titulo.className = 'asistencia-titulo';
    
    const tituloTexto = document.createElement('span');
    tituloTexto.className = 'titulo-texto';
    tituloTexto.textContent = 'Asistencia';
    titulo.appendChild(tituloTexto);
    
    const tituloGrado = document.createElement('span');
    tituloGrado.className = 'titulo-grado';
    tituloGrado.textContent = nombreGrado;
    titulo.appendChild(tituloGrado);
    
    // Fecha
    const fechaContainer = document.createElement('div');
    fechaContainer.className = 'fecha-container';
    
    const fechaIcono = document.createElement('span');
    fechaIcono.className = 'fecha-icono';
    fechaContainer.appendChild(fechaIcono);
    
    const fechaTexto = document.createElement('span');
    fechaTexto.className = 'fecha-texto';
    fechaTexto.textContent = new Date().toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    fechaContainer.appendChild(fechaTexto);
    
    // Construir header
    tituloContainer.appendChild(titulo);
    tituloContainer.appendChild(fechaContainer);
    header.appendChild(btnRegresar);
    header.appendChild(tituloContainer);
    
    // Contenedor de alumnos
    const listaAlumnos = document.createElement('div');
    listaAlumnos.className = 'lista-alumnos';
    
    // Mensaje de carga
    const loadingMsg = document.createElement('p');
    loadingMsg.className = 'mensaje-carga';
    loadingMsg.textContent = 'Cargando alumnos...';
    listaAlumnos.appendChild(loadingMsg);
    
    // Obtener datos
    const url = `http://localhost:3000/alumnos-por-grado/${idGrado}?tipo=${tipoGrado}`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
            return response.json();
        })
        .then(data => {
            listaAlumnos.textContent = ''; // Limpiar mensaje
            
            if (!data.success || data.count === 0) {
                const infoMsg = document.createElement('p');
                infoMsg.className = 'info-msg';
                infoMsg.textContent = 'No hay alumnos registrados en este grado';
                listaAlumnos.appendChild(infoMsg);
                return;
            }
            
            // Crear tabla
            const tabla = document.createElement('table');
            tabla.className = 'tabla-alumnos';
            
            // Crear thead
            const thead = document.createElement('thead');
            const trHead = document.createElement('tr');
            
            ['#', 'Nombre Completo', 'Edad', 'Correo', 'Asistencia'].forEach(texto => {
                const th = document.createElement('th');
                th.textContent = texto;
                trHead.appendChild(th);
            });
            
            thead.appendChild(trHead);
            tabla.appendChild(thead);
            
            // Crear tbody
            const tbody = document.createElement('tbody');
            
            data.data.forEach((alumno, index) => {
                const tr = document.createElement('tr');
                
                // Número
                const tdNum = document.createElement('td');
                tdNum.textContent = index + 1;
                tr.appendChild(tdNum);
                
                // Nombre
                const tdNombre = document.createElement('td');
                tdNombre.textContent = alumno.nombre_completo;
                tr.appendChild(tdNombre);
                
                // Edad
                const tdEdad = document.createElement('td');
                tdEdad.textContent = alumno.edad;
                tr.appendChild(tdEdad);
                
                // Correo
                const tdCorreo = document.createElement('td');
                tdCorreo.textContent = alumno.correo;
                tr.appendChild(tdCorreo);
                
                // Asistencia
                const tdAsistencia = document.createElement('td');
                const select = document.createElement('select');
                select.className = 'estado-asistencia';
                select.dataset.id = alumno.id;
                
                ['P', 'A', 'T'].forEach(valor => {
                    const option = document.createElement('option');
                    option.value = valor;
                    option.textContent = 
                        valor === 'P' ? 'Presente' : 
                        valor === 'A' ? 'Ausente' : 'Tardanza';
                    select.appendChild(option);
                });
                
                tdAsistencia.appendChild(select);
                tr.appendChild(tdAsistencia);
                
                tbody.appendChild(tr);
            });
            
            tabla.appendChild(tbody);
            listaAlumnos.appendChild(tabla);
            
            // Botón guardar
            const btnGuardar = document.createElement('button');
            btnGuardar.className = 'btn-guardar';
            btnGuardar.textContent = 'Guardar Asistencia';
            btnGuardar.addEventListener('click', () => guardarAsistencia(idGrado, tipoGrado));
            listaAlumnos.appendChild(btnGuardar);
        })
        .catch(error => {
            console.error('Error:', error);
            listaAlumnos.textContent = '';
            
            const errorContainer = document.createElement('div');
            errorContainer.className = 'error-container';
            
            const errorMsg = document.createElement('p');
            errorMsg.className = 'error-msg';
            errorMsg.textContent = `Error al cargar alumnos: ${error.message}`;
            errorContainer.appendChild(errorMsg);
            
            const btnReintentar = document.createElement('button');
            btnReintentar.className = 'btn-reintentar';
            btnReintentar.textContent = 'Reintentar';
            btnReintentar.addEventListener('click', () => location.reload());
            errorContainer.appendChild(btnReintentar);
            
            listaAlumnos.appendChild(errorContainer);
        });
    
    contenedor.appendChild(header);
    contenedor.appendChild(listaAlumnos);
    main.appendChild(contenedor);
}


async function guardarAsistencia(idGrado, tipoGrado) {
    // Obtener la fecha del campo oculto o usar la actual
    const fechaInput = document.querySelector('#fecha-asistencia') || 
                      document.querySelector('#fecha-actual'); // Fallback por si acaso
    const fechaActual = fechaInput?.value || new Date().toISOString().split('T')[0];
    
    // Recolectar datos de asistencia
    const asistencias = Array.from(document.querySelectorAll('.estado-asistencia')).map(select => ({
        id_alumno: parseInt(select.dataset.id),
        fecha: fechaActual,
        estado: select.value
    }));

    try {
        const response = await fetch('http://localhost:3000/registrar-asistencia', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(asistencias)
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Error al guardar');
        }

        alert(`Asistencia guardada para ${asistencias.length} alumnos`);
        console.log("Asistencia guardada:", data);
    } catch (error) {
        console.error("Error:", error);
        alert(`Error: ${error.message}`);
    }
}



