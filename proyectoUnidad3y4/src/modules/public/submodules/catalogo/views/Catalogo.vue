<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRecordsStore } from '@/modules/public/stores/recordsStore'
import CatalogoCard from '@/modules/public/components/CatalogoCard.vue'
 
const store = useRecordsStore()
 
const modalItem = ref(null)
 
onMounted(() => {
  store.cargarCatalogo()
})
 
const productos = computed(() => store.catalogoActivo)
 
function nivelPrecio(precio) {
  if (precio >= 300) return { label: 'Premium', clase: 'badge-premium' }
  if (precio >= 100) return { label: 'Estándar', clase: 'badge-estandar' }
  return              { label: 'Básico',   clase: 'badge-basico' }
}
 
function imagenUrl(imagen) {
  if (!imagen) return null
  return `/img/${imagen}`
}
 
function abrirModal(item) { modalItem.value = item }
function cerrarModal()    { modalItem.value = null }
</script>
 
<template>
  <div class="catalogo">
 
    <header class="cat-header">
      <p class="eyebrow">✦ Colección completa</p>
      <h1>Nuestro catálogo</h1>
      <p class="cat-sub">Descubre cada pieza de nuestra colección artesanal.</p>
    </header>
 
  
    <div v-if="store.cargandoCatalogo" class="estado-msg">
      <div class="spinner"></div>
      <p>Cargando colección...</p>
    </div>
 
    <div v-else-if="store.errorCatalogo" class="estado-msg error">
      <span>⚠️</span>
      <p>{{ store.errorCatalogo }}</p>
      <button class="btn-reintentar" @click="store.cargarCatalogo()">Reintentar</button>
    </div>

    <div v-else>
      <div v-if="productos.length === 0" class="sin-resultados">
        <span class="sin-icon">💎</span>
        <p>No hay productos disponibles por el momento.</p>
      </div>
 
      <div v-else class="productos vista-grid">
        <CatalogoCard
          v-for="item in productos"
          :key="item.id"
          @ver-detalle="abrirModal(item)"
        >
          <template #badge>
            <span :class="['badge-nivel', nivelPrecio(item.precio).clase]">
              {{ nivelPrecio(item.precio).label }}
            </span>
          </template>
 
          <template #imagen>
            <div class="card-imagen">
              <img
                v-if="imagenUrl(item.imagen)"
                :src="imagenUrl(item.imagen)"
                :alt="item.nombre"
                class="producto-img"
              />
              <div v-else class="producto-img-placeholder">💎</div>
            </div>
          </template>
 
          <template #titulo>
            <h3>{{ item.nombre }}</h3>
          </template>
 
          <p class="item-desc">{{ item.descripcion }}</p>
          <p class="item-existencia" :class="item.existencia > 0 ? 'en-stock' : 'sin-stock'">
            {{ item.existencia > 0 ? `${item.existencia} en existencia` : 'Sin existencia' }}
          </p>
 
          <template #footer>
            <span class="item-precio">${{ item.precio }}</span>
            <button class="btn-detalle" @click.stop="abrirModal(item)">Ver detalle</button>
          </template>
        </CatalogoCard>
      </div>
    </div>
 
    <div v-if="modalItem" class="modal-overlay" @click.self="cerrarModal">
      <div class="modal-card">
        <button class="modal-cerrar" @click="cerrarModal">✕</button>
 
        <div class="modal-imagen">
          <img
            v-if="imagenUrl(modalItem.imagen)"
            :src="imagenUrl(modalItem.imagen)"
            :alt="modalItem.nombre"
            class="modal-img"
          />
          <div v-else class="modal-img-placeholder">💎</div>
        </div>
 
        <div class="modal-header">
          <span :class="['badge-nivel', nivelPrecio(modalItem.precio).clase]">
            {{ nivelPrecio(modalItem.precio).label }}
          </span>
        </div>
 
        <h2 class="modal-titulo">{{ modalItem.nombre }}</h2>
        <div class="gold-line"></div>
        <p class="modal-descripcion">{{ modalItem.descripcion }}</p>
 
        <div class="modal-existencia" :class="modalItem.existencia > 0 ? 'en-stock' : 'sin-stock'">
          <span class="existencia-dot"></span>
          {{ modalItem.existencia > 0 ? `${modalItem.existencia} unidades disponibles` : 'Sin existencia' }}
        </div>
 
        <div class="modal-footer">
          <span class="modal-precio">${{ modalItem.precio }}</span>
        </div>
      </div>
    </div>
 
  </div>
