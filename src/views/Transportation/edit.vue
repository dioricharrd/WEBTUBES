<script setup>
// Import ref, onMounted, and router
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

// Import API
import api from "../../api/index.js";

// State for form input
const name = ref("");
const description = ref("");
const price = ref("");
const villa_id = ref("");
const errors = ref({});

// Loading status
const isLoading = ref(false);

// Get router and route
const router = useRouter();
const route = useRoute();

// Get ID from URL parameters
const serviceId = route.params.id;

// Function to load transportation service data based on ID
const loadTransportationService = async () => {
  isLoading.value = true; // Set loading status while fetching data

  try {
    const response = await api.get(`/transportation-services/${serviceId}`);
    const service = response.data;

    // Set form input values based on the service data
    name.value = service.name;
    description.value = service.description;
    price.value = service.price;
    villa_id.value = service.villa_id;
  } catch (error) {
    console.error("Error fetching transportation service data:", error);
  } finally {
    isLoading.value = false; // Set loading status to false after request completes
  }
};

// Function to update transportation service
const updateTransportationService = async () => {
  isLoading.value = true; // Set loading status while sending request

  try {
    const serviceData = {
      name: name.value,
      description: description.value,
      price: price.value,
      villa_id: villa_id.value,
    };

    const response = await api.put(`/transportation-services/${serviceId}`, serviceData);

    // Redirect to transportation services list page after successful update
    router.push({ name: "transportation-services.index" });
  } catch (error) {
    if (error.response && error.response.data.errors) {
      errors.value = error.response.data.errors;
    } else {
      console.error("Error updating transportation service:", error);
    }
  } finally {
    isLoading.value = false; // Set loading status to false after request completes
  }
};

// Call the function to load data when component is mounted
onMounted(loadTransportationService);
</script>

<template>
  <div class="container mt-5 mb-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card border-0 rounded shadow-lg form-card">
          <!-- Header -->
          <div class="card-header text-white text-center fs-4 fw-bold form-header">
            <i class="bi bi-pencil-square me-2"></i> Edit Transportation Service
          </div>
          <div class="card-body form-body">
            <form @submit.prevent="updateTransportationService">
              <!-- Name Field -->
              <div class="mb-3">
                <label for="name" class="form-label fw-bold form-label">Service Name</label>
                <input
                  id="name"
                  type="text"
                  v-model="name"
                  class="form-control form-input"
                  placeholder="Enter service name"
                  required
                />
                <div v-if="errors.name" class="text-danger mt-1 error-text">
                  <i class="bi bi-exclamation-circle-fill me-1"></i>{{ errors.name[0] }}
                </div>
              </div>

              <!-- Description Field -->
              <div class="mb-3">
                <label for="description" class="form-label fw-bold form-label">Description</label>
                <textarea
                  id="description"
                  v-model="description"
                  class="form-control form-input"
                  placeholder="Enter service description"
                  rows="4"
                  required
                ></textarea>
                <div v-if="errors.description" class="text-danger mt-1 error-text">
                  <i class="bi bi-exclamation-circle-fill me-1"></i>{{ errors.description[0] }}
                </div>
              </div>

              <!-- Price Field -->
              <div class="mb-3">
                <label for="price" class="form-label fw-bold form-label">Price</label>
                <input
                  id="price"
                  type="number"
                  v-model="price"
                  class="form-control form-input"
                  placeholder="Enter service price"
                  required
                />
                <div v-if="errors.price" class="text-danger mt-1 error-text">
                  <i class="bi bi-exclamation-circle-fill me-1"></i>{{ errors.price[0] }}
                </div>
              </div>

              <!-- Villa ID Field -->
              <div class="mb-3">
                <label for="villa_id" class="form-label fw-bold form-label">Villa ID</label>
                <input
                  id="villa_id"
                  type="number"
                  v-model="villa_id"
                  class="form-control form-input"
                  placeholder="Enter villa ID"
                  required
                />
                <div v-if="errors.villa_id" class="text-danger mt-1 error-text">
                  <i class="bi bi-exclamation-circle-fill me-1"></i>{{ errors.villa_id[0] }}
                </div>
              </div>

              <!-- Submit Button -->
              <div class="d-flex justify-content-end">
                <button
                  type="submit"
                  class="btn btn-lg rounded shadow-sm btn-submit"
                  :disabled="isLoading"
                >
                  <i class="bi bi-save me-2"></i> Update Service
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
