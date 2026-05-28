<script setup>
import { ref, inject } from 'vue'
import { useSessionStore } from '@/modules/auth/stores/sessionStore'
import SessionForm from '@/modules/auth/components/SessionForm.vue'
import { enviarCorreoContacto } from '@/modules/auth/services/correoService'

const sessionStore   = useSessionStore()
const tipoPlanGlobal = inject('tipoPlanGlobal')

const nombre    = ref('')
const correo    = ref('')
const mensaje   = ref('')
const respuesta = ref('')
const cargando  = ref(false)

async function handleEnviar() {
  cargando.value = true
  const res = await enviarCorreoContacto({
    nombre:  nombre.value,
    correo:  correo.value,
    mensaje: mensaje.value
  })
  respuesta.value = res.mensaje
  cargando.value  = false
  nombre.value    = ''
  correo.value    = ''
  mensaje.value   = ''
}
</script>

<template>
  <div class="login-view">
    <header class="login-header">
      <p class="eyebrow">✦ Acceso</p>
      <h1>Iniciar sesión</h1>
      <div class="gold-line"></div>
    </header>

    <div class="login-grid">
      <div class="login-form-wrap">
        <SessionForm />
      </div>
    </div>

    <!-- Sección de contacto -->
    <div class="contacto-section">
      <header class="login-header">
        <p class="eyebrow">✦ Contacto</p>
        <h2>Envíanos un mensaje</h2>
        <div class="gold-line"></div>
      </header>

      <div class="contacto-form">
        <input
          v-model="nombre"
          class="campo"
          placeholder="Tu nombre"
          type="text"
        />
        <input
          v-model="correo"
          class="campo"
          placeholder="Tu correo"
          type="email"
        />
        <textarea
          v-model="mensaje"
          class="campo"
          placeholder="Tu mensaje"
          rows="4"
        />
        <button class="btn-enviar" :disabled="cargando" @click="handleEnviar">
          {{ cargando ? 'Enviando...' : 'Enviar mensaje' }}
        </button>
        <p v-if="respuesta" class="respuesta-msg">{{ respuesta }}</p>
      </div>
    </div>

  </div>
</template>

<style scoped>
.login-view {
  min-height: 100vh;
  padding: 60px 8% 80px;
}

.login-header { margin-bottom: 40px; }

.eyebrow {
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-gold);
  margin-bottom: 8px;
}

.login-header h1,
.login-header h2 {
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

.login-grid {
  display: flex;
  gap: 32px;
  align-items: flex-start;
  flex-wrap: wrap;
}

.login-form-wrap { flex-shrink: 0; }

/* Contacto */
.contacto-section { margin-top: 64px; }

.contacto-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 480px;
}

.campo {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 12px 16px;
  color: var(--color-gold-light);
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.campo:focus { border-color: var(--color-gold); }

.campo::placeholder { color: var(--color-text-faint); }

textarea.campo { resize: vertical; }

.btn-enviar {
  align-self: flex-start;
  padding: 10px 28px;
  background: var(--color-gold);
  color: #000;
  font-weight: 700;
  font-size: 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-enviar:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-enviar:hover:not(:disabled) { opacity: 0.85; }

.respuesta-msg {
  font-size: 13px;
  color: var(--color-success);
  margin: 0;
}

@media (max-width: 700px) {
  .login-grid { flex-direction: column; }
  .contacto-form { max-width: 100%; }
}
</style>