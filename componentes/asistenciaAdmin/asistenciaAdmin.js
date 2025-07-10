export function mostrarAlumnosParaAsistenciaAdmin(idGrado, nombreGrado, tipoGrado = 'especifico') {
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
        import('../gradosAdmin/gradosAdmin.js').then(module => {
            main.textContent = '';
            main.appendChild(module.cargarGradosAdmin());
        });
    });
    
    // Contenedor del título
    const tituloContainer = document.createElement('div');
    tituloContainer.className = 'titulo-container';

    const btnMarcarTodos = document.createElement('button');
    btnMarcarTodos.className = 'btn-marcar-todos';
    btnMarcarTodos.textContent = 'Presentes';

    btnMarcarTodos.addEventListener('click', () => {
        document.querySelectorAll('.estado-asistencia').forEach(select => {
            select.value = 'P'; // P = Presente
        });
    });

    const btnMarcarTodosAusentes = document.createElement('button');
    btnMarcarTodosAusentes.className = 'btn-marcar-todos-ausentes';
    btnMarcarTodosAusentes.textContent = 'Ausentes';

    btnMarcarTodosAusentes.addEventListener('click', () => {
        document.querySelectorAll('.estado-asistencia').forEach(select => {
            select.value = 'A'; // A = Ausente
        });
    });

    const btnAgregarHeader = document.createElement('button');
    btnAgregarHeader.className = 'btn-agregar-header';
    btnAgregarHeader.textContent = 'Agregar Alumno';
    

    // Evento para mostrar formulario flotante
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
        { name: 'apellido', placeholder: 'Apellido', type: 'text' },
        { name: 'edad', placeholder: 'Edad', type: 'number' },
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

    const btnCerrar = document.createElement('button');
    btnCerrar.type = 'button';
    btnCerrar.textContent = 'Cancelar';
    btnCerrar.classList.add('btn-cancelar');
    btnCerrar.addEventListener('click', () => overlay.remove());

    form.appendChild(btnCerrar);
    modal.appendChild(form);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nuevoAlumno = {
            nombre: form.nombre.value.trim(),
            apellido: form.apellido.value.trim(),
            edad: parseInt(form.edad.value.trim()),
            correo: form.correo.value.trim(),
            id_grado_especifico: tipoGrado === 'principal' ? null : idGrado
        };

        try {
            const res = await fetch('https://backend-app-asistencia-n58n.onrender.com/agregar-alumno', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoAlumno)
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'No se pudo crear el alumno');

            alert('Alumno agregado correctamente');
            overlay.remove();
            mostrarAlumnosParaAsistenciaAdmin(idGrado, nombreGrado, tipoGrado);
        } catch (err) {
            alert('Error: ' + err.message);
        }
    });
});

    
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
    
    // Botón de correo general (NUEVO)
    const btnCorreoGeneral = document.createElement('button');
    btnCorreoGeneral.className = 'btn-correo-general';
    btnCorreoGeneral.innerHTML = `
      <span class="material-symbols-outlined">mail</span>
      <span>Enviar a todos</span>
    `;
    
    // Modifica esta parte para posicionar el botón a la izquierda de la fecha
    const contenedorFechaCorreo = document.createElement('div');
    contenedorFechaCorreo.className = 'contenedor-fecha-correo';
    contenedorFechaCorreo.appendChild(btnCorreoGeneral);
    contenedorFechaCorreo.appendChild(fechaContainer);

    // Construir header (ESTA PARTE QUEDA IGUAL PERO CON EL NUEVO ORDEN)
    tituloContainer.appendChild(titulo);
    tituloContainer.appendChild(contenedorFechaCorreo); 
    tituloContainer.appendChild(btnAgregarHeader);
    tituloContainer.appendChild(btnMarcarTodos);
    tituloContainer.appendChild(btnMarcarTodosAusentes);
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
    const url = `https://backend-app-asistencia-n58n.onrender.com/alumnos-por-grado/${idGrado}?tipo=${tipoGrado}`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
            return response.json();
        })
        .then(data => {

            btnCorreoGeneral.addEventListener('click', () => {
                mostrarModalCorreoGeneral(data.data);
            });

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
            
            ['#', 'Nombre Completo', 'Edad', 'Correo', 'Asistencia', 'Borrar', 'Reporte'].forEach(texto => {
                const th = document.createElement('th');
                th.textContent = texto;
                trHead.appendChild(th);
            });
            
            thead.appendChild(trHead);
            tabla.appendChild(thead);
            
            // Crear los datos 
            const tbody = document.createElement('tbody');
            
            data.data.forEach((alumno, index) => {
                const tr = document.createElement('tr');
                
                // Número de alumno
                const tdNum = document.createElement('td');
                tdNum.textContent = index + 1;
                tr.appendChild(tdNum);
                
                // Nombre de alumno
                const tdNombre = document.createElement('td');
                tdNombre.textContent = alumno.nombre_completo;
                tr.appendChild(tdNombre);
                
                // Edad de alumno
                const tdEdad = document.createElement('td');
                tdEdad.textContent = alumno.edad;
                tr.appendChild(tdEdad);
                
                // Correo de alumno
                const tdCorreo = document.createElement('td');
                tdCorreo.textContent = alumno.correo;
                tr.appendChild(tdCorreo);
                
                // Asistencia de alumno
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

                // Botón eliminar alumno
                const tdEliminar = document.createElement('td');
                const btnEliminar = document.createElement('button');
                btnEliminar.textContent = 'Eliminar';
                btnEliminar.className = 'btn-eliminar';

                btnEliminar.addEventListener('click', async () => {
                    const confirmar = confirm(`¿Eliminar al alumno ${alumno.nombre_completo}?`);
                    if (!confirmar) return;
                
                    try {
                        // 1. Pedir credenciales
                        const nombreProfesor = prompt('Nombre de profesor:');
                        if (!nombreProfesor) throw new Error('Nombre requerido');
                        
                        const contrasena = prompt('Contraseña:');
                        if (!contrasena) throw new Error('Contraseña requerida');
                
                        // 2. Verificar credenciales
                        const response = await fetch('https://backend-app-asistencia-n58n.onrender.com/verificar-contrasena', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ nombre: nombreProfesor, contrasena })
                        });
                
                        const data = await response.json();
                        
                        if (!response.ok || !data.valido) {
                            throw new Error(data.error || 'Credenciales incorrectas');
                        }
                
                        // 3. Eliminar alumno
                        const deleteResponse = await fetch(`https://backend-app-asistencia-n58n.onrender.com/eliminar-alumno/${alumno.id}`, {
                            method: 'DELETE'
                        });
                
                        if (!deleteResponse.ok) {
                            const errorData = await deleteResponse.json();
                            throw new Error(errorData.error || 'Error al eliminar');
                        }
                
                        // 4. Actualizar vista
                        alert('Alumno eliminado');
                        mostrarAlumnosParaAsistenciaAdmin(idGrado, nombreGrado, tipoGrado);
                
                    } catch (error) {
                        console.error('Error completo:', error);
                        alert(`Error: ${error.message}`);
                    }
                });
                

            tdEliminar.appendChild(btnEliminar);
            tr.appendChild(tdEliminar);

            // Crear botón estilo carta Gmail
            const tdCarta = document.createElement('td');
            const btnCarta = document.createElement('button');
            btnCarta.className = 'btn-carta-gmail';
            btnCarta.innerHTML = `
              <span class="material-symbols-outlined">mail</span>
              <span>Mensaje</span>
            `;
            tdCarta.appendChild(btnCarta);

            // Crear modal flotante
            const modalCarta = document.createElement('div');
            modalCarta.className = 'modal-carta';

            // Contenedor interno del modal
            const contenidoModal = document.createElement('div');
            contenidoModal.className = 'contenido-modal';

            // Título
            const titulo = document.createElement('h2');
            titulo.textContent = 'Uniforme';

            // Crear contenedor superior (ropa)
            const contenedorSuperior = document.createElement('div');
            contenedorSuperior.className = 'contenedor-prendas';

            // Lista de prendas con URLs personalizadas
            const prendas = [
              {
                nombre: 'camisa',
                url: 'https://us.123rf.com/450wm/orca123/orca1230901/orca123090100080/4201869-pattern-drawing-of-a-black-polo-shirt.jpg'
              },
              {
                nombre: 'pantalon',
                url: 'https://img.freepik.com/vector-premium/ilustracion-dibujos-animados-vector-pantalones-hombres-clasicos-negros_574806-1014.jpg'
              },
              {
                nombre: 'calcetines',
                url: 'https://i.pinimg.com/564x/8e/b8/73/8eb873057ebd745552a8362654114ab0.jpg'
              },
              {
                nombre: 'zapatos',
                url: 'https://i.pinimg.com/736x/08/db/7f/08db7f30b85cecd5ebccdccb8b8ebc88.jpg'
              },
              {
                nombre: 'corte de cabello',
                url: 'https://img.freepik.com/vector-premium/corte-pelo-hombre-ilustracion-vectorial-dibujada-mano-peinado-hombre_573689-290.jpg'
              }
            ];

            // Generar cada prenda en el modal
            prendas.forEach(({ nombre, url }) => {
              const img = document.createElement('img');
              img.src = url;
              img.alt = nombre;
              img.className = 'imagen-prenda';
            
              // Al hacer clic, alternar clase "seleccionada"
              img.addEventListener('click', () => {
                img.classList.toggle('seleccionada');
              });
          
              contenedorSuperior.appendChild(img);
            });

            // Crear contenedor inferior (mensaje)
            const contenedorInferior = document.createElement('div');
            contenedorInferior.className = 'contenedor-mensaje';

            const textarea = document.createElement('textarea');
            textarea.placeholder = 'Escribe un mensaje...';

            const btnEnviar = document.createElement('button');
            btnEnviar.textContent = 'Enviar';
            btnEnviar.className = 'btn-enviar';

            btnEnviar.addEventListener('click', async () => {
              const mensaje = textarea.value.trim();
              const prendasSeleccionadas = [...contenedorSuperior.querySelectorAll('.seleccionada')].map(img => img.alt);
              
              if (prendasSeleccionadas.length === 0 && !mensaje) {
                  alert('Selecciona al menos una prenda o escribe un mensaje');
                  return;
              }
              
              try {
                  // Obtener el ID del profesor (ajusta según tu implementación)
                  const id_profesor = localStorage.getItem('user_id') || 4;
                  
                  // 1. Registrar el reporte en la base de datos Y enviar correo
                  const response = await fetch('https://backend-app-asistencia-n58n.onrender.com/reportes/registrar', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                          id_alumno: alumno.id,
                          id_profesor: id_profesor,
                          prendas: prendasSeleccionadas,
                          mensaje: mensaje,
                          tipo: 'uniforme' // Asegúrate de incluir el tipo
                      })
                  });
                  
                  const data = await response.json();
                  
                  if (!response.ok) {
                      throw new Error(data.error || 'Error al registrar y enviar reporte');
                  }
                  
                  // 2. Mostrar feedback al usuario
                  if (data.success) {
                      alert('✓ Reporte guardado y correo enviado correctamente');
                      modalCarta.classList.remove('activo');
                      setTimeout(() => document.body.removeChild(modalCarta), 300);
                  }
                  
              } catch (error) {
                  console.error('Error completo:', error);
                  
                  // Manejo específico de errores
                  if (error.message.includes('correo')) {
                      alert(`Reporte guardado, pero hubo un problema al enviar el correo: ${error.message}`);
                  } else {
                      alert(`Error: ${error.message}`);
                  }
              }
          });

            // Botón de cerrar
            const botonCerrar = document.createElement('button');
            botonCerrar.className = 'cerrar-modal';
            botonCerrar.textContent = 'Cerrar';
            botonCerrar.addEventListener('click', () => {
              document.body.removeChild(modalCarta);
            });

            // Agregar todo al modal
            contenidoModal.appendChild(titulo);
            contenidoModal.appendChild(contenedorSuperior);
            contenidoModal.appendChild(contenedorInferior);
            contenedorInferior.appendChild(textarea);
            contenedorInferior.appendChild(btnEnviar);
            contenidoModal.appendChild(botonCerrar);
            modalCarta.appendChild(contenidoModal);

            // Mostrar el modal
            btnCarta.addEventListener('click', () => {
              document.body.appendChild(modalCarta);
              modalCarta.classList.add('activo');
            });

            btnCarta.addEventListener('click', () => {
                modalCarta.dataset.correo = alumno.correo; // Guardar correo en el modal
                document.body.appendChild(modalCarta);
              });
              
              // Luego en el evento del botón, recupera el correo:
              const correoDestino = modalCarta.dataset.correo;

            // Cerrar modal desde botón
            modalCarta.querySelector('.cerrar-modal').addEventListener('click', () => {
              modalCarta.classList.remove('activo');
            });

            // Agregar al DOM
            tr.appendChild(tdCarta);
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
        const response = await fetch('https://backend-app-asistencia-n58n.onrender.com/registrar-asistencia', {
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


function mostrarModalCorreoGeneral(alumnos) {
    if (document.querySelector('.modal-correo-general')) return;
  
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay-correo';
  
    const modal = document.createElement('div');
    modal.className = 'modal-correo-general';
  
    const titulo = document.createElement('h2');
    titulo.className = 'modal-correo-titulo';
    titulo.textContent = 'Enviar mensaje a toda la clase';
  
    const formContainer = document.createElement('div');
    formContainer.className = 'modal-correo-form';
  
    const textarea = document.createElement('textarea');
    textarea.className = 'modal-correo-textarea';
    textarea.placeholder = 'Escribe tu mensaje aquí...';
  
    const btnEnviar = document.createElement('button');
    btnEnviar.className = 'btn-enviar-todos';
    btnEnviar.textContent = 'Enviar a todos';
  
    const btnCerrar = document.createElement('button');
    btnCerrar.className = 'btn-cancelar-correo';
    btnCerrar.textContent = 'Cancelar';
  
    btnEnviar.addEventListener('click', async () => {
      const mensaje = textarea.value.trim();
      
      if (!mensaje) {
        alert('Por favor escribe un mensaje');
        return;
      }

      const confirmar = confirm(`¿Enviar este mensaje a ${alumnos.length} alumnos?`);
      if (!confirmar) return;
  
      try {
        // Preparamos lista de correos
        const listaCorreos = alumnos.map(alumno => alumno.correo);
        
        // Enviamos un solo request con todos los correos
        const response = await fetch('https://backend-app-asistencia-n58n.onrender.com/enviar-mensaje-general', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            destinatarios: listaCorreos,
            mensaje: mensaje
          })
        });

        const resultado = await response.json();
        
        if (!response.ok) {
          throw new Error(resultado.error || 'Error desconocido');
        }
        
        alert(`✓ ${resultado.message || 'Mensaje enviado correctamente'}`);
        overlay.remove();
      } catch (error) {
        console.error('Error al enviar:', error);
        alert(`Error al enviar: ${error.message}`);
      }
    });
  
    btnCerrar.addEventListener('click', () => overlay.remove());
  
    formContainer.appendChild(textarea);
    formContainer.appendChild(btnEnviar);
    formContainer.appendChild(btnCerrar);
    
    modal.appendChild(titulo);
    modal.appendChild(formContainer);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
}