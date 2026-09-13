<template>
  <div class="book-detail">
    <router-link to="/" class="back-top">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"/>
        <polyline points="12 19 5 12 12 5"/>
      </svg>
      Volver al catálogo
    </router-link>

    <header class="detail-header">
      <div class="eyebrow">Detalle del libro</div>
      <h1>{{ book.title }}</h1>
    </header>

    <section class="section">
      <h2 class="section-title">
        <span class="section-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
        </span>
        Información
      </h2>

      <div class="fields">
        <div class="field">
          <label>ID</label>
          <div class="value">{{ book.id }}</div>
        </div>
        <div class="field">
          <label>Copyright</label>
          <div class="value">{{ book.copyright }}</div>
        </div>
        <div class="field">
          <label>Edición</label>
          <div class="value">{{ book.edition }}</div>
        </div>
        <div class="field">
          <label>Idioma</label>
          <div class="value">{{ book.language }}</div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">
        <span class="section-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>
        </span>
        Enlaces relacionados
      </h2>

      <div class="links-grid">
        <a :href="authorsMinisite + '/#/show/' + book.author_id" target="_blank" rel="noopener" class="link-card">
          <div class="icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <div class="info">
            <span class="label">Autor</span>
            <span class="value">{{ book.author }}</span>
          </div>
          <div class="arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </div>
        </a>

        <a :href="publishersMinisite + '/#/show/' + book.publisher_id" target="_blank" rel="noopener" class="link-card">
          <div class="icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <rect x="4" y="2" width="16" height="20" rx="2"/>
              <path d="M9 22v-4h6v4"/>
              <path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>
            </svg>
          </div>
          <div class="info">
            <span class="label">Editorial</span>
            <span class="value">{{ book.publisher }}</span>
          </div>
          <div class="arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </div>
        </a>

        <a :href="reviewsMinisite + '/?bookId=' + book.id" target="_blank" rel="noopener" class="link-card highlight">
          <div class="icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </div>
          <div class="info">
            <span class="label">Reseñas</span>
            <span class="value">Ver opiniones de este libro</span>
          </div>
          <div class="arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </div>
        </a>
      </div>
    </section>
  </div>
</template>

<script>
import { booksApi } from './api.js'

export default {
  props: ['id'],
  data() {
    return {
      book: {id:'', title:'', edition:'', copyright:'', language:'', author:'', author_id:'', publisher:'', publisher_id:''},
      authorsMinisite: 'https://authors-minifront.vercel.app',
      publishersMinisite: 'https://publishers-minifront.vercel.app',
      reviewsMinisite: 'https://reviews-minifront.vercel.app/'
    }
  },
  created() {
    this.findBook(this.id);
  },
  methods: {
    findBook(id) {
      fetch(booksApi + '/api/books/' + id, { headers: {'Accept': 'application/json'} })
        .then((response) => response.json())
        .then((result) => { this.book = result; })
    }
  }
}
</script>

<style scoped>
.book-detail {
  padding: 20px 0;
}

.back-top {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #7a8bb0;
  text-decoration: none;
  font-size: 0.85em;
  font-weight: 500;
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid rgba(80, 120, 255, 0.12);
  background: rgba(15, 20, 35, 0.5);
  transition: all 0.25s;
  margin-bottom: 32px;
}

.back-top:hover {
  color: #e6ecff;
  border-color: rgba(100, 150, 255, 0.35);
  background: rgba(25, 32, 52, 0.75);
}

.back-top svg { width: 14px; height: 14px; }

.detail-header {
  margin-bottom: 40px;
}

.eyebrow {
  font-size: 0.75em;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #4d7cff;
  font-weight: 600;
  margin-bottom: 12px;
}

h1 {
  font-size: 2em;
  margin: 0;
  line-height: 1.2;
}

.section { margin-bottom: 40px; }

.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.85em;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #7a8bb0;
  margin-bottom: 16px;
}

.section-icon {
  display: flex;
  color: #4d7cff;
}

.section-icon svg { width: 14px; height: 14px; }

.fields {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.field {
  background: rgba(15, 20, 35, 0.5);
  border: 1px solid rgba(80, 120, 255, 0.1);
  border-radius: 10px;
  padding: 16px 18px;
}

.field label {
  display: block;
  font-size: 0.72em;
  color: #7a8bb0;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 6px;
}

.field .value {
  color: #e6ecff;
  font-size: 0.95em;
  font-weight: 500;
}

.links-grid {
  display: grid;
  gap: 10px;
}

.link-card {
  display: flex;
  align-items: center;
  gap: 18px;
  background: rgba(15, 20, 35, 0.5);
  border: 1px solid rgba(80, 120, 255, 0.1);
  padding: 18px 22px;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.link-card::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, #4d7cff, #1e3a8a);
  opacity: 0;
  transition: opacity 0.25s;
}

.link-card:hover {
  background: rgba(25, 32, 52, 0.75);
  border-color: rgba(100, 150, 255, 0.3);
  transform: translateX(2px);
}

.link-card:hover::before { opacity: 1; }

.link-card.highlight {
  border-color: rgba(120, 160, 255, 0.25);
  background: rgba(20, 30, 55, 0.55);
}

.link-card .icon {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: rgba(77, 124, 255, 0.1);
  border: 1px solid rgba(100, 150, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #7ba3ff;
  transition: all 0.25s;
}

.link-card:hover .icon {
  background: rgba(77, 124, 255, 0.18);
  color: #a8c0ff;
  box-shadow: 0 0 20px rgba(77, 124, 255, 0.25);
}

.link-card .icon svg { width: 20px; height: 20px; }

.link-card .info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.link-card .info .label {
  font-size: 0.72em;
  color: #7a8bb0;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 500;
}

.link-card .info .value {
  color: #ffffff;
  font-size: 0.95em;
  font-weight: 500;
}

.link-card .arrow {
  color: #4a5878;
  transition: all 0.25s;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.link-card .arrow svg { width: 18px; height: 18px; }

.link-card:hover .arrow {
  color: #7ba3ff;
  transform: translateX(4px);
}
</style>