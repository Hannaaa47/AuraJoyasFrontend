<script setup>
import { inject } from 'vue';
const nombreUsuarioGlobal = inject('nombreUsuarioGlobal');
const tipoPlanGlobal = inject('tipoPlanGlobal');
</script>

<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <p class="hero-eyebrow">✦ Bienvenido, {{ nombreUsuarioGlobal ?? 'visitante' }}</p>
        <h1 class="hero-title">
          Joyas que<br>
          <em>cuentan historias</em>
        </h1>
        <p class="hero-sub">
          Diseños artesanales nacidos en Culiacán, Sinaloa.
          Cada pieza es única, creada con materiales nobles y un propósito eterno.
        </p>
        <div class="hero-actions">
          <RouterLink to="/catalogo" class="btn-gold">Ver Catálogo</RouterLink>
        </div>
        
      </div>

      <div class="hero-visual">
        <div class="img-frame main-frame">
          <img
            src="/img/img1.jpg"
            alt="Joyería fina"
            loading="eager"
          />
          <div class="frame-glow"></div>
        </div>
        <div class="img-frame accent-frame">
          <img
            src="/img/img2.jpg"
            alt="Collar de oro"
            loading="eager"
          />
        </div>
        <div class="float-tag">
          <span class="float-icon">💎</span>
          <div>
            <strong>Artesanal</strong>
            <small>Hecho a mano</small>
          </div>
        </div>
      </div>
    </section>

    <section class="stats">
      <div class="stat-item">
        <span class="stat-num">10+</span>
        <span class="stat-label">Años de experiencia</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <span class="stat-num">500+</span>
        <span class="stat-label">Piezas creadas</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <span class="stat-num">100%</span>
        <span class="stat-label">Materiales certificados</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <span class="stat-num">∞</span>
        <span class="stat-label">Historias por contar</span>
      </div>
    </section>

    <section class="about">
      <div class="about-images">
        <div class="about-img-stack">
          <img
            class="about-img-back"
            src="/img/img3.jpg"
            alt="Taller de joyería"
          />
          <img
            class="about-img-front"
            src="/img/img4.jpg"
            alt="Detalle de joya"
          />
          <div class="about-tag">
            <span>📍 Culiacán, Sinaloa</span>
          </div>
        </div>
      </div>

      <div class="about-text">
        <p class="section-eyebrow">Quiénes somos</p>
        <h2>Una empresa familiar <br><em>apasionados ofrecer los mejores productos</em></h2>
        <div class="gold-line"></div>
        <p>
          Aura Joyas nació en Culiacán, Sinaloa, de la pasión de una familia de
          artesanos con décadas de tradición.
        </p>
        <p>
          Garantizamos que cada joya que llega a tus manos sea tan única como
          la persona que la porta.
        </p>
      </div>
    </section>

    <section class="mission">
      <div class="mission-header">
        <h2>Nuestro propósito</h2>
        <div class="gold-line centered"></div>
      </div>

      <div class="mission-grid">
        <div class="mission-card">
          <span class="mission-icon">🌟</span>
          <h3>Misión</h3>
          <p>
            Crear joyas artesanales que celebren los momentos más importantes
            de la vida, fusionando técnicas tradicionales con diseños
            contemporáneos de alto valor estético.
          </p>
        </div>
        <div class="mission-card highlight">
          <span class="mission-icon">🎯</span>
          <h3>Objetivo</h3>
          <p>
            Llevar la joyería artesanal sinaloense al mundo, manteniendo la
            esencia local y el compromiso con la calidad que nos ha
            distinguido desde el primer día.
          </p>
        </div>
        <div class="mission-card">
          <span class="mission-icon">💡</span>
          <h3>Visión</h3>
          <p>
            Ser la joyería artesanal de referencia en México, reconocida por
            piezas que trascienden generaciones y llevan consigo el alma
            del noroeste mexicano.
          </p>
        </div>
      </div>
    </section>

    <section class="cta">
      <div class="cta-inner">
        <span class="cta-gem">💎</span>
        <h2>¿Lista para encontrar tu joya perfecta?</h2>
        <p>Explora nuestra colección o contáctanos para una pieza personalizada.</p>
        <RouterLink to="/catalogo" class="btn-gold large">Explorar el Catálogo</RouterLink>
      </div>
    </section>

  </div>
