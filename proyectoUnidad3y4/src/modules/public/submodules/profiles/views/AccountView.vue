<script setup>
import { ref, computed } from 'vue'
import { useSessionStore } from '@/modules/auth/stores/sessionStore'
import { inject } from 'vue'

const sessionStore       = useSessionStore()
const nombreUsuarioGlobal = inject('nombreUsuarioGlobal')
const tipoPlanGlobal      = inject('tipoPlanGlobal')

const editando      = ref(false)
const nombreTemporal = ref('')

function iniciarEdicion() {
  nombreTemporal.value = sessionStore.nombreUsuario
  editando.value = true
}

function cancelarEdicion() {
  editando.value = false
  nombreTemporal.value = ''
}

function guardarNombre() {
  if (nombreTemporal.value.trim().length < 2) return
  sessionStore.iniciarSesion(nombreTemporal.value.trim())
  editando.value = false
}

const nombreValido = computed(() => nombreTemporal.value.trim().length >= 2)

const actividad = ref([
  { id: 1, accion: 'Consultó el catálogo',   fecha: 'Hoy, 10:32 am',    icono: '💎' },
  { id: 2, accion: 'Envió formulario de contacto', fecha: 'Hoy, 9:14 am', icono: '✉️' },
  { id: 3, accion: 'Inició sesión',           fecha: 'Ayer, 8:50 pm',    icono: '🔑' },
  { id: 4, accion: 'Visitó la página de inicio', fecha: 'Ayer, 8:48 pm', icono: '🏠' },
])

const beneficios = computed(() => {
  const base = [
    { texto: 'Acceso al catálogo completo', activo: true },
    { texto: 'Formulario de contacto',      activo: true },
    { texto: 'Historial de actividad',      activo: true },
  ]
  const premium = [
    { texto: 'Joya personalizada sin costo de diseño', activo: true },
    { texto: 'Envío prioritario',                      activo: true },
    { texto: 'Descuentos exclusivos',                  activo: true },
  ]
  return sessionStore.esPremium ? [...base, ...premium] : [
    ...base,
    { texto: 'Joya personalizada sin costo de diseño', activo: false },
    { texto: 'Envío prioritario',                      activo: false },
    { texto: 'Descuentos exclusivos',                  activo: false },
  ]
})
</script>

<template>
  <div class="perfil">

    <header class="perfil-header">
      <p class="eyebrow">✦ Mi cuenta</p>
      <h1>Perfil del usuario</h1>
      <div class="gold-line"></div>
    </header>

    <div class="perfil-grid">

      <section class="card identidad">
        <div class="avatar-wrap">
          <div class="avatar">{{ sessionStore.nombreUsuario?.charAt(0)?.toUpperCase() ?? '?' }}</div>
          <!-- v-if: badge de premium -->
          <span v-if="sessionStore.esPremium" class="badge-premium">⭐ Premium</span>
          <span v-else class="badge-basico">Básico</span>
        </div>

        <div v-if="!editando" class="identidad-info">
          <h2>{{ sessionStore.nombreUsuario }}</h2>
          <p class="dato-label">Plan actual</p>
          <p class="dato-valor plan">{{ tipoPlanGlobal }}</p>
          <p class="dato-label">Estado de sesión</p>
          <p class="dato-valor" :class="sessionStore.autenticado ? 'activo' : 'inactivo'">
            {{ sessionStore.autenticado ? '● Activo' : '● Sin sesión' }}
          </p>
          <div class="identidad-acciones">
            <button class="btn-secondary" @click="iniciarEdicion">✏️ Editar nombre</button>
          </div>
        </div>

        <div v-else class="identidad-edicion">
          <label for="nuevoNombre">Nuevo nombre</label>
          <input
            id="nuevoNombre"
            v-model="nombreTemporal"
            type="text"
            placeholder="Tu nombre"
            maxlength="50"
            @keyup.enter="guardarNombre"
            @keyup.escape="cancelarEdicion"
            :class="{ 'input-error': nombreTemporal && !nombreValido }"
          />
          <span v-if="nombreTemporal && !nombreValido" class="error-inline">Mínimo 2 caracteres</span>
          <div class="edicion-botones">
            <button class="btn-gold" :disabled="!nombreValido" @click="guardarNombre">Guardar</button>
            <button class="btn-secondary" @click="cancelarEdicion">Cancelar</button>
          </div>
        </div>
      </section>

      <section class="card beneficios">
        <h3>Beneficios de tu plan</h3>
        <p class="plan-actual">
          Plan <strong>{{ tipoPlanGlobal }}</strong>
        </p>
        <ul class="lista-beneficios">
          <li
            v-for="b in beneficios"
            :key="b.texto"
            :class="['beneficio-item', { 'beneficio-inactivo': !b.activo }]"
          >
            <span class="beneficio-icono">{{ b.activo ? '✓' : '✕' }}</span>
            {{ b.texto }}
          </li>
        </ul>
        <div v-if="!sessionStore.esPremium" class="upgrade-cta">
          <p>Desbloquea todos los beneficios</p>
          <button class="btn-gold" @click="sessionStore.cambiarPlan()">Subir a Premium ⭐</button>
        </div>
      </section>

      <section class="card actividad">
        <h3>Actividad reciente</h3>
        <div v-if="sessionStore.autenticado">
          <div
            v-for="item in actividad"
            :key="item.id"
            class="actividad-item"
          >
            <span class="act-icono">{{ item.icono }}</span>
            <div class="act-info">
              <p class="act-accion">{{ item.accion }}</p>
              <small>{{ item.fecha }}</small>
            </div>
          </div>
        </div>
        <div v-else class="sin-sesion">
          <p>Inicia sesión para ver tu historial de actividad.</p>
          <RouterLink to="/login" class="btn-gold">Iniciar sesión</RouterLink>
        </div>
      </section>

    </div>
  </div>
