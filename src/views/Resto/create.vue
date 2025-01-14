<script setup>
// Import ref, reactive, dan onMounted
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../../api/index.js';

// State untuk form input
const name = ref('');
const description = ref('');
const price = ref('');
const errors = ref({});
const menus = ref([]); // State untuk daftar menu
const isEditing = ref(false); // Status untuk edit mode
const editMenuId = ref(null); // ID menu yang sedang diedit

// Router
const router = useRouter();

// Method untuk mengambil semua menu dari API
const fetchMenus = async () => {
  try {
    const response = await api.get('/restaurant-menus');
    menus.value = response.data; // Data disimpan ke state menus
  } catch (error) {
    console.error('Gagal mengambil data menu:', error);
  }
};

// Method untuk menyimpan atau memperbarui menu
const saveMenu = async () => {
  const formData = new FormData();
  formData.append('name', name.value);
  formData.append('description', description.value);
  formData.append('price', price.value);

  try {
    let response;
    if (isEditing.value) {
      // Update menu jika dalam mode edit
      response = await api.put(`/restaurant-menus/${editMenuId.value}`, formData);
    } else {
      // Simpan menu baru jika dalam mode tambah
      response = await api.post('/restaurant-menus', formData);
    }

    if (response.status === 200 || response.status === 201) {
      await fetchMenus(); // Refresh data menu
      resetForm();
    }
  } catch (error) {
    if (error.response && error.response.data.errors) {
      errors.value = error.response.data.errors;
    } else {
      console.error('Terjadi kesalahan:', error);
    }
  }
};

// Method untuk menghapus menu
const deleteMenu = async (id) => {
  if (confirm('Apakah Anda yakin ingin menghapus menu ini?')) {
    try {
      await api.delete(`/restaurant-menus/${id}`);
      await fetchMenus(); // Refresh data menu
    } catch (error) {
      console.error('Gagal menghapus menu:', error);
    }
  }
};

// Method untuk memulai mode edit
const editMenu = (menu) => {
  isEditing.value = true;
  editMenuId.value = menu.id;
  name.value = menu.name;
  description.value = menu.description;
  price.value = menu.price;
};

// Method untuk mereset form
const resetForm = () => {
  name.value = '';
  description.value = '';
  price.value = '';
  errors.value = {};
  isEditing.value = false;
  editMenuId.value = null;
};

// Panggil fetchMenus saat komponen dimuat
onMounted(fetchMenus);
</script>

<template>
  <div class="container py-5">
    <!-- Header Section -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="text-primary fw-bold">
        {{ isEditing ? 'Edit Menu Item' : 'Add New Menu Item' }}
      </h1>
    </div>

    <!-- Form Section -->
    <div class="card shadow-lg border-0 rounded-4 mb-5">
      <div class="card-body p-4">
        <form @submit.prevent="saveMenu">
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
            <i class="bi bi-check-circle me-2"></i>
            {{ isEditing ? 'Update Menu' : 'Save Menu' }}
          </button>
        </form>
      </div>
    </div>

    <!-- Table Section -->
    <div class="card shadow-lg border-0 rounded-4">
      <div class="card-body p-4">
        <h2 class="text-primary fw-bold mb-4">Menu List</h2>
        <table class="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(menu, index) in menus" :key="menu.id">
              <td>{{ index + 1 }}</td>
              <td>{{ menu.name }}</td>
              <td>{{ menu.description }}</td>
              <td>{{ menu.price }}</td>
              <td>
                <button
                  class="btn btn-primary btn-sm me-2"
                  @click="editMenu(menu)"
                >
                  Edit
                </button>
                <button
                  class="btn btn-danger btn-sm"
                  @click="deleteMenu(menu.id)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