</template>

<style scoped>

.home {
  font-family: var(--font-body);
  color: var(--color-text);
  overflow-x: hidden;
  background-color: var(--color-bg);
  min-height: 100vh;
  width: 100%;
}

.section-eyebrow {
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-gold);
  margin-bottom: 12px;
}

.gold-line {
  width: 52px;
  height: 2px;
  background: linear-gradient(90deg, var(--color-gold), transparent);
  border-radius: 2px;
  margin: 14px 0 22px;
}
.gold-line.centered { margin: 14px auto 32px; }

.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  min-height: calc(100vh - 68px);
  padding: 80px 64px;
  max-width: 1300px;
  margin: 0 auto;
}

.hero-eyebrow {
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-gold);
  font-weight: 600;
  margin-bottom: 18px;
}

.hero-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.6rem, 5vw, 4.2rem);
  font-weight: 700;
  line-height: 1.1;
  color: var(--color-gold-light);
  margin: 0 0 22px;
}

.hero-title em {
  font-style: italic;
  color: var(--color-gold);
}

.hero-sub {
  font-size: 15.5px;
  line-height: 1.75;
  color: var(--color-text-muted);
  max-width: 420px;
  margin-bottom: 34px;
}

.hero-actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 28px;
}

.btn-gold {
  display: inline-block;
  padding: 12px 28px;
  background: linear-gradient(135deg, #b49630, #8a6e20);
  color: #0d1b2e;
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.04em;
  border-radius: 10px;
  text-decoration: none;
  box-shadow: 0 4px 18px rgba(180,150,50,0.35);
  transition: all 0.25s ease;
}
.btn-gold:hover {
  background: linear-gradient(135deg, #cca83a, #9a7e28);
  box-shadow: 0 6px 24px rgba(180,150,50,0.5);
  transform: translateY(-2px);
  color: #0d1b2e;
}
.btn-gold.large {
  padding: 16px 40px;
  font-size: 15.5px;
  border-radius: 12px;
}

.btn-ghost {
  display: inline-block;
  padding: 12px 28px;
  background: transparent;
  color: var(--color-gold-light);
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  text-decoration: none;
  transition: all 0.25s ease;
}
.btn-ghost:hover {
  background: var(--color-gold-dim);
  border-color: var(--color-gold);
  color: var(--color-gold-light);
}

.hero-visual {
  position: relative;
  height: 520px;
}

.img-frame {
  position: absolute;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
}

.img-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.main-frame {
  width: 75%;
  height: 440px;
  top: 0;
  right: 0;
  border: 1px solid var(--color-border);
}

.frame-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 60%, rgba(7,17,30,0.6));
}

.accent-frame {
  width: 42%;
  height: 200px;
  bottom: 0;
  left: 0;
  border: 1px solid var(--color-border);
  z-index: 2;
}

.float-tag {
  position: absolute;
  top: 28px;
  left: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--color-bg-2);
  border: 1px solid var(--color-border);
  border-radius: 14px;
  padding: 10px 16px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
}

.float-icon { font-size: 22px; }

.float-tag strong {
  display: block;
  font-size: 13px;
  color: var(--color-gold-light);
  font-weight: 700;
}

.float-tag small {
  font-size: 11px;
  color: var(--color-text-muted);
}

.stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  background: var(--color-bg-card);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  padding: 36px 64px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex: 1;
  text-align: center;
}

.stat-num {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.6rem;
  font-weight: 700;
  color: var(--color-gold);
  line-height: 1;
}

