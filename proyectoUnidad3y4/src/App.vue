<script setup>
import { provide, computed } from 'vue'
import { useSessionStore } from '@/modules/auth/stores/sessionStore'
import MainNavbar from '@/modules/public/components/MainNavbar.vue'
import MainFooter from '@/modules/public/components/MainFooter.vue'

const sessionStore        = useSessionStore()
const nombreUsuarioGlobal = computed(() => sessionStore.nombreBienvenida)
const tipoPlanGlobal      = computed(() => sessionStore.tipoPlan)

provide('nombreUsuarioGlobal', nombreUsuarioGlobal)
provide('tipoPlanGlobal', tipoPlanGlobal)
</script>

<template>
  <div class="app-shell">
    <MainNavbar />
    <main class="contenedor-pagina">
      <RouterView />
    </main>
    <MainFooter />
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg);
}

.contenedor-pagina {
  flex: 1;
  width: 100%;
}
</style>