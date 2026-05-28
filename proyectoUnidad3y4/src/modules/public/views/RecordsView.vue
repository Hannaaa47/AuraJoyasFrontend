<script setup>
import { reactive, computed, onMounted, ref } from 'vue'
import { useRecordsStore } from '@/modules/public/stores/recordsStore'
import ItemCard from '@/modules/public/components/ItemCard.vue'

const store = useRecordsStore()

const form = reactive({
  nombre: '', descripcion: '', precio: 1, existencia: 0, imagen: ''
})

const guardando          = ref(false)
const errorCarga         = ref('')
const mensajeEnvio       = ref('')
const eliminando         = ref(false)
const productoEliminando = ref('')

const formularioValido = computed(() =>
  form.nombre.trim() !== '' &&
  form.descripcion.trim() !== '' &&
  Number(form.precio) > 0 &&
  Number(form.existencia) >= 0
)

async function agregarProducto() {
  if (!formularioValido.value) return

  guardando.value    = true
  errorCarga.value   = ''
  mensajeEnvio.value = ''

  try {
    await store.agregarProducto({
      nombre:      form.nombre,
      descripcion: form.descripcion,
      precio:      Number(form.precio),
      existencia:  Number(form.existencia),
      imagen:      form.imagen.trim() || null,
    })

    if (store.errorCatalogo) { errorCarga.value = store.errorCatalogo; return }

    mensajeEnvio.value = store.mensajeCatalogo
    Object.assign(form, { nombre: '', descripcion: '', precio: 1, existencia: 0, imagen: '' })
    sessionStorage.setItem('ultimaVista', 'catalogo')
  } finally {
    guardando.value = false
  }
}

onMounted(() => store.cargarCatalogo())

async function confirmarDesactivacion(item) {
  const confirmar = window.confirm(`¿Seguro que deseas quitar "${item.nombre}" del catálogo?`)
  if (!confirmar) return

  eliminando.value         = true
  productoEliminando.value = item.nombre

  try {
    await store.desactivarProducto(item.id)
  } finally {
    eliminando.value         = false
    productoEliminando.value = ''
  }
}
</script>

<template>
  <div class="registros">

    <header class="registros-header">
      <div>
        <p class="eyebrow">✦ Gestión</p>
        <h1>Catálogo de productos</h1>
      </div>
      <div class="gold-line"></div>
    </header>

    <p v-if="store.cargandoCatalogo" class="aviso-carga">⏳ Cargando catálogo...</p>
    <p v-else-if="store.errorCatalogo" class="aviso-error">⚠ {{ store.errorCatalogo }}</p>

    <div class="resumen">
      <div class="stat-card">
        <span class="stat-icon">📋</span>
        <div>
          <p class="stat-label">Total productos</p>
          <strong class="stat-valor">{{ store.totalProductos }}</strong>
        </div>
      </div>
      <div class="stat-card">
        <span class="stat-icon">📦</span>
        <div>
          <p class="stat-label">En existencia</p>
          <strong class="stat-valor">{{ store.totalExistencia }}</strong>
        </div>
      </div>
    </div>
    
    <form class="formulario" @submit.prevent="agregarProducto">
      <h2>Agregar producto</h2>

      <div class="form-grid">
        <div class="campo campo-full">
          <label for="nombre">Nombre</label>
          <input
            id="nombre"
            v-model="form.nombre"
            type="text"
            placeholder="Nombre del producto"
          />
        </div>

        <div class="campo campo-full">
          <label for="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            v-model="form.descripcion"
            placeholder="Describe el producto"
            rows="3"
          ></textarea>
        </div>

        <div class="campo">
          <label for="precio">Precio ($)</label>
          <input id="precio" v-model="form.precio" type="number" min="1" />
        </div>

        <div class="campo">
          <label for="existencia">Existencia</label>
          <input id="existencia" v-model="form.existencia" type="number" min="0" />
        </div>

        <div class="campo campo-full">
          <label for="imagen">Imagen <span class="campo-opcional">(opcional)</span></label>
          <input
            id="imagen"
            v-model="form.imagen"
            type="text"
            placeholder="nombre-archivo.jpg"
          />
          <small class="campo-hint">Coloca el archivo en <code>public/img/</code> y escribe solo el nombre aquí.</small>
        </div>
      </div>

      <p v-if="!formularioValido" class="msg-warning">
        ⚠ Completa correctamente nombre, descripción, precio y existencia.
      </p>
      <p v-else class="msg-success">✓ El formulario está listo para enviarse</p>
      <p v-if="mensajeEnvio" class="msg-success">✓ {{ mensajeEnvio }}</p>
      <p v-if="errorCarga" class="msg-error">⚠ {{ errorCarga }}</p>

      <button type="submit" class="btn-gold" :disabled="!formularioValido || guardando">
        <span v-if="guardando">Guardando...</span>
        <span v-else>Agregar producto</span>
      </button>
    </form>

    <div v-if="store.catalogoActivo.length > 0" class="lista">
      <ItemCard
        v-for="item in store.catalogoActivo"
        :key="item.id"
        @eliminar="confirmarDesactivacion(item)"
      >
        <template #titulo>
          <h2>{{ item.nombre }}</h2>
        </template>

        <div class="item-imagen-row" v-if="item.imagen">
          <img :src="`/img/${item.imagen}`" :alt="item.nombre" class="item-thumb" />
        </div>

        <p><strong>Descripción:</strong> {{ item.descripcion }}</p>
        <p><strong>Precio:</strong> ${{ item.precio }}</p>
        <p>
          <strong>Existencia: </strong>
          <span :class="item.existencia > 0 ? 'en-stock' : 'sin-stock'">
            {{ item.existencia > 0 ? `${item.existencia} unidades` : 'Sin existencia' }}
          </span>
        </p>
        <p v-if="item.precio >= 300"     class="nivel-alto">💎 Valor alto</p>
        <p v-else-if="item.precio >= 100" class="nivel-medio">✦ Valor medio</p>
        <p v-else                         class="nivel-bajo">· Valor básico</p>
      </ItemCard>
    </div>

    <div v-else class="sin-contenido">
      <span>💎</span>
      <p>No hay productos en el catálogo</p>
    </div>

    <div v-if="guardando" class="overlay">
      <div class="modal-overlay-card">
        <div class="spinner"></div>
        <h3>Guardando producto</h3>
        <p>Procesando información en el servidor...</p>
      </div>
    </div>

    <div v-if="eliminando" class="overlay">
      <div class="modal-overlay-card">
        <div class="spinner spinner--error"></div>
        <h3>Ocultando producto</h3>
        <small>Actualizando estado: <strong>{{ productoEliminando }}</strong></small>
      </div>
    </div>

  </div>
