<script setup>
import { ref, computed } from 'vue'

const props = defineProps({ destacado: Boolean })
const emit  = defineEmits(['eliminar'])

const expandido  = ref(false)
const textoBoton = computed(() => expandido.value ? 'Compactar' : 'Expandir')

function alternarVista()  { expandido.value = !expandido.value }
function eliminarTarjeta() { emit('eliminar') }
</script>

<template>
  <article :class="['tarjeta', { 'tarjeta--destacada': props.destacado }]">
    <div class="encabezado">
      <div class="titulo">
        <slot name="titulo">
          <h2>Sin título</h2>
        </slot>
      </div>
      <div class="acciones">
        <button class="btn-alternar" @click="alternarVista">
          {{ expandido ? '▲' : '▼' }} {{ textoBoton }}
        </button>
        <button class="btn-eliminar" @click="eliminarTarjeta">✕ Eliminar</button>
      </div>
    </div>

    <p v-if="props.destacado" class="marca-destacado">⭐ Registro destacado</p>
    <p v-else class="marca-normal">Registro estándar</p>

    <div v-if="expandido" class="contenido">
      <slot>
        <p class="sin-info">No se proporcionó información.</p>
      </slot>
    </div>

    <div v-else class="compacto">
      <p>Haz clic en <strong>Expandir</strong> para ver los detalles.</p>
    </div>

  </article>
</template>

<style scoped>
.tarjeta {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 22px;
  box-shadow: var(--shadow-card);
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
}

.tarjeta:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card), var(--shadow-glow);
  border-color: rgba(180, 150, 70, 0.35);
}

.tarjeta--destacada {
  border-color: var(--color-gold-dim);
  background: linear-gradient(145deg, var(--color-bg-card), var(--color-bg-elevated));
}

.encabezado {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 14px;
}

.titulo h2 {
  margin: 0;
  font-size: 1.2rem;
  color: var(--color-gold-light);
}

.acciones {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  flex-shrink: 0;
}

.btn-alternar {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 7px 14px;
  color: var(--color-text-muted);
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-alternar:hover {
  background: var(--color-gold-dim);
  border-color: var(--color-gold);
  color: var(--color-gold-light);
}

.btn-eliminar {
  background: var(--color-error-bg);
  border: 1px solid var(--color-error-border);
  border-radius: var(--radius-sm);
  padding: 7px 14px;
  color: var(--color-error);
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-eliminar:hover {
  background: var(--color-error);
  border-color: var(--color-error);
  color: #fff;
}

.marca-destacado {
  margin-top: 12px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-gold);
}

.marca-normal {
  margin-top: 12px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-faint);
}

.contenido {
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid var(--color-border-soft);
}

.sin-info {
  font-size: 13.5px;
  font-style: italic;
}

.compacto {
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid var(--color-border-soft);
  font-size: 13px;
  font-style: italic;
}
</style>