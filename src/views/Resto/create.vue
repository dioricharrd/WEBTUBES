<script setup>
// Import ref dan onMounted
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../../api/index.js';

// Define state untuk form input
const name = ref('');
const description = ref('');
const price = ref('');
const errors = ref({});

// Inisialisasi router untuk navigasi
const router = useRouter();

// Method untuk menyimpan menu baru
const storeMenu = async () => {
  // Inisialisasi formData
  const formData = new FormData();
  formData.append('name', name.value);
  formData.append('description', description.value);
  formData.append('price', price.value);

  try {
    // Kirim data ke API untuk membuat menu baru
    const response = await api.post('/restaurant-menus', formData);

    // Jika berhasil, arahkan kembali ke halaman daftar menu
    if (response.status === 201) {
      router.push({ name: 'menus.index' });
    }
  } catch (error) {
    // Tangani jika ada error
    if (error.response && error.response.data.errors) {
      errors.value = error.response.data.errors;
    } else {
      console.error('Terjadi kesalahan:', error);
    }
  }
};
</script>

<template>
  <div class="container py-5">
    <!-- Header Section -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="text-primary fw-bold">Add New Menu Item</h1>
      <router-link
        :to="{ name: 'menus.index' }"
        class="btn btn-outline-secondary btn-lg shadow"
      >
        <i class="bi bi-arrow-left-circle me-2"></i> Back to Menu List
      </router-link>
    </div>

    <!-- Form Section -->
    <div class="card shadow-lg border-0 rounded-4">
      <div class="card-body p-4">
        <form @submit.prevent="storeMenu">
          <div class="mb-3">
            <label for="name" class="form-label">Menu Name</label>
            <input
              type="text"
              id="name"
              v-model="name"
              class="form-control"
              placeholder="Enter menu name"
              required
            />
            <div v-if="errors.name" class="alert alert-danger mt-2">
              <span v-if="errors.name">{{ errors.name[0] }}</span>
            </div>
          </div>

          <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea
              id="description"
              v-model="description"
              class="form-control"
              rows="4"
              placeholder="Enter menu description"
              required
            ></textarea>
            <div v-if="errors.description" class="alert alert-danger mt-2">
              <span>{{ errors.description[0] }}</span>
            </div>
          </div>

          <div class="mb-3">
            <label for="price" class="form-label">Price</label>
            <input
              type="number"
              id="price"
              v-model="price"
              class="form-control"
              placeholder="Enter menu price"
              required
            />
            <div v-if="errors.price" class="alert alert-danger mt-2">
              <span>{{ errors.price[0] }}</span>
            </div>
          </div>

          <button type="submit" class="btn btn-success btn-lg shadow w-100">
            <i class="bi bi-check-circle me-2"></i> Save Menu
          </button>
        </form>
      </div>
    </div>
  </div>
</template>