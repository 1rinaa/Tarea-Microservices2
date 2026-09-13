<template>
  <div class="books-list">
    <header class="list-header">
      <div class="eyebrow">Colección</div>
      <h1>Libros</h1>
      <p class="subtitle">Explora el catálogo completo de títulos disponibles</p>
    </header>

    <div v-if="books.length" class="cards">
      <router-link
        v-for="book in books"
        :key="book.id"
        :to="'/show/' + book.id"
        class="card"
      >
        <div class="icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
          </svg>
        </div>
        <div class="info">
          <h3>{{ book.title }}</h3>
          <p>{{ book.author }} · {{ book.edition }} ed. · {{ book.copyright }}</p>
        </div>
        <div class="arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </div>
      </router-link>
    </div>

    <div v-else class="loading">
      <div class="spinner"></div>
      <span>Cargando libros...</span>
    </div>
  </div>
</template>

<script>
import { booksApi } from './api.js'

export default {
  data() {
    return { books: [] }
  },
  methods: {
    allBooks() {
      fetch(booksApi + '/api/books', { headers: { 'Accept': 'application/json' } })
        .then((response) => response.json())
        .then((result) => { this.books = result; })
    }
  },
  mounted() {
    this.allBooks()
  }
}
</script>

<style scoped>
.books-list {
  padding: 20px 0;
}

.list-header {
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
  margin-bottom: 14px;
  line-height: 1.2;
}

.subtitle {
  color: #7a8bb0;
  font-size: 0.95em;
  line-height: 1.7;
  max-width: 620px;
}

.cards {
  display: grid;
  gap: 10px;
}

.card {
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

.card::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, #4d7cff, #1e3a8a);
  opacity: 0;
  transition: opacity 0.25s;
}

.card:hover {
  background: rgba(25, 32, 52, 0.75);
  border-color: rgba(100, 150, 255, 0.3);
  transform: translateX(2px);
}

.card:hover::before { opacity: 1; }

.card .icon {
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

.card:hover .icon {
  background: rgba(77, 124, 255, 0.18);
  color: #a8c0ff;
  box-shadow: 0 0 20px rgba(77, 124, 255, 0.25);
}

.card .icon svg { width: 20px; height: 20px; }

.card .info { flex: 1; min-width: 0; }

.card .info h3 {
  font-size: 1em;
  font-weight: 500;
  color: #ffffff;
  margin: 0 0 3px;
  letter-spacing: -0.01em;
}

.card .info p {
  color: #7a8bb0;
  font-size: 0.82em;
  margin: 0;
}

.card .arrow {
  color: #4a5878;
  transition: all 0.25s;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.card .arrow svg { width: 18px; height: 18px; }

.card:hover .arrow {
  color: #7ba3ff;
  transform: translateX(4px);
}

.loading {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #7a8bb0;
  font-size: 0.9em;
  padding: 40px 0;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(77, 124, 255, 0.2);
  border-top-color: #4d7cff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }
</style>