// 1. Datos de la aplicación (Array en memoria)
let prestamos = [];

// 2. Referencias al DOM
const form = document.getElementById('prestamoForm');
const tablaBody = document.getElementById('tablaPrestamos');
const mensajeVacio = document.getElementById('mensajeVacio');
const editIndexInput = document.getElementById('editIndex');
const btnSubmit = document.getElementById('btnSubmit');
const btnCancelar = document.getElementById('btnCancelar');
const formTitle = document.getElementById('formTitle');

// 3. Función principal: Mostrar/Renderizar préstamos
function renderizarPrestamos() {
    // Limpiamos la tabla
    tablaBody.innerHTML = '';

    // Comprobamos si hay datos
    if (prestamos.length === 0) {
        mensajeVacio.classList.remove('d-none');
    } else {
        mensajeVacio.classList.add('d-none');

        prestamos.forEach((p, index) => {
            const fila = document.createElement('tr');
            fila.className = 'animar-fila';
            
            fila.innerHTML = `
                <td><strong>${p.nombreAlumno}</strong></td>
                <td><span class="text-capitalize">${p.material}</span></td>
                <td><span class="text-capitalize">${p.turno}</span></td>
                <td>
                    <span class="badge ${p.devuelto ? 'badge-devuelto' : 'badge-pendiente'}">
                        ${p.devuelto ? '✓ Devuelto' : 'Pendiente'}
                    </span>
                </td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline-warning me-2" onclick="cargarParaEditar(${index})">
                        Editar
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="eliminarPrestamo(${index})">
                        Borrar
                    </button>
                </td>
            `;
            tablaBody.appendChild(fila);
        });
    }
}

// 4. Función: Añadir o Editar préstamo
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita recargar la página

    // Captura de datos
    const nuevoPrestamo = {
        nombreAlumno: document.getElementById('nombreAlumno').value,
        material: document.getElementById('material').value,
        turno: document.querySelector('input[name="turno"]:checked').value,
        devuelto: document.getElementById('devuelto').checked
    };

    const index = parseInt(editIndexInput.value);

    if (index === -1) {
        // MODO AÑADIR
        prestamos.push(nuevoPrestamo);
    } else {
        // MODO EDITAR
        prestamos[index] = nuevoPrestamo;
    }

    actualizarInterfaz();
    limpiarFormulario();
});

// 5. Función: Eliminar préstamo
function eliminarPrestamo(index) {
    prestamos.splice(index, 1);
    
    // Actualizamos la vista
    actualizarInterfaz();
    
    // Si justo estábamos editando el elemento que acabamos de borrar, limpiamos el formulario
    if (parseInt(editIndexInput.value) === index) {
        limpiarFormulario();
    }
}

// 6. Función: Cargar datos en el formulario para editar
function cargarParaEditar(index) {
    const p = prestamos[index];
    
    // Llenamos el formulario
    document.getElementById('nombreAlumno').value = p.nombreAlumno;
    document.getElementById('material').value = p.material;
    document.getElementById('devuelto').checked = p.devuelto;
    
    if (p.turno === 'mañana') {
        document.getElementById('turnoManana').checked = true;
    } else {
        document.getElementById('turnoTarde').checked = true;
    }

    // Cambiamos estado de la UI
    editIndexInput.value = index;
    formTitle.innerText = "Editando Préstamo";
    btnSubmit.innerText = "Guardar Cambios";
    btnSubmit.className = "btn btn-warning";
    btnCancelar.classList.remove('d-none');
}

// 7. Funciones auxiliares
function limpiarFormulario() {
    form.reset();
    editIndexInput.value = "-1";
    formTitle.innerText = "Nuevo Préstamo";
    btnSubmit.innerText = "Registrar Préstamo";
    btnSubmit.className = "btn btn-primary";
    btnCancelar.classList.add('d-none');
}

function actualizarInterfaz() {
    renderizarPrestamos();
}

// Inicialización
actualizarInterfaz();