</template>

<style scoped>
.registros {
  min-height: 100vh;
  padding: 60px 8% 80px;
}

.registros-header { margin-bottom: 36px; }

.eyebrow {
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-gold);
  margin-bottom: 8px;
}

.registros-header h1 {
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 700;
  color: var(--color-gold-light);
  margin-bottom: 12px;
}

.gold-line {
  width: 52px;
  height: 2px;
  background: linear-gradient(90deg, var(--color-gold), transparent);
  border-radius: 2px;
}

.aviso-carga { color: var(--color-text-muted); font-style: italic; margin-bottom: 16px; }
.aviso-error { color: var(--color-error); font-weight: 600; margin-bottom: 16px; }

.resumen {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 14px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 20px;
  transition: transform 0.2s, border-color 0.2s;
}

.stat-card:hover { transform: translateY(-3px); border-color: var(--color-gold); }
.stat-icon { font-size: 24px; flex-shrink: 0; }

.stat-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-faint);
  margin: 0 0 4px;
}

.stat-valor {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-gold);
}

.formulario {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 32px;
  margin-bottom: 32px;
  box-shadow: var(--shadow-card);
}

.formulario h2 {
  font-size: 1.3rem;
  color: var(--color-gold-light);
  margin: 0 0 24px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

.campo { display: flex; flex-direction: column; gap: 6px; }
.campo-full { grid-column: 1 / -1; }
textarea { resize: vertical; }

.campo-opcional {
  font-size: 11px;
  font-weight: 400;
  color: var(--color-text-faint);
  text-transform: none;
  letter-spacing: 0;
}

.campo-hint {
  font-size: 11.5px;
  color: var(--color-text-faint);
  margin-top: 2px;
}

.campo-hint code {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-soft);
  border-radius: 4px;
  padding: 1px 5px;
  font-size: 11px;
  color: var(--color-gold);
}

.msg-warning { font-size: 13px; color: var(--color-error);   font-weight: 600; margin-bottom: 12px; }
.msg-success { font-size: 13px; color: var(--color-success); font-weight: 600; margin-bottom: 12px; }
.msg-error   { font-size: 13px; color: var(--color-error);   font-weight: 600; margin-bottom: 12px; }

.lista { display: grid; gap: 16px; }

.item-imagen-row {
  margin-bottom: 6px;
}

.item-thumb {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid var(--color-border);
}

.en-stock  { color: #6fcf97; font-weight: 700; }
.sin-stock { color: #e07070; font-weight: 700; }

.nivel-alto  { font-size: 12.5px; color: var(--color-gold);       font-weight: 700; margin: 4px 0 0; }
.nivel-medio { font-size: 12.5px; color: var(--color-text-muted); font-weight: 600; margin: 4px 0 0; }
.nivel-bajo  { font-size: 12.5px; color: var(--color-text-faint); margin: 4px 0 0; }

.sin-contenido {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 60px 20px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  text-align: center;
  font-size: 20px;
  color: var(--color-text-faint);
}

.sin-contenido p { font-size: 14px; margin: 0; }

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(5, 10, 20, 0.65);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-overlay-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 36px 32px;
  width: 360px;
  max-width: 90%;
  text-align: center;
  box-shadow: var(--shadow-card);
  animation: aparecerModal 0.25s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.modal-overlay-card h3 { color: var(--color-gold-light); margin: 0; }
.modal-overlay-card p  { color: var(--color-text-muted); font-size: 13.5px; margin: 0; }
.modal-overlay-card small { color: var(--color-text-faint); font-size: 12.5px; }

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid var(--color-border);
  border-top-color: var(--color-gold);
  border-radius: 50%;
  animation: girar 0.8s linear infinite;
}

.spinner--error { border-top-color: var(--color-error); }

@keyframes girar { to { transform: rotate(360deg); } }

@keyframes aparecerModal {
  from { opacity: 0; transform: translateY(10px) scale(0.96); }
  to   { opacity: 1; transform: translateY(0)    scale(1); }
}

@media (max-width: 640px) {
  .registros { padding: 40px 20px 60px; }
  .form-grid { grid-template-columns: 1fr; }
  .campo-full { grid-column: 1; }
}
</style>