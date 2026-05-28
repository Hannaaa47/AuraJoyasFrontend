<script setup>
import { computed, ref } from 'vue'
import { useSessionStore } from '@/modules/auth/stores/sessionStore'

const sessionStore  = useSessionStore()
const nombreUsuario = computed(() => sessionStore.nombreBienvenida)
const tipoPlan      = computed(() => sessionStore.tipoPlan)

const controlOpen = ref(false)
const userOpen    = ref(false)

function toggleControl() {
  controlOpen.value = !controlOpen.value
  if (controlOpen.value) userOpen.value = false
}

function toggleUser() {
  userOpen.value = !userOpen.value
  if (userOpen.value) controlOpen.value = false
}

function closeAll() {
  controlOpen.value = false
  userOpen.value    = false
}
</script>

<template>
  <header class="navbar" @mouseleave="closeAll">

    <div class="brand">
      <span class="gem">💎</span>
      <h1 class="brand-name">Aura Joyas</h1>
    </div>

    <nav class="links">
      <RouterLink to="/"         class="nav-link">Inicio</RouterLink>
      <RouterLink to="/catalogo" class="nav-link">Catálogo</RouterLink> 

      <div class="dropdown-wrap" :class="{ open: controlOpen }">
        <button class="nav-btn" @click="toggleControl">
          <span>Control avanzado</span>
          <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
        <div class="dropdown-menu" :class="{ visible: controlOpen }">
          <RouterLink to="/registros" class="dropdown-item" @click="closeAll">
            <span class="item-icon">📋</span><span>Registros</span>
          </RouterLink>
          <RouterLink to="/admin" class="dropdown-item" @click="closeAll">
            <span class="item-icon">⚙️</span><span>Admin</span>
          </RouterLink>
        </div>
      </div>

      <div class="dropdown-wrap" :class="{ open: userOpen }">
        <button class="nav-btn user-btn" @click="toggleUser">
          <div class="avatar">{{ nombreUsuario?.charAt(0) ?? '?' }}</div>
          <div class="user-info">
            <span class="user-name">{{ nombreUsuario ?? 'Usuario' }}</span>
            <small class="user-plan">{{ tipoPlan ?? 'Plan' }}</small>
          </div>
          <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
        <div class="dropdown-menu" :class="{ visible: userOpen }">
          <RouterLink to="/perfil" class="dropdown-item" @click="closeAll">
            <span class="item-icon">👤</span><span>Perfil</span>
          </RouterLink>
          <RouterLink to="/login" class="dropdown-item" @click="closeAll">
            <span class="item-icon">🔑</span><span>Login</span>
          </RouterLink>
        </div>
      </div>
    </nav>

  </header>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  height: 68px;
  background: linear-gradient(90deg, var(--color-bg-2), var(--color-bg-elevated));
  border-bottom: 1px solid var(--color-border);
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.gem {
  font-size: 26px;
  filter: drop-shadow(0 0 6px var(--color-gold-glow));
  animation: gemPulse 3s ease-in-out infinite;
}

.brand-name {
  margin: 0;
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--color-gold-light);
  line-height: 1.1;
}

.links {
  display: flex;
  align-items: center;
  gap: 6px;
}

.nav-link {
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--color-text);
  text-decoration: none;
  padding: 8px 16px;
  border-radius: var(--radius-sm);
  transition: background 0.2s, color 0.2s;
}

.nav-link:hover,
.nav-link.router-link-active {
  background: var(--color-gold-dim);
  color: var(--color-gold-light);
}

.dropdown-wrap { position: relative; }

.nav-btn {
  display: flex;
  align-items: center;
  gap: 7px;
  background: var(--color-border-soft);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: 8px 14px;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
  white-space: nowrap;
}

.nav-btn:hover,
.dropdown-wrap.open .nav-btn {
  background: var(--color-gold-dim);
  border-color: var(--color-gold);
  color: var(--color-gold-light);
}

.chevron {
  width: 14px;
  height: 14px;
  opacity: 0.7;
  transition: transform 0.25s ease;
}

.dropdown-wrap.open .chevron { transform: rotate(180deg); }

.dropdown-menu {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  min-width: 170px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 6px;
  box-shadow: var(--shadow-card);
  opacity: 0;
  transform: translateY(-6px) scale(0.97);
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.dropdown-menu.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: all;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  text-decoration: none;
  color: var(--color-text-muted);
  font-family: var(--font-body);
  font-size: 13.5px;
  font-weight: 600;
  letter-spacing: 0.03em;
  transition: background 0.18s, color 0.18s;
}

.dropdown-item:hover,
.dropdown-item.router-link-active {
  background: var(--color-gold-dim);
  color: var(--color-gold-light);
}

.item-icon { font-size: 15px; flex-shrink: 0; }

.user-btn { padding: 6px 12px 6px 8px; }

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-gold), #8a6e20);
  color: var(--color-bg);
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  text-transform: uppercase;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1.2;
}

.user-name {
  font-size: 13.5px;
  font-weight: 700;
  color: var(--color-gold-light);
}

.user-plan {
  font-size: 10.5px;
  color: var(--color-gold);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

@media (max-width: 820px) {
  .navbar {
    flex-wrap: wrap;
    height: auto;
    padding: 12px 16px;
    gap: 10px;
  }
  .links {
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>