</template>
 
<style scoped>
.catalogo {
  min-height: 100vh;
  width: 100%;
  padding: 60px 8% 80px;
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
}

.cat-header {
  margin-bottom: 48px;
}
 
.eyebrow {
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-gold);
  margin-bottom: 8px;
}
 
.cat-header h1 {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: var(--color-gold-light);
  margin: 0 0 8px;
}
 
.cat-sub {
  font-size: 14px;
  color: var(--color-text-muted);
  margin: 0;
}
 
.cat-sub strong { color: var(--color-gold); }

.estado-msg {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 80px 20px;
  text-align: center;
  color: var(--color-text-muted);
}
 
.estado-msg.error { color: #e07070; }
 
.spinner {
  width: 44px;
  height: 44px;
  border: 4px solid var(--color-border);
  border-top-color: var(--color-gold);
  border-radius: 50%;
  animation: girar 0.8s linear infinite;
}
 
@keyframes girar { to { transform: rotate(360deg); } }
 
.btn-reintentar {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  color: var(--color-gold-light);
  font-family: var(--font-body);
  padding: 9px 22px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-reintentar:hover { border-color: var(--color-gold); }

.sin-resultados {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 80px 20px;
  text-align: center;
  color: var(--color-text-muted);
}
 
.sin-icon { font-size: 40px; opacity: 0.5; }

.vista-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}
 
.badge-nivel {
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: 20px;
}
 
.badge-premium  { background: rgba(180,150,70,0.18); color: var(--color-gold); border: 1px solid rgba(180,150,70,0.3); }
.badge-estandar { background: rgba(74,144,217,0.15); color: #82bce8; border: 1px solid rgba(74,144,217,0.25); }
.badge-basico   { background: rgba(255,255,255,0.06); color: var(--color-text-muted); border: 1px solid var(--color-border-soft); }

.cat-card h3 {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--color-gold-light);
  margin: 0;
  line-height: 1.3;
}
 
.item-desc {
  font-size: 13px;
  color: var(--color-text-muted);
  margin: 0;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
 
.item-existencia {
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin: 0;
}
 
.en-stock { color: #6fcf97; }
.sin-stock { color: #e07070; }
 
.item-precio {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-gold);
}
 
.btn-detalle {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}
 
.btn-detalle:hover {
  border-color: var(--color-gold);
  color: var(--color-gold-light);
}
 
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(5, 10, 20, 0.75);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 20px;
}
 
.modal-card {
  background: var(--color-bg-card);
  border: 1px solid rgba(180,150,70,0.35);
  border-radius: var(--radius-xl);
  padding: 36px;
  width: 100%;
  max-width: 480px;
  position: relative;
  box-shadow: 0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(180,150,70,0.1);
  animation: aparecer 0.25s ease;
}
 
@keyframes aparecer {
  from { opacity: 0; transform: translateY(12px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
 
.modal-cerrar {
  position: absolute;
  top: 16px;
  right: 16px;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  padding: 0;
}
.modal-cerrar:hover { border-color: var(--color-gold); color: var(--color-gold); }
 
.modal-header {
  display: flex;
  gap: 8px;
  margin-bottom: 14px;
  flex-wrap: wrap;
}
 
.badge-destacado-modal {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: 20px;
  background: rgba(180,150,70,0.18);
  color: var(--color-gold);
  border: 1px solid rgba(180,150,70,0.3);
}
 
.modal-titulo {
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 700;
  color: var(--color-gold-light);
  margin: 0 0 6px;
}
 
.gold-line {
  width: 48px;
  height: 2px;
  background: linear-gradient(90deg, var(--color-gold), transparent);
  border-radius: 2px;
  margin: 14px 0;
}
 
.modal-descripcion {
  font-size: 14.5px;
  line-height: 1.75;
  color: var(--color-text-muted);
  margin: 0 0 20px;
}
 
.modal-existencia {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 20px;
}
 
.existencia-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
 
.modal-existencia.en-stock .existencia-dot { background: #6fcf97; box-shadow: 0 0 6px #6fcf97aa; }
.modal-existencia.sin-stock .existencia-dot { background: #e07070; }
 
.modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-top: 16px;
  border-top: 1px solid var(--color-border-soft);
}
 
.modal-precio {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-gold);
}
 
@media (max-width: 768px) {
  .catalogo { padding: 40px 20px 60px; }
  .vista-grid { grid-template-columns: 1fr; }
}
</style>