<script setup>
// Import ref and onMounted
import { ref, onMounted } from 'vue';

// Import API
import api from '../api/index.js';

// Define state
const villas = ref([]);

// Method untuk fetch data villas
const fetchDataVillas = async () => {
  try {
    const response = await api.get('/villas');
    villas.value = response.data;
  } catch (error) {
    console.error('Error fetching villa data:', error);
  }
};

// Run hook "onMounted"
onMounted(() => {
  fetchDataVillas();
});
</script>

<template>
  <div class="page-container">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Amankilla Villa</h1>
        <p class="hero-subtitle">
          Selamat datang di sistem reservasi villa kami. Temukan dan pesan villa impian Anda dengan mudah!
        </p>
      </div>
    </div>

    <!-- Villas Section -->
    <div class="villas-container">
      <div class="villas-grid">
        <!-- Villa Cards -->
        <div v-for="villa in villas" :key="villa.id" class="villa-card">
          <div class="card-inner">
            <div class="card-icon">
              <i class="bi bi-house-heart"></i>
            </div>
            <h2 class="villa-name">{{ villa.name }}</h2>
            <p class="villa-description">{{ villa.description }}</p>
            <div class="villa-details">
              <div class="capacity">
                <i class="bi bi-people-fill"></i>
                <span>{{ villa.capacity }} Orang</span>
              </div>
              <div class="price">
                Rp {{ villa.price.toLocaleString('id-ID') }}
                <span class="per-night">/malam</span>
              </div>
            </div>
            <button class="book-button">
              <i class="bi bi-arrow-right"></i>
              <router-link :to="{ name: 'reservations.index' }" class="nav-link">Book Now</router-link>
            </button>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="villas.length === 0" class="empty-state">
          <i class="bi bi-house-x-fill"></i>
          <p>Tidak ada data villa yang tersedia saat ini.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.hero-section {
  background: linear-gradient(to right, #e6b980, #eacda3);
  padding: 5rem 2rem;
  text-align: center;
  color: #1a1a1a;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.343 0L13.857 8.485 15.272 9.9l8.485-8.485h-1.414zM32 0l-9.9 9.9 1.415 1.415L33.414 0H32zM0 0c0 .987.89 1.737 1.684 2.096l.507.405L1.89 2.8.436 1.35 0 .846V0zm55.466 0c-.323.12-.666.23-1.033.335l-.426.112-.212.07c.255-.16.454-.339.59-.531L54.386.01c.36-.12.582-.342.582-.652V0h.498zm-4.134 0l-.44.655c.19.086.37.18.538.28L52.615.01c.368-.128.601-.363.601-.692V0h-1.884zm-8.268 0L40.098 3.21c.013-.002.026-.005.04-.008.515-.105.858-.207 1.029-.308l.004-.002.272-.18.445-.667.202-.3L44.085.01c.368-.128.601-.363.601-.692V0h-1.884zm-8.267 0l-1.941 2.91L35 4.196l-2.557 3.837-1.443-.962L31.982 0h-1.884zm-8.269 0l-1.92 2.88c-.073.107-.15.23-.232.367l-.43.643c-.345.515-.589.937-.735 1.266a3.356 3.356 0 0 0-.118.332c-.018.063-.037.13-.056.197.682-.233 1.23-.471 1.648-.714L31.982 0h-1.884zm-8.268 0l-.735 1.102c.179.075.374.162.584.26L23.715.01c.368-.128.601-.363.601-.692V0h-1.884zm-8.268 0l-.735 1.102c.18.075.374.162.584.26L15.447.01c.368-.128.601-.363.601-.692V0h-1.884zm-6.97 0H8.148l-2.58 2.58-.443-.223c-.302-.15-.582-.338-.84-.563L4.283 0z' fill='%231a1a1a' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
  opacity: 0.1;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.villas-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

.villas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.villa-card {
  transform: translateY(0);
  transition: all 0.3s ease;
}

.villa-card:hover {
  transform: translateY(-5px);
}

.card-inner {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  height: 100%;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(45deg, #e6b980, #eacda3);
  color: #1a1a1a;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.villa-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.villa-description {
  color: #6b7280;
  line-height: 1.6;
  flex-grow: 1;
}

.villa-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
}

.capacity {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4b5563;
}

.price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #e6b980;
}

.per-night {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: normal;
}

.book-button {
  background: linear-gradient(to right, #e6b980, #eacda3);
  color: #1a1a1a;
  border: none;
  border-radius: 0.5rem;
  padding: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.book-button:hover {
  transform: translateX(5px);
  background: linear-gradient(to right, #d4a872, #e6b980);
}

.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 4rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
}

.empty-state i {
  font-size: 3rem;
  color: #e6b980;
  margin-bottom: 1rem;
}

.empty-state p {
  color: #6b7280;
  font-size: 1.125rem;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.125rem;
  }
  
  .villas-container {
    padding: 2rem 1rem;
  }
}
</style>