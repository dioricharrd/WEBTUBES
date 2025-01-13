<script setup>
// Import ref and onMounted
import { ref, onMounted } from 'vue';

// Import API
import api from '../../api/index.js';

// Define state
const menus = ref([]);

// Method fetchDataMenus
const fetchDataMenus = async () => {
  try {
    const response = await api.get('/restaurant-menus');
    menus.value = response.data;
  } catch (error) {
    console.error('Error fetching menu data:', error);
  }
};

// Run hook "onMounted"
onMounted(() => {
  fetchDataMenus();
});

// Method deleteMenu
const deleteMenu = async (id) => {
  try {
    await api.delete(`/restaurant-menus/${id}`);
    fetchDataMenus();
  } catch (error) {
    console.error('Error deleting menu:', error);
  }
};
</script>

<template>
  <div class="container py-5">
    <!-- Header Section -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="fw-bold" style="color: #e6b980;">Restaurant Menu Management</h1>
      <router-link
        :to="{ name: 'menus.create' }"
        class="btn btn-add shadow"
      >
        <i class="bi bi-plus-circle me-2"></i> Add New Menu Item
      </router-link>
    </div>

    <!-- Cards Grid Section -->
    <div class="row g-4">
      <!-- Fallback if no data -->
      <div v-if="menus.length === 0" class="col-12">
        <div class="alert alert-danger text-center">
          <i class="bi bi-exclamation-circle me-2"></i> No Menu Items Available!
        </div>
      </div>

      <!-- Menu Cards -->
      <div v-else v-for="(menu, index) in menus" :key="index" class="col-md-6 col-lg-4">
        <div class="card h-100 shadow-lg border-0 rounded-4 hover-scale menu-card">
          <!-- Card Header -->
          <div class="card-header menu-header text-white rounded-top-4 p-3">
            <div class="d-flex justify-content-between align-items-center">
              <h5 class="card-title mb-0 fw-bold">
                {{ menu.name }}
              </h5>
              <span class="badge menu-badge">
                #{{ index + 1 }}
              </span>
            </div>
          </div>

          <!-- Card Body -->
          <div class="card-body menu-body p-4">
            <p class="card-text text-light mb-4">
              {{ menu.description }}
            </p>
            <div class="d-flex justify-content-between align-items-center">
              <span class="fs-4 fw-bold text-success">
                Rp {{ menu.price.toLocaleString() }}
              </span>
              <div class="btn-group">
                <router-link
                  :to="{ name: 'menus.edit', params: { id: menu.id } }"
                  class="btn btn-edit rounded-pill me-2"
                >
                  <i class="bi bi-pencil-square me-1"></i> Edit
                </router-link>
                <button
                  @click.prevent="deleteMenu(menu.id)"
                  class="btn btn-delete rounded-pill"
                >
                  <i class="bi bi-trash-fill me-1"></i> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* General Hover Effect */
.hover-scale {
  transition: transform 0.2s ease-in-out;
}

.hover-scale:hover {
  transform: translateY(-5px);
}

/* Card Styling */
.menu-card {
  background-color: #2d2d2d;
  color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.menu-header {
  background-color: #00467f;
  border-bottom: 1px solid #e6b980;
  font-size: 1.1rem;
  font-weight: bold;
}

.menu-badge {
  background-color: #e6b980;
  color: #1a1a1a;
  font-size: 0.9rem;
  font-weight: bold;
  padding: 0.3rem 0.7rem;
  border-radius: 10px;
}

.menu-body {
  background-color: #1f1f1f;
  padding: 1.5rem;
}

/* Button Styling */
.btn-add {
  background: linear-gradient(45deg, #e6b980, #eacda3);
  color: #1a1a1a;
  font-weight: bold;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.btn-add:hover {
  background: linear-gradient(45deg, #eacda3, #e6b980);
  color: black;
  transform: translateY(-2px);
}

.btn-edit {
  background-color: transparent;
  border: 1px solid #e6b980;
  color: #e6b980;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn-edit:hover {
  background-color: #e6b980;
  color: #1a1a1a;
}

.btn-delete {
  background-color: transparent;
  border: 1px solid #e74c3c;
  color: #e74c3c;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn-delete:hover {
  background-color: #e74c3c;
  color: #ffffff;
}

/* Card Hover Effect */
.card {
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
}

/* Responsiveness */
@media (max-width: 767.98px) {
  .menu-header {
    font-size: 1rem;
  }

  .menu-badge {
    font-size: 0.8rem;
    padding: 0.2rem 0.5rem;
  }

  .btn-add {
    padding: 0.6rem 1.2rem;
  }

  .btn-edit,
  .btn-delete {
    font-size: 0.85rem;
  }
}
</style>
