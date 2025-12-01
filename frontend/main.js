
/** Maneja la traducción al hacer clic en el botón */
async function manejarTraduccion() {
    const texto = textoEntrada.value.trim();
    const origen = idiomaOrigenSelect.value;
    const destino = idiomaDestinoSelect.value;

    if (!texto) {
        mostrarEstado("Por favor, introduce texto para traducir.", 'error');
        setTimeout(ocultarEstado, 3000);
        return;
    }

    if (origen === destino) {
        mostrarEstado("El idioma de origen y destino deben ser diferentes.", 'error');
        setTimeout(ocultarEstado, 3000);
        return;
    }

    mostrarEstado("Traduciendo...");
    resultadoSalida.textContent = '';

    try {
        const response = await fetch(API_ENDPOINTS.translate, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                text: texto,
                sourceLang: origen,
                targetLang: destino
            })
        });

        const data = await response.json();

        if (!response.ok || data.error) {
            throw new Error(data.error || 'Traducción fallida, verifica la consola.');
        }

        resultadoSalida.textContent = data.texto_traducido;
        mostrarEstado("Traducción exitosa.", 'exito');
        setTimeout(ocultarEstado, 1500);

        await cargarHistorial();

    } catch (error) {
        console.error("Error en la traducción:", error);
        mostrarEstado(`Error: ${error.message}`, 'error');
    }
}

// ----------------------------------------------------------------------
// 4. HISTORIAL
// ----------------------------------------------------------------------

/** Crea un elemento LI para una traducción del historial */
function crearElementoHistorial(traduccion) {
    const li = document.createElement('li');
    li.dataset.id = traduccion.id;

    // Contenido de la traducción (usando la función para el nombre completo)
    li.innerHTML = `
        <p class="historial-texto">
            De (${obtenerNombreIdioma(traduccion.idioma_origen)}) - **${traduccion.texto_original.substring(0, 40)}...**
        </p>
        <p class="historial-resultado">
            A (${obtenerNombreIdioma(traduccion.idioma_destino)}) - ${traduccion.texto_traducido.substring(0, 40)}...
        </p>
        <button class="boton-eliminar" title="Eliminar traducción">🗑️</button>
    `;

    // Evento para el botón de eliminar
    li.querySelector('.boton-eliminar').addEventListener('click', () => {
        eliminarTraduccion(traduccion.id, li);
    });

    return li;
}

/** Carga y muestra todo el historial de traducciones */
async function cargarHistorial() {
    try {
        const response = await fetch(API_ENDPOINTS.translations);
        if (!response.ok) throw new Error('Error al obtener el historial.');

        const historial = await response.json();
        listaHistorial.innerHTML = ''; // Limpiar lista actual

        if (historial.length === 0) {
            listaHistorial.innerHTML = '<li class="marcador">Aún no hay traducciones.</li>';
        } else {
            historial.forEach(traduccion => {
                listaHistorial.appendChild(crearElementoHistorial(traduccion));
            });
        }
    } catch (error) {
        console.error("Error cargando historial:", error);
    }
}

/** Elimina una traducción específica */
async function eliminarTraduccion(id, elementoLi) {
    try {
        const response = await fetch(`${API_ENDPOINTS.translations}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Error al eliminar la traducción.');

        // Eliminar elemento de la UI si la API responde correctamente
        elementoLi.remove();

        if (listaHistorial.children.length === 0) {
            cargarHistorial();
        }

    } catch (error) {
        console.error("Error eliminando traducción:", error);
        mostrarEstado("Error al eliminar el elemento del historial.", 'error');
        setTimeout(ocultarEstado, 3000);
    }
}

/** Limpia todo el historial */
async function limpiarHistorial() {
    if (!confirm("¿Estás seguro de que deseas eliminar todo el historial de traducciones?")) {
        return;
    }

    mostrarEstado("Limpiando historial...");
    try {
        const response = await fetch(API_ENDPOINTS.translations, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Error al limpiar el historial.');

        await cargarHistorial();
        mostrarEstado("Historial limpiado exitosamente.", 'exito');
        setTimeout(ocultarEstado, 1500);

    } catch (error) {
        console.error("Error limpiando historial:", error);
        mostrarEstado("Error al limpiar el historial.", 'error');
    }
}

// ----------------------------------------------------------------------
// 5. EVENTOS
// ----------------------------------------------------------------------

/** Inicializa todos los event listeners */
function inicializarEventos() {
    botonTraducir.addEventListener('click', manejarTraduccion);
    botonLimpiarHistorial.addEventListener('click', limpiarHistorial);

    botonIntercambio.addEventListener('click', () => {
        const tempOrigen = idiomaOrigenSelect.value;
        idiomaOrigenSelect.value = idiomaDestinoSelect.value;
        idiomaDestinoSelect.value = tempOrigen;
    });

    // Permitir Enter para traducir en el textarea
    textoEntrada.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            manejarTraduccion();
        }
    });
}


// ----------------------------------------------------------------------
// INICIALIZACIÓN DE LA APLICACIÓN
// ----------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // 1. Cargar la lista de idiomas (ahora desde el mapa fijo)
    cargarIdiomas();

    // 2. Cargar y mostrar el historial guardado
    cargarHistorial();

    // 3. Configurar los manejadores de eventos
    inicializarEventos();
});

// Exportar para tests (solo si estamos en Node.js)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        obtenerNombreIdioma,
        crearElementoHistorial,
        manejarTraduccion,
        API_ENDPOINTS,
        MAPA_IDIOMAS
    };
}