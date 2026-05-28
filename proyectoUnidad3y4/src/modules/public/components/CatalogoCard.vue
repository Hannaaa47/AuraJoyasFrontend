<script setup>
defineProps({
  destacado: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['ver-detalle'])
</script>

<template>
  <article
    :class="['cat-card', { 'cat-card--destacada': destacado }]"
    @click="$emit('ver-detalle')"
  >
    <slot name="imagen" />

    <div class="card-inner">
      <div class="card-top">
        <slot name="badge" />
      </div>
      <div class="card-body">
        <slot name="titulo" />
        <slot />
      </div>
      <div class="card-footer">
        <slot name="footer" />
      </div>
    </div>
  </article>
</template>

<style scoped>
.cat-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.cat-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card), var(--shadow-glow);
  border-color: rgba(180, 150, 70, 0.4);
}

.cat-card--destacada {
  border-color: rgba(180, 150, 70, 0.45);
  background: linear-gradient(145deg, var(--color-bg-card), var(--color-bg-elevated));
}

.card-inner {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 18px 22px 22px;
  flex: 1;
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid var(--color-border-soft);
}
</style>