</template>

<style scoped>
.perfil {
  min-height: 100vh;
  padding: 60px 8% 80px;
}

.perfil-header { margin-bottom: 48px; }

.eyebrow {
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-gold);
  margin-bottom: 8px;
}

.perfil-header h1 {
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

.perfil-grid {
  display: grid;
  grid-template-columns: 320px 1fr;
  grid-template-rows: auto auto;
  gap: 24px;
  max-width: 1100px;
}

.card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 32px;
}

.identidad { grid-row: span 2; }

.avatar-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-gold), #8a6e20);
  color: var(--color-bg);
  font-size: 2.2rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 4px var(--color-gold-dim), var(--shadow-card);
}

.badge-premium {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 20px;
  background: var(--color-gold-dim);
  color: var(--color-gold);
  border: 1px solid var(--color-border);
}

.badge-basico {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 20px;
  background: var(--color-border-soft);
  color: var(--color-text-muted);
  border: 1px solid var(--color-border-soft);
}

.identidad-info h2 {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-gold-light);
  margin-bottom: 18px;
  text-align: center;
}

.dato-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-faint);
  margin-bottom: 4px;
}

.dato-valor {
  font-size: 14.5px;
  margin-bottom: 14px;
  font-weight: 600;
}

.dato-valor.plan    { color: var(--color-gold); }
.dato-valor.activo  { color: var(--color-success); }
.dato-valor.inactivo{ color: var(--color-error); }

.identidad-acciones {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.btn-gold, .btn-ghost, .btn-plan, .btn-secondary { width: 100%; }

.btn-plan {
  padding: 10px 22px;
  background: transparent;
  color: var(--color-text-muted);
  border: 1px solid var(--color-border-soft);
  border-radius: var(--radius-sm);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-plan:hover {
  border-color: var(--color-gold);
  color: var(--color-gold-light);
}

.identidad-edicion { display: flex; flex-direction: column; gap: 8px; }

.input-error {
  border-color: var(--color-error) !important;
  box-shadow: 0 0 0 3px var(--color-error-glow) !important;
}

.error-inline { font-size: 12px; color: var(--color-error); font-weight: 600; }

.edicion-botones { display: flex; flex-direction: column; gap: 8px; margin-top: 4px; }

.beneficios h3, .actividad h3 {
  font-size: 1.3rem;
  color: var(--color-gold-light);
  margin-bottom: 6px;
}

.plan-actual { font-size: 13px; margin-bottom: 20px; }

.lista-beneficios {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
}

.beneficio-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13.5px;
  font-weight: 600;
}

.beneficio-inactivo { opacity: 0.4; text-decoration: line-through; }

.beneficio-icono {
  font-size: 13px;
  font-weight: 700;
  color: var(--color-gold);
  width: 18px;
  text-align: center;
  flex-shrink: 0;
}

.beneficio-inactivo .beneficio-icono { color: var(--color-error); }

.upgrade-cta {
  border-top: 1px solid var(--color-border-soft);
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.upgrade-cta p { font-size: 13px; margin: 0; }

.actividad-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 0;
  border-bottom: 1px solid var(--color-border-soft);
}

.actividad-item:last-child { border-bottom: none; }

.act-icono {
  font-size: 20px;
  width: 36px;
  height: 36px;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.act-accion { font-size: 13.5px; font-weight: 600; margin: 0 0 2px; }

.act-info small { font-size: 11.5px; color: var(--color-text-faint); }

.sin-sesion {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 30px 0;
  text-align: center;
}

.sin-sesion p { font-size: 14px; }

@media (max-width: 900px) {
  .perfil-grid { grid-template-columns: 1fr; }
  .identidad   { grid-row: span 1; }
}

@media (max-width: 600px) {
  .perfil { padding: 40px 20px 60px; }
  .card   { padding: 22px 18px; }
}
</style>
