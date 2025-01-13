<script setup>
// Import ref and onMounted
import { ref, onMounted } from 'vue';

// Import API
import api from '../../api';

// Define state
const reservations = ref([]);

// Method fetchDataReservations
const fetchDataReservations = async () => {
  try {
    const response = await api.get('/reservations'); // Pastikan URL sesuai dengan API Laravel Anda
    reservations.value = response.data; // Sesuaikan dengan struktur response
  } catch (error) {
    console.error('Error fetching reservation data:', error);
  }
};

// Run hook "onMounted"
onMounted(() => {
  fetchDataReservations();
});

// Method deleteReservation
const deleteReservation = async (id) => {
  try {
    await api.delete(`/reservations/${id}`); // Pastikan URL sesuai dengan API Laravel Anda
    fetchDataReservations();
  } catch (error) {
    console.error('Error deleting reservation:', error);
  }
};
</script>

<template>
  <div class="container py-5">
    <!-- Header Section -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="text-primary fw-bold">Reservation Management</h1>
      <router-link
        :to="{ name: 'reservations.create' }"
        class="btn btn-add shadow"
      >
        <i class="bi bi-plus-circle me-2"></i> Add New Reservation
      </router-link>
    </div>

    <!-- Table Section -->
    <div class="card shadow-lg border-0 rounded-4 table-card">
      <div class="card-body p-4">
        <table class="table table-hover table-striped align-middle">
          <thead class="table-header text-center">
            <tr>
              <th scope="col">Customer Name</th>
              <th scope="col">Check-in</th>
              <th scope="col">Check-out</th>
              <th scope="col">Number of Guests</th>
              <th scope="col" style="width:15%">Actions</th>
            </tr>
          </thead>
          <tbody>
            <!-- Fallback if no data -->
            <tr v-if="reservations.length === 0">
              <td colspan="5" class="text-center">
                <div class="alert alert-danger mb-0">
                  <i class="bi bi-exclamation-circle me-2"></i> Data Belum Tersedia!
                </div>
              </td>
            </tr>
            <!-- Render Reservation Data -->
            <tr v-else v-for="(reservation, index) in reservations" :key="index">
              <td class="fw-semibold text-white">
                <span class="badge bg-primary me-2">{{ index + 1 }}</span>
                {{ reservation.customer_name }}
              </td>
              <td class="text-white">{{ reservation.check_in }}</td>
              <td class="text-white">{{ reservation.check_out }}</td>
              <td class="text-white">{{ reservation.number_of_guests }} Guests</td>
              <td class="text-center">
                <router-link
                  :to="{ name: 'reservations.edit', params: { id: reservation.id } }"
                  class="btn btn-sm btn-edit rounded-pill shadow-sm me-2"
                >
                  <i class="bi bi-pencil-square"></i> Edit
                </router-link>
                <button
                  @click.prevent="deleteReservation(reservation.id)"
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

/* Tombol Add New Reservation */
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

/* Teks pada tabel */
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
