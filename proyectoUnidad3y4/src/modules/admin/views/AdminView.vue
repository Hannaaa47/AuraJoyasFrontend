<script setup>
import { inject } from 'vue'
import { useSessionStore } from '@/modules/auth/stores/sessionStore'
import { useControlStore } from '@/modules/admin/stores/controlStore'

const sessionStore        = useSessionStore()
const controlStore        = useControlStore()
const nombreUsuarioGlobal = inject('nombreUsuarioGlobal')
</script>

<template>
  <div class="admin">

    <header class="admin-header">
      <div>
        <p class="eyebrow">✦ Zona restringida</p>
        <h1>Panel administrativo</h1>
      </div>
      <span
        class="sesion-badge"
        :class="sessionStore.autenticado ? 'sesion-activa' : 'sesion-inactiva'"
      >
        {{ sessionStore.autenticado ? '● Sesión activa' : '● Sin sesión' }}
      </span>
    </header>

    <div class="gold-line"></div>

    <div class="stats-grid">

      <div class="stat-card">
        <span class="stat-icon">👤</span>
        <div class="stat-info">
          <p class="stat-label">Usuario global</p>
          <p class="stat-valor">{{ nombreUsuarioGlobal ?? 'Invitado' }}</p>
        </div>
      </div>

      <div class="stat-card">
        <span class="stat-icon">🔑</span>
        <div class="stat-info">
          <p class="stat-label">Autenticado</p>
          <p class="stat-valor" :class="sessionStore.autenticado ? 'texto-activo' : 'texto-inactivo'">
            {{ sessionStore.autenticado ? 'Sí' : 'No' }}
          </p>
        </div>
      </div>

      <div class="stat-card">
        <span class="stat-icon">⭐</span>
        <div class="stat-info">
          <p class="stat-label">Plan</p>
          <p class="stat-valor">{{ sessionStore.tipoPlan }}</p>
        </div>
      </div>

    </div>

    <section class="acciones">
      <h2>Acciones</h2>
      <div class="acciones-grid">
        <RouterLink to="/registros" class="accion-card">
          <span class="accion-icon">📋</span>
          <span>Gestionar registros</span>
        </RouterLink>
        <RouterLink to="/catalogo" class="accion-card">
          <span class="accion-icon">💎</span>
          <span>Ver catálogo</span>
        </RouterLink>
        <RouterLink to="/perfil" class="accion-card">
          <span class="accion-icon">👤</span>
          <span>Mi perfil</span>
        </RouterLink>
      </div>
    </section>

  </div>
</template>

<style scoped>
.admin {
  min-height: 100vh;
  padding: 60px 8% 80px;
}

.admin-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
}

.eyebrow {
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-gold);
  margin-bottom: 8px;
}

.admin-header h1 {
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 700;
  color: var(--color-gold-light);
  margin: 0;
}

.sesion-badge {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 6px 14px;
  border-radius: 20px;
  border: 1px solid;
  align-self: center;
}

.sesion-activa {
  color: var(--color-success);
  border-color: var(--color-success);
  background: rgba(92, 184, 92, 0.08);
}

.sesion-inactiva {
  color: var(--color-error);
  border-color: var(--color-error);
  background: var(--color-error-bg);
}

.gold-line {
  width: 52px;
  height: 2px;
  background: linear-gradient(90deg, var(--color-gold), transparent);
  border-radius: 2px;
  margin-bottom: 40px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 48px;
}

.stat-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 22px 20px;
  transition: transform 0.2s, border-color 0.2s;
}

.stat-card:hover {
  transform: translateY(-3px);
  border-color: var(--color-gold);
}

.stat-card--highlight {
  border-color: var(--color-gold-dim);
  background: linear-gradient(135deg, var(--color-bg-card), var(--color-bg-elevated));
}

.stat-icon { font-size: 26px; flex-shrink: 0; }

.stat-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-faint);
  margin: 0 0 4px;
}

.stat-valor {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-gold-light);
  margin: 0;
}

.stat-numero {
  font-family: var(--font-display);
  font-size: 2rem;
  color: var(--color-gold);
}

.texto-activo   { color: var(--color-success); }
.texto-inactivo { color: var(--color-error); }

.notif-badge {
  position: absolute;
  top: 12px;
  right: 14px;
  background: var(--color-error);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
}

.acciones h2 {
  font-size: 1.3rem;
  color: var(--color-gold-light);
  margin-bottom: 18px;
}

.acciones-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
}

.accion-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 22px 16px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  color: var(--color-text-muted);
  font-size: 13.5px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
}

.accion-card:hover {
  background: var(--color-gold-dim);
  border-color: var(--color-gold);
  color: var(--color-gold-light);
  transform: translateY(-3px);
}

.accion-icon { font-size: 24px; }

@media (max-width: 600px) {
  .admin      { padding: 40px 20px 60px; }
  .stats-grid { grid-template-columns: 1fr 1fr; }
}
</style>