.stat-label {
  font-size: 12px;
  color: var(--color-text-muted);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.stat-divider {
  width: 1px;
  height: 48px;
  background: var(--color-border);
  flex-shrink: 0;
}

.about {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  padding: 100px 64px;
  max-width: 1300px;
  margin: 0 auto;
}

.about-images { position: relative; }

.about-img-stack {
  position: relative;
  height: 480px;
}

.about-img-back {
  position: absolute;
  top: 0;
  right: 0;
  width: 80%;
  height: 400px;
  object-fit: cover;
  border-radius: 20px;
  border: 1px solid var(--color-border);
  box-shadow: 0 20px 50px rgba(0,0,0,0.45);
}

.about-img-front {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50%;
  height: 220px;
  object-fit: cover;
  border-radius: 16px;
  border: 1px solid var(--color-border);
  box-shadow: 0 12px 32px rgba(0,0,0,0.4);
  z-index: 2;
}

.about-tag {
  position: absolute;
  bottom: 30px;
  right: 0;
  background: var(--color-bg-2);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 8px 16px;
  font-size: 12.5px;
  color: var(--color-gold);
  font-weight: 600;
  letter-spacing: 0.08em;
  z-index: 3;
  box-shadow: 0 4px 16px rgba(0,0,0,0.4);
}

.about-text h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  font-weight: 700;
  color: var(--color-gold-light);
  line-height: 1.2;
  margin: 0;
}

.about-text h2 em {
  font-style: italic;
  color: var(--color-gold);
}

.about-text p {
  font-size: 14.5px;
  line-height: 1.8;
  color: var(--color-text-muted);
  margin-bottom: 16px;
}

.mission {
  padding: 80px 64px;
  background: var(--color-bg-card);
  border-top: 1px solid var(--color-border);
}

.mission-header {
  text-align: center;
  margin-bottom: 52px;
}

.mission-header h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  font-weight: 700;
  color: var(--color-gold-light);
  margin: 0;
}

.mission-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1100px;
  margin: 0 auto;
}

.mission-card {
  background: var(--color-bg-2);
  border: 1px solid var(--color-border);
  border-radius: 18px;
  padding: 32px 28px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.mission-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 36px rgba(0,0,0,0.4), 0 0 0 1px rgba(180,150,70,0.25);
}

.mission-card.highlight {
  background: linear-gradient(145deg, var(--color-bg-elevated), #1a2d4a);
  border-color: rgba(180,150,70,0.4);
  box-shadow: 0 0 30px rgba(180,150,70,0.08);
}

.mission-icon {
  font-size: 28px;
  display: block;
  margin-bottom: 16px;
}

.mission-card h3 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-gold-light);
  margin-bottom: 12px;
}

.mission-card p {
  font-size: 14px;
  line-height: 1.75;
  color: var(--color-text-muted);
  margin: 0;
}

.cta {
  padding: 100px 64px;
  text-align: center;
}

.cta-inner {
  max-width: 580px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.cta-gem {
  font-size: 40px;
  filter: drop-shadow(0 0 12px rgba(180,150,90,0.6));
  animation: pulse 3s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { filter: drop-shadow(0 0 6px rgba(180,150,90,0.4)); }
  50%       { filter: drop-shadow(0 0 18px rgba(180,150,90,0.8)); }
}

.cta h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 700;
  color: var(--color-gold-light);
  margin: 0;
}

.cta p {
  font-size: 14.5px;
  color: var(--color-text-muted);
  margin: 0;
}

@media (max-width: 1024px) {
  .hero, .about {
    grid-template-columns: 1fr;
    padding: 60px 32px;
    gap: 40px;
    min-height: auto;
  }

  .hero-visual { height: 380px; }
  .main-frame  { width: 85%; height: 340px; }

  .about-img-stack { height: 360px; }
  .about-img-back  { height: 300px; }
  .about-img-front { height: 160px; }

  .stats { flex-wrap: wrap; padding: 32px; gap: 24px; }
  .stat-divider { display: none; }
  .stat-item { flex: 1 1 40%; }

  .mission { padding: 60px 32px; }
  .mission-grid { grid-template-columns: 1fr; max-width: 500px; }

  .cta { padding: 70px 32px; }
}

@media (max-width: 600px) {
  .hero { padding: 40px 20px; }
  .hero-visual { height: 280px; }
  .main-frame { height: 240px; }
  .accent-frame { width: 48%; height: 140px; }
  .hero-actions { flex-direction: column; }
  .btn-gold, .btn-ghost { text-align: center; }
}
</style>