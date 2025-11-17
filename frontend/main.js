// Referencias a elementos del DOM
const idiomaOrigenSelect = document.getElementById('idioma-origen');
const idiomaDestinoSelect = document.getElementById('idioma-destino');
const botonIntercambio = document.getElementById('boton-intercambio');
const textoInput = document.getElementById('texto-input');
const resultadoOutput = document.getElementById('resultado-output');
const botonTraducir = document.getElementById('boton-traducir');
const estadoMensaje = document.getElementById('estado-mensaje');
const listaHistorial = document.getElementById('lista-historial');
const botonLimpiarHistorial = document.getElementById('boton-limpiar-historial');

// URL base de la API
const API_URL = 'http://localhost:3000/api';

// Mapa de idiomas para mostrar nombres completos en la UI
const LANG_MAP = {
    'es': 'Español',
    'zh': 'Chino',
    'de': 'Alemán'
};

/* --- UTILIDADES Y ESTADO --- */

/**
 * Muestra un mensaje de estado (carga, error, éxito, etc.).
 */
function mostrarEstado(mensaje, tipo = 'info') {
    estadoMensaje.textContent = mensaje;
    estadoMensaje.className = '';
    
    if (tipo === 'loading') {
        estadoMensaje.classList.add('is-loading');
        estadoMensaje.classList.remove('hidden');
    } else if (tipo === 'error') {
        estadoMensaje.classList.add('is-error');
        estadoMensaje.classList.remove('hidden');
    } else if (tipo === 'success') {
        estadoMensaje.style.backgroundColor = '#d4edda'; // Verde claro para éxito
        estadoMensaje.style.color = '#155724';
        estadoMensaje.classList.remove('hidden');
        // Ocultar mensaje de éxito después de 3 segundos
        setTimeout(() => estadoMensaje.classList.add('hidden'), 3000);
    } else {
        estadoMensaje.classList.add('hidden');
    }
}

/**
 * Rellena los selectores de idioma.
 */
function cargarIdiomas() {
    const idiomas = Object.keys(LANG_MAP);

    idiomas.forEach(codigo => {
        const nombre = LANG_MAP[codigo];
        const opcionOrigen = new Option(nombre, codigo);
        const opcionDestino = new Option(nombre, codigo);
        
        idiomaOrigenSelect.add(opcionOrigen);
        idiomaDestinoSelect.add(opcionDestino);
    });

    idiomaOrigenSelect.value = 'es';
    idiomaDestinoSelect.value = 'de';
}

/**
 * Intercambia los valores de los selectores de idioma.
 */
function intercambiarIdiomas() {
    const temp = idiomaOrigenSelect.value;
    idiomaOrigenSelect.value = idiomaDestinoSelect.value;
    idiomaDestinoSelect.value = temp;
}


/* --- LÓGICA DE TRADUCCIÓN --- */

/**
 * Envía la solicitud de traducción al backend.
 */
async function manejarTraduccion() {
    const texto = textoInput.value.trim();
    const origen = idiomaOrigenSelect.value;
    const destino = idiomaDestinoSelect.value;

    if (!texto) {
        mostrarEstado("Error: El campo de texto no puede estar vacío.", 'error');
        return;
    }
    if (origen === destino) {
        mostrarEstado("Error: Los idiomas de origen y destino deben ser diferentes.", 'error');
        return;
    }

    mostrarEstado("Traduciendo, por favor espere...", 'loading');
    botonTraducir.disabled = true;

    try {
        const response = await fetch(`${API_URL}/translate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ texto, origen, destino })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Ocurrió un error en el servidor.');
        }

        resultadoOutput.textContent = data.traduccion;
        mostrarEstado('Traducción exitosa.', 'success'); 

        // Después de la traducción exitosa, recargar el historial (Fase 3)
        await cargarHistorial(); 

    } catch (error) {
        resultadoOutput.textContent = "Error de Traducción.";
        mostrarEstado(`Fallo al conectar: ${error.message}`, 'error');
    } finally {
        botonTraducir.disabled = false;
    }
}


/* --- LÓGICA DEL HISTORIAL (FASE 3) --- */

/**
 * Renderiza el historial de traducciones en la lista HTML.
 */
function renderizarHistorial(traducciones) {
    listaHistorial.innerHTML = ''; // Limpiar la lista actual

    if (traducciones.length === 0) {
        listaHistorial.innerHTML = '<li class="placeholder">Aún no hay traducciones guardadas.</li>';
        return;
    }

    traducciones.forEach(item => {
        const li = document.createElement('li');
        li.dataset.id = item.id;
        
        // Texto de origen y destino
        li.innerHTML = `
            <div>
                <strong>${LANG_MAP[item.origen.toLowerCase()] || item.origen} → ${LANG_MAP[item.destino.toLowerCase()] || item.destino}</strong>
                <p class="historial-texto">${item.texto.substring(0, 40)}...</p>
                <p class="historial-resultado">${item.traduccion.substring(0, 40)}...</p>
            </div>
            <button class="boton-eliminar" data-id="${item.id}" title="Eliminar traducción">🗑️</button>
        `;

        // Asignar listener al botón de eliminar individual (delegación simple)
        const botonEliminar = li.querySelector('.boton-eliminar');
        botonEliminar.addEventListener('click', () => manejarEliminarTraduccion(item.id));
        
        listaHistorial.appendChild(li);
    });
}

/**
 * Obtiene el historial de traducciones del backend (GET /api/translations).
 */
async function cargarHistorial() {
    try {
        const response = await fetch(`${API_URL}/translations`);
        
        if (!response.ok) {
            throw new Error('No se pudo cargar el historial.');
        }

        const data = await response.json();
        renderizarHistorial(data);

    } catch (error) {
        console.error("Error cargando historial:", error);
        listaHistorial.innerHTML = `<li class="placeholder is-error">Error al cargar el historial.</li>`;
    }
}

/**
 * Elimina una traducción individual (DELETE /api/translations/:id).
 */
async function manejarEliminarTraduccion(id) {
    if (!confirm('¿Estás seguro de que quieres eliminar esta traducción del historial?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/translations/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Fallo al eliminar la traducción.');
        }

        mostrarEstado('Traducción eliminada.', 'success');
        await cargarHistorial(); // Recargar la lista

    } catch (error) {
        mostrarEstado(`Error al eliminar: ${error.message}`, 'error');
    }
}

/**
 * Elimina todo el historial (DELETE /api/translations).
 */
async function manejarLimpiezaHistorial() {
    if (!confirm('¿Estás seguro de que quieres borrar TODO el historial de traducciones? Esta acción es irreversible.')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/translations`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Fallo al limpiar el historial.');
        }

        mostrarEstado('Historial de traducciones limpiado.', 'success');
        await cargarHistorial(); // Recargar la lista (debería mostrar el placeholder)

    } catch (error) {
        mostrarEstado(`Error al limpiar el historial: ${error.message}`, 'error');
    }
}


/* --- FUNCIÓN DE INICIO --- */

/**
 * Función que inicializa la aplicación: carga datos y añade listeners.
 */
function iniciar() {
    // 1. Cargar datos iniciales (Idiomas y Historial)
    cargarIdiomas();
    cargarHistorial(); // Inicia cargando el historial

    // 2. Asignar Event Listeners
    botonTraducir.addEventListener('click', manejarTraduccion);
    botonIntercambio.addEventListener('click', intercambiarIdiomas);

    // Listener para limpiar todo el historial (Checklist 3.3)
    botonLimpiarHistorial.addEventListener('click', manejarLimpiezaHistorial); 
}

// 3. Ejecutar la función de inicio cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', iniciar);