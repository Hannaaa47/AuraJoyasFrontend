<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">

    <div class="footer-inner">
      <div class="col-brand">
        <div class="brand">
          <span class="gem">💎</span>
          <div>
            <h2 class="brand-name">Aura Joyas</h2>
          </div>
        </div>
        <p class="brand-desc">
          Piezas únicas diseñadas para quienes aprecian la elegancia atemporal.
          Cada joya cuenta una historia.
        </p>
      </div>

      <div class="col-contact">
        <h3 class="col-title">Contacto</h3>
        <ul class="contact-list">
          <li>
            <span class="contact-icon">✉</span>
            <span>atencion@aurajoyas.mx</span>
          </li>
          <li>
            <span class="contact-icon">📍</span>
            <span>Culiacán, Sinaloa, México</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="bottom-rule"></div>
      <p class="copyright">© {{ year }} Aura Joyas. Todos los derechos reservados.</p>
    </div>

  </footer>
</template>

<style scoped>
.footer {
  margin-top: auto;
  background: var(--color-bg-2);
  font-family: var(--font-body);
  color: var(--color-text);
  border-top: 1px solid var(--color-border);
}

.footer-inner {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 48px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 52px 32px 40px;
}

.col-brand {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.gem {
  font-size: 28px;
  filter: drop-shadow(0 0 6px var(--color-gold-glow));
}

.brand-name {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 700;
  color: var(--color-gold-light);
  letter-spacing: 0.06em;
  margin: 0;
  line-height: 1.1;
}

.brand-desc {
  font-size: 13.5px;
  line-height: 1.7;
  color: var(--color-text-muted);
  max-width: 280px;
  margin: 0;
}

.col-contact {
  display: flex;
  flex-direction: column;
}

.col-title {
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-gold);
  margin-bottom: 16px;
}

.contact-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.contact-list li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 13px;
  color: var(--color-text-muted);
  line-height: 1.5;
}

.contact-icon {
  flex-shrink: 0;
  font-size: 14px;
  margin-top: 1px;
}

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px 28px;
}

.bottom-rule {
  height: 1px;
  background: var(--color-border-soft);
  margin-bottom: 20px;
}

.copyright {
  font-size: 12.5px;
  color: var(--color-text-faint);
  margin: 0;
}

@media (max-width: 860px) {
  .footer-inner {
    grid-template-columns: 1fr 1fr;
    gap: 36px;
  }
  .col-brand { grid-column: 1 / -1; }
}

@media (max-width: 560px) {
  .footer-inner {
    grid-template-columns: 1fr;
    padding: 40px 20px 28px;
    gap: 28px;
  }
  .footer-bottom { padding: 0 20px 28px; }
}
</style>