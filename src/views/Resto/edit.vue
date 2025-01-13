<template>
    <div class="container py-5">
      <!-- Form untuk mengedit menu -->
      <div class="card shadow-lg border-0 rounded-4">
        <div class="card-body p-4">
          <form @submit.prevent="updateMenu">
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
                <span>{{ errors.name[0] }}</span>
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
  
  <script setup>
  // Import ref, onMounted, useRoute, useRouter
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import api from '../../api/index.js';
  
  // Inisialisasi state
  const name = ref('');
  const description = ref('');
  const price = ref('');
  const errors = ref({});
  
  const route = useRoute();
  const router = useRouter();
  
  // Fungsi untuk mengambil data menu
  const fetchMenu = async () => {
    try {
      const response = await api.get(`/restaurant-menus/${route.params.id}`);
      const menu = response.data;
      name.value = menu.name;
      description.value = menu.description;
      price.value = menu.price;
    } catch (error) {
      console.error('Error fetching menu:', error);
    }
  };
  
  // Fungsi untuk mengupdate menu
  const updateMenu = async () => {
    try {
      await api.put(`/restaurant-menus/${route.params.id}`, {
        name: name.value,
        description: description.value,
        price: price.value,
      });
      router.push({ name: 'menus.index' });
    } catch (error) {
      if (error.response && error.response.data.errors) {
        errors.value = error.response.data.errors;
      } else {
        console.error('Error updating menu:', error);
      }
    }
  };
  
  // Mengambil data menu saat komponen dimuat
  onMounted(() => {
    fetchMenu();
  });
  </script>
  
  <style scoped>
  /* CSS yang sesuai untuk tampilan jika diperlukan */
  </style>
  