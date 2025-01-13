<script setup>
// Import ref dan router
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

// Import API
import api from "../../api/index.js";

// State untuk form input
const name = ref("");
const position = ref("");
const email = ref("");
const phone = ref("");
const errors = ref({});

// Status loading
const isLoading = ref(false);

// Ambil router
const router = useRouter();

// Fungsi untuk menambahkan staf baru
const createStaff = async () => {
  isLoading.value = true; // Set status loading saat mengirim permintaan

  try {
    const staffData = {
      name: name.value,
      position: position.value,
      email: email.value,
      phone: phone.value,
    };

    const response = await api.post("/villa-staff", staffData);

    // Arahkan ke halaman daftar staf setelah staf berhasil ditambahkan
    router.push({ name: "staffs.index" });
  } catch (error) {
    if (error.response && error.response.data.errors) {
      errors.value = error.response.data.errors;
    } else {
      console.error("Terjadi kesalahan saat menambahkan staf:", error);
    }
  } finally {
    isLoading.value = false; // Set status loading menjadi false setelah permintaan selesai
  }
};
</script>

<template>
  <div class="container mt-5 mb-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card border-0 rounded shadow-lg form-card">
          <!-- Header -->
          <div class="card-header text-white text-center fs-4 fw-bold form-header">
            <i class="bi bi-person-plus me-2"></i> Add New Staff
          </div>
          <div class="card-body form-body">
            <form @submit.prevent="createStaff">
              <!-- Name Field -->
              <div class="mb-3">
                <label for="name" class="form-label fw-bold form-label">Name</label>
                <input
                  id="name"
                  type="text"
                  v-model="name"
                  class="form-control form-input"
                  placeholder="Enter staff name"
                  required
                />
                <div v-if="errors.name" class="text-danger mt-1 error-text">
                  <i class="bi bi-exclamation-circle-fill me-1"></i>{{ errors.name[0] }}
                </div>
              </div>

              <!-- Position Field -->
              <div class="mb-3">
                <label for="position" class="form-label fw-bold form-label">Position</label>
                <input
                  id="position"
                  type="text"
                  v-model="position"
                  class="form-control form-input"
                  placeholder="Enter staff position"
                  required
                />
                <div v-if="errors.position" class="text-danger mt-1 error-text">
                  <i class="bi bi-exclamation-circle-fill me-1"></i>{{ errors.position[0] }}
                </div>
              </div>

              <!-- Email Field -->
              <div class="mb-3">
                <label for="email" class="form-label fw-bold form-label">Email</label>
                <input
                  id="email"
                  type="email"
                  v-model="email"
                  class="form-control form-input"
                  placeholder="Enter staff email"
                  required
                />
                <div v-if="errors.email" class="text-danger mt-1 error-text">
                  <i class="bi bi-exclamation-circle-fill me-1"></i>{{ errors.email[0] }}
                </div>
              </div>

              <!-- Phone Field -->
              <div class="mb-3">
                <label for="phone" class="form-label fw-bold form-label">Phone</label>
                <input
                  id="phone"
                  type="text"
                  v-model="phone"
                  class="form-control form-input"
                  placeholder="Enter staff phone number"
                  required
                />
                <div v-if="errors.phone" class="text-danger mt-1 error-text">
                  <i class="bi bi-exclamation-circle-fill me-1"></i>{{ errors.phone[0] }}
                </div>
              </div>

              <!-- Submit Button -->
              <div class="d-flex justify-content-end">
                <button
                  type="submit"
                  class="btn btn-lg rounded shadow-sm btn-submit"
                  :disabled="isLoading"
                >
                  <i class="bi bi-save me-2"></i> Add Staff
                  <span v-if="isLoading" class="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Card Styling */
.form-card {
  background-color: #2d2d2d;
  border-radius: 10px;
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

/* Header Styling */
.form-header {
  background-color: #00467f;
  font-size: 1.25rem;
  font-weight: bold;
}

/* Body Styling */
.form-body {
  background-color: #1f1f1f;
  padding: 1.5rem;
  color: white;
}

/* Label Styling */
.form-label {
  color: #e6b980;
  font-weight: bold;
  font-size: 1rem;
}

/* Input Styling */
.form-input {
  border: 1px solid #e6b980;
  background-color: #1f1f1f;
  color: white;
  border-radius: 5px;
  padding: 0.6rem;
  transition: all 0.3s ease;
}

.form-input:focus {
  border-color: #eacda3;
  outline: none;
  box-shadow: 0 0 5px rgba(230, 185, 128, 0.75);
}

/* Error Text Styling */
.error-text {
  font-size: 0.875rem;
  color: #e74c3c;
}

/* Button Styling */
.btn-submit {
  background: linear-gradient(45deg, #e6b980, #eacda3);
  color: #1a1a1a;
  font-weight: bold;
  padding: 0.8rem 1.5rem;
  transition: all 0.3s ease;
}

.btn-submit:hover {
  background: linear-gradient(45deg, #eacda3, #e6b980);
  color: black;
  transform: translateY(-2px);
}
</style>
