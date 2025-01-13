<template>
  <div class="container py-5">
    <!-- Header Section -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="text-primary fw-bold">Villa Management</h1>
      <router-link :to="{ name: 'villas.create' }" class="btn btn-add shadow">
        <i class="bi bi-plus-circle me-2"></i> Add New Villa
      </router-link>
    </div>

    <!-- Table Section -->
    <div class="card shadow-lg border-0 rounded-4 table-card">
      <div class="card-body p-4">
        <table class="table table-hover table-striped align-middle">
          <thead class="table-header text-center">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Capacity</th>
              <th scope="col" style="width:15%">Actions</th>
            </tr>
          </thead>
          <tbody>
            <!-- Fallback if no data -->
            <tr v-if="villas.length === 0">
              <td colspan="5" class="text-center">
                <div class="alert alert-danger mb-0">
                  <i class="bi bi-exclamation-circle me-2"></i> Data Belum Tersedia!
                </div>
              </td>
            </tr>
            <!-- Render Villa Data -->
            <tr v-else v-for="(villa, index) in villas" :key="index">
              <td class="fw-semibold text-white">
                <span class="badge bg-primary me-2">{{ index + 1 }}</span>
                {{ villa.name }}
              </td>
              <td class="text-white">{{ villa.description }}</td>
              <td>
                <span class="text-success fw-bold">Rp {{ villa.price.toLocaleString() }}</span>
              </td>
              <td class="text-white">{{ villa.capacity }} Orang</td>
              <td class="text-center">
                <router-link
                  :to="{ name: 'villas.edit', params: { id: villa.id } }"
                  class="btn btn-sm btn-edit rounded-pill shadow-sm me-2"
                >
                  <i class="bi bi-pencil-square"></i> Edit
                </router-link>
                <button
                  @click.prevent="deleteVilla(villa.id)"
                  class="btn btn-sm btn-delete rounded-pill shadow-sm"
                >
                  <i class="bi bi-trash-fill"></i> Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../../api';

// Data villa
const villas = ref([]);

// Fetch data villas
const fetchDataVillas = async () => {
  try {
    const response = await api.get('/villas');
    villas.value = response.data;
  } catch (error) {
    console.error('Error fetching villa data:', error);
  }
};

// Delete villa
const deleteVilla = async (id) => {
  try {
    await api.delete(`/villas/${id}`);
    fetchDataVillas();
  } catch (error) {
    console.error('Error deleting villa:', error);
  }
};

// Fetch data saat komponen dimuat
onMounted(() => {
  fetchDataVillas();
});
</script>

<style scoped>
/* Background halaman */
body {
  background-color: #1f1f1f;
  color: #f0f0f0;
}

/* Header Section */
.text-primary {
  color: #e6b980 !important;
}

/* Tombol Add New Villa */
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
  color: #000;
  transform: translateY(-2px);
}

/* Table Styling */
.table-card {
  background-color: #2d2d2d;
  color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.table-header {
  background-color: #444444;
  color: #f0f0f0;
}

.table-hover tbody tr:hover {
  background-color: #3a3a3a;
}

.table th,
.table td {
  vertical-align: middle;
  padding: 0.8rem;
}

.table th {
  text-align: center;
  border-bottom: 2px solid #444444;
}

/* Nama, Deskripsi, dan Kapasitas Villa */
.text-white {
  color: #ffffff !important;
}

/* Tombol Edit dan Delete */
.btn-edit {
  background-color: #e6b980;
  border-color: #e6b980;
  color: #1a1a1a;
}

.btn-edit:hover {
  background-color: #eacda3;
  color: #000;
}

.btn-delete {
  background-color: #e74c3c;
  border-color: #e74c3c;
  color: #fff;
}

.btn-delete:hover {
  background-color: #f27c8f;
  color: #1a1a1a;
}

/* Responsive Table */
@media (max-width: 767.98px) {
  .table th,
  .table td {
    font-size: 0.9rem;
    padding: 0.5rem;
  }
}
</style>
