<script setup>
import { reactive, computed } from 'vue'
import { useSessionStore } from '@/modules/auth/stores/sessionStore'

const sessionStore = useSessionStore()
const form = reactive({ nombreUsuario: '' })

const puedeIngresar = computed(() => form.nombreUsuario.trim() !== '')

function enviarFormulario() {
  if (!puedeIngresar.value) return
  sessionStore.iniciarSesion(form.nombreUsuario)
  form.nombreUsuario = ''
}
</script>

<template>
  <form class="login-form" @submit.prevent="enviarFormulario">

    <div class="form-header">
      <span class="form-icon">💎</span>
      <h2>Bienvenido</h2>
      <p>Ingresa tu nombre para continuar</p>
    </div>

    <div class="campo">
      <label for="nombreUsuario">Nombre de usuario</label>
      <input
        id="nombreUsuario"
        v-model="form.nombreUsuario"
        type="text"
        placeholder="Escribe tu nombre"
        @keyup.enter="enviarFormulario"
        :class="{ 'input-error': form.nombreUsuario && !puedeIngresar }"
        autocomplete="off"
      />
    </div>

    <p v-if="!puedeIngresar" class="msg-warning">⚠ Ingresa un nombre de usuario</p>
    <p v-else class="msg-success">✓ Listo para ingresar</p>

    <button type="submit" class="btn-gold" :disabled="!puedeIngresar">
      Iniciar sesión
    </button>

  </form>
</template>

<style scoped>
.login-form {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 32px 28px;
  max-width: 340px;
  width: 100%;
  box-shadow: var(--shadow-card);
}

.form-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin-bottom: 28px;
  text-align: center;
}

.form-icon {
  font-size: 36px;
  filter: drop-shadow(0 0 8px var(--color-gold-glow));
}

.form-header h2 {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-gold-light);
  margin: 0;
}

.form-header p {
  font-size: 13px;
  color: var(--color-text-muted);
  margin: 0;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 10px;
}

.input-error {
  border-color: var(--color-error) !important;
  box-shadow: 0 0 0 3px var(--color-error-glow) !important;
}

.msg-warning {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--color-error);
  margin: 0 0 16px;
}

.msg-success {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--color-success);
  margin: 0 0 16px;
}

.btn-gold { width: 100%; }
</style>