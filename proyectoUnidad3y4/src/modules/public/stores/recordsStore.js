import { defineStore } from "pinia";
import { ref, computed } from 'vue'

const URL_BACKEND = "https://aurajoyasbackend.onrender.com"

export const useRecordsStore = defineStore('registros', () => {

    const categorias = ref(['Servicios', 'Productos', 'Citas', 'Clientes', 'Inventario', 'Soporte'])
    const tipos      = ref(['General', 'Preventivo', 'Correctivo', 'Venta', 'Reservación', 'Consulta'])

    const registros = ref([])
    const mensaje   = ref("")
    const error     = ref("")
    const cargando  = ref(false)

    const registrosActivos = computed(() =>
        registros.value.filter(item => item.activo == 1)
    )

    const totalElementos  = computed(() => registrosActivos.value.length)
    const totalDestacados = computed(() =>
        registrosActivos.value.filter(item => item.destacado == 1 || item.destacado === true).length
    )
    const promedioValor = computed(() => {
        if (registrosActivos.value.length === 0) return 0
        const suma = registrosActivos.value.reduce((acc, item) => acc + Number(item.precio), 0)
        return (suma / registrosActivos.value.length).toFixed(1)
    })

    async function cargarRegistros() {
        cargando.value = true
        error.value    = ""
        try {
            const respuesta = await fetch(`${URL_BACKEND}/registros`)
            const datos     = await respuesta.json()
            if (!respuesta.ok) throw new Error(datos.mensaje || "No se pudieron cargar los registros")
            registros.value = datos
        } catch (err) {
            error.value = err.message
        } finally {
            cargando.value = false
        }
    }

    async function agregarRegistro(nuevoRegistro) {
        mensaje.value = ""
        error.value   = ""
        try {
            const respuesta = await fetch(`${URL_BACKEND}/registros`, {
                method:  "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nombre:      nuevoRegistro.nombre,
                    categoria:   nuevoRegistro.categoria,
                    descripcion: nuevoRegistro.descripcion,
                    precio:      Number(nuevoRegistro.precio),
                    activo:      nuevoRegistro.activo    ? 1 : 0,
                    destacado:   nuevoRegistro.destacado ? 1 : 0
                })
            })
            const resultado = await respuesta.json()
            if (!respuesta.ok) {
                const detalle = resultado.errores ? resultado.errores.join(', ') : resultado.mensaje || 'No se pudo agregar el registro'
                throw new Error(detalle)
            }
            mensaje.value = resultado.mensaje
            await cargarRegistros()
        } catch (err) {
            error.value = err.message
        }
    }

    async function desactivarRegistro(id) {
        mensaje.value = ""
        error.value   = ""
        try {
            const respuesta = await fetch(`${URL_BACKEND}/registros/${id}/desactivar`, { method: 'PUT' })
            const resultado = await respuesta.json()
            if (!respuesta.ok) {
                const detalle = resultado.errores ? resultado.errores.join(', ') : resultado.mensaje || 'No se pudo desactivar el registro'
                throw new Error(detalle)
            }
            mensaje.value = resultado.mensaje
            await cargarRegistros()
        } catch (err) {
            error.value = err.message
        }
    }

    async function eliminarRegistro(id) {
        mensaje.value = ""
        error.value   = ""
        try {
            const respuesta = await fetch(`${URL_BACKEND}/registros/${id}`, { method: "DELETE" })
            const resultado = await respuesta.json()
            if (!respuesta.ok) throw new Error(resultado.mensaje || "No se pudo eliminar el registro")
            mensaje.value = resultado.mensaje
            await cargarRegistros()
        } catch (err) {
            error.value = err.message
        }
    }

    function reemplazarRegistros(datos) {
        registros.value = datos.map(item => ({
            id: item.id ?? Date.now() + Math.random(), ...item
        }))
    }

    const catalogo        = ref([])
    const mensajeCatalogo = ref("")
    const errorCatalogo   = ref("")
    const cargandoCatalogo = ref(false)

    const catalogoActivo = computed(() =>
        catalogo.value.filter(item => item.activo == 1)
    )

    const totalProductos   = computed(() => catalogoActivo.value.length)
    const totalExistencia  = computed(() =>
        catalogoActivo.value.reduce((acc, item) => acc + Number(item.existencia ?? 0), 0)
    )
    const promedioPrecioCatalogo = computed(() => {
        if (catalogoActivo.value.length === 0) return 0
        const suma = catalogoActivo.value.reduce((acc, item) => acc + Number(item.precio), 0)
        return (suma / catalogoActivo.value.length).toFixed(1)
    })

    async function cargarCatalogo() {
        cargandoCatalogo.value = true
        errorCatalogo.value    = ""
        try {
            const respuesta = await fetch(`${URL_BACKEND}/catalogo`)
            const datos     = await respuesta.json()
            if (!respuesta.ok) throw new Error(datos.mensaje || "No se pudo cargar el catálogo")
            catalogo.value = datos
        } catch (err) {
            errorCatalogo.value = err.message
        } finally {
            cargandoCatalogo.value = false
        }
    }

    async function agregarProducto(nuevoProducto) {
        mensajeCatalogo.value = ""
        errorCatalogo.value   = ""
        try {
            const respuesta = await fetch(`${URL_BACKEND}/catalogo`, {
                method:  "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nombre:      nuevoProducto.nombre,
                    descripcion: nuevoProducto.descripcion,
                    precio:      Number(nuevoProducto.precio),
                    existencia:  Number(nuevoProducto.existencia ?? 0),
                    imagen:      nuevoProducto.imagen ?? null,
                    activo:      1
                })
            })
            const resultado = await respuesta.json()
            if (!respuesta.ok) {
                const detalle = resultado.errores ? resultado.errores.join(', ') : resultado.mensaje || 'No se pudo agregar el producto'
                throw new Error(detalle)
            }
            mensajeCatalogo.value = resultado.mensaje
            await cargarCatalogo()
        } catch (err) {
            errorCatalogo.value = err.message
        }
    }

    async function actualizarProducto(id, datos) {
        mensajeCatalogo.value = ""
        errorCatalogo.value   = ""
        try {
            const respuesta = await fetch(`${URL_BACKEND}/catalogo/${id}`, {
                method:  "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nombre:      datos.nombre,
                    descripcion: datos.descripcion,
                    precio:      Number(datos.precio),
                    existencia:  Number(datos.existencia ?? 0),
                    imagen:      datos.imagen ?? null
                })
            })
            const resultado = await respuesta.json()
            if (!respuesta.ok) {
                const detalle = resultado.errores ? resultado.errores.join(', ') : resultado.mensaje || 'No se pudo actualizar el producto'
                throw new Error(detalle)
            }
            mensajeCatalogo.value = resultado.mensaje
            await cargarCatalogo()
        } catch (err) {
            errorCatalogo.value = err.message
        }
    }

    async function desactivarProducto(id) {
        mensajeCatalogo.value = ""
        errorCatalogo.value   = ""
        try {
            const respuesta = await fetch(`${URL_BACKEND}/catalogo/${id}/desactivar`, { method: 'PUT' })
            const resultado = await respuesta.json()
            if (!respuesta.ok) {
                const detalle = resultado.errores ? resultado.errores.join(', ') : resultado.mensaje || 'No se pudo desactivar el producto'
                throw new Error(detalle)
            }
            mensajeCatalogo.value = resultado.mensaje
            await cargarCatalogo()
        } catch (err) {
            errorCatalogo.value = err.message
        }
    }

    return {
        // registros
        categorias, tipos,
        registros, registrosActivos,
        mensaje, error, cargando,
        totalElementos, totalDestacados, promedioValor,
        cargarRegistros, agregarRegistro, desactivarRegistro, eliminarRegistro, reemplazarRegistros,

        // catálogo
        catalogo, catalogoActivo,
        mensajeCatalogo, errorCatalogo, cargandoCatalogo,
        totalProductos, totalExistencia, promedioPrecioCatalogo,
        cargarCatalogo, agregarProducto, actualizarProducto, desactivarProducto
    }
})