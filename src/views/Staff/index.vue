<script setup>
// Import ref dan onMounted
import { ref, onMounted } from "vue";

// Import API
import api from "../../api/index.js";

// Define state
const staffs = ref([]);

// Method untuk fetch data staff
const fetchDataStaffs = async () => {
  try {
    const response = await api.get("/villa-staff"); // Endpoint API untuk mendapatkan data staff
    console.log("API Response:", response.data); // Debugging: Tampilkan respons API
    staffs.value = response.data.data; // Sesuaikan struktur respons API
  } catch (error) {
    console.error("Error fetching staff data:", error);
    if (error.response) {
      console.log("Response Error:", error.response.data);
    } else if (error.request) {
      console.log("Request Error:", error.request);
    } else {
      console.log("General Error:", error.message);
    }
  }
};

// Method untuk menghapus staff
const deleteStaff = async (id) => {
  try {
    await api.delete(`/villa-staff/${id}`); // Endpoint API untuk menghapus data staff
    fetchDataStaffs(); // Refresh data setelah penghapusan
  } catch (error) {
    console.error("Error deleting staff:", error);
  }
};

// Fetch data saat komponen di-mount
onMounted(() => {
  fetchDataStaffs();
});
</script>

<template>
  <div class="container py-5">
    <!-- Header Section -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="fw-bold text-gold">Villa Staff Management</h1>
      <router-link :to="{ name: 'staffs.create' }" class="btn btn-add shadow">
        <i class="bi bi-plus-circle me-2"></i> Add New Staff
      </router-link>
    </div>

    <!-- Cards Grid Section -->
    <div class="row g-4">
      <!-- Fallback if no data -->
      <div v-if="staffs.length === 0" class="col-12">
        <div class="alert alert-danger text-center">
          <i class="bi bi-exclamation-circle me-2"></i> No Staff Data Available!
        </div>
      </div>

      <!-- Staff Cards -->
      <div
        v-else
        v-for="(staff, index) in staffs"
        :key="staff.id"
        class="col-md-6 col-lg-4"
      >
        <div class="card h-100 shadow-lg border-0 rounded-4 staff-card">
          <!-- Card Header -->
          <div class="card-header bg-dark text-white rounded-top-4 d-flex justify-content-between align-items-center p-3">
            <h5 class="card-title fw-bold mb-0">{{ staff.name }}</h5>
            <span class="badge staff-badge">#{{ index + 1 }}</span>
          </div>

          <!-- Card Body -->
          <div class="card-body p-4">
            <ul class="list-unstyled mb-4">
              <li class="mb-2">
                <strong>Position:</strong> {{ staff.position }}
              </li>
              <li class="mb-2">
                <strong>Email:</strong> {{ staff.email }}
              </li>
              <li>
                <strong>Phone:</strong> {{ staff.phone }}
              </li>
            </ul>
            <div class="d-flex justify-content-between">
              <router-link
                :to="{ name: 'staffs.edit', params: { id: staff.id } }"
                class="btn btn-edit rounded-pill me-2"
              >
                <i class="bi bi-pencil-square me-1"></i> Edit
              </router-link>
              <button
                @click.prevent="deleteStaff(staff.id)"
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
</template>

<style scoped>
/* Warna teks emas */
.text-gold {
  color: #e6b980;
}

/* Tombol Add Staff */
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

/* Staff Card Styling */
.staff-card {
  background-color: #2d2d2d;
  color: white;
  border-radius: 10px;
  transition: transform 0.2s ease-in-out, box-shadow 0.3s ease;
}

.staff-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.3);
}

/* Badge Styling */
.staff-badge {
  background-color: #e6b980;
  color: #1a1a1a;
  font-weight: bold;
  font-size: 0.9rem;
  padding: 0.3rem 0.7rem;
  border-radius: 10px;
}

/* Button Styling */
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

/* Responsiveness */
@media (max-width: 767.98px) {
  .staff-card {
    padding: 1rem;
  }

  .btn-edit,
  .btn-delete {
    font-size: 0.85rem;
  }

  .staff-badge {
    font-size: 0.8rem;
    padding: 0.2rem 0.5rem;
  }
}
</style>
