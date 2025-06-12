export function mostrarFormularioAgregarAlumno(idGradoEspecifico, nombreGradoEspecifico) {
    const main = document.querySelector('main');
    main.innerHTML = ''; // Limpiar el contenido principal

    // Crear contenedor principal
    const contenedor = document.createElement('div');
    contenedor.className = 'formulario-agregar-alumno';

    // Crear título
    const titulo = document.createElement('h2');
    titulo.textContent = `Agregar Alumno a ${nombreGradoEspecifico}`;
    contenedor.appendChild(titulo);

    // Crear formulario
    const formulario = document.createElement('form');
    formulario.id = 'formAgregarAlumno';

    // Campo oculto para el ID del grado específico
    const inputIdGrado = document.createElement('input');
    inputIdGrado.type = 'hidden';
    inputIdGrado.id = 'idGradoEspecifico';
    inputIdGrado.value = idGradoEspecifico;
    formulario.appendChild(inputIdGrado);

    // Grupo para el nombre
    const grupoNombre = crearGrupoFormulario('nombre', 'Nombre:', 'text');
    formulario.appendChild(grupoNombre);

    // Grupo para el apellido
    const grupoApellido = crearGrupoFormulario('apellido', 'Apellido:', 'text');
    formulario.appendChild(grupoApellido);

    // Grupo para la edad
    const grupoEdad = crearGrupoFormulario('edad', 'Edad:', 'number');
    formulario.appendChild(grupoEdad);

    // Grupo para el correo
    const grupoCorreo = crearGrupoFormulario('correo', 'Correo Institucional:', 'email');
    formulario.appendChild(grupoCorreo);

    // Botón de submit
    const botonSubmit = document.createElement('button');
    botonSubmit.type = 'submit';
    botonSubmit.textContent = 'Agregar Alumno';
    formulario.appendChild(botonSubmit);

    // Agregar formulario al contenedor
    contenedor.appendChild(formulario);

    // Agregar contenedor al main
    main.appendChild(contenedor);

    // Manejador de evento para el formulario
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const alumno = {
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            edad: document.getElementById('edad').value,
            correo: document.getElementById('correo').value,
            id_grado_especifico: document.getElementById('idGradoEspecifico').value
        };
        
        agregarAlumno(alumno, nombreGradoEspecifico);
    });
}

// Función auxiliar para crear grupos de formulario
function crearGrupoFormulario(id, labelText, inputType) {
    const grupo = document.createElement('div');
    grupo.className = 'form-group';

    const etiqueta = document.createElement('label');
    etiqueta.htmlFor = id;
    etiqueta.textContent = labelText;
    grupo.appendChild(etiqueta);

    const input = document.createElement('input');
    input.type = inputType;
    input.id = id;
    input.required = true;
    grupo.appendChild(input);

    return grupo;
}

function agregarAlumno(alumno, nombreGrado) {
    fetch('http://localhost:3000/agregar-alumno', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(alumno)
    })
    .then(response => {
        if (!response.ok) throw new Error('Error en la respuesta del servidor');
        return response.json();
    })
    .then(data => {
        alert(`Alumno ${alumno.nombre} ${alumno.apellido} agregado correctamente a ${nombreGrado}`);
        // Opcional: redirigir o actualizar la lista de alumnos
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al agregar alumno: ' + error.message);
    });
}