<script setup>
// Import ref, onMounted, and router
import { ref } from "vue";
import { useRouter } from "vue-router";

// Import API
import api from "../../api/index.js"; // Updated path to match the "Transportation" folder

// State for form inputs
const name = ref("");
const description = ref("");
const price = ref("");
const villa_id = ref("");
const errors = ref({});

// State to hold newly created service data
const createdService = ref(null);

// Loading state
const isLoading = ref(false);

// Router for navigation
const router = useRouter();

// Function to create new transportation service
const createTransportationService = async () => {
  isLoading.value = true; // Set loading state to true when sending request

  try {
    const serviceData = {
      name: name.value,
      description: description.value,
      price: price.value,
      villa_id: villa_id.value,
    };

    const response = await api.post("/transportation-services", serviceData);

    // Store the created service in the createdService state
    createdService.value = response.data;

    // Redirect to transportation service list after successful creation
    router.push({ name: "transportation-services.index" });
  } catch (error) {
    if (error.response && error.response.data.errors) {
      errors.value = error.response.data.errors;
    } else {
      console.error("Error adding transportation service:", error);
    }
  } finally {
    isLoading.value = false; // Set loading state to false after request is completed
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
            <i class="bi bi-plus-circle me-2"></i> Add New Transportation Service
          </div>
          <div class="card-body form-body">
            <form @submit.prevent="createTransportationService">
              <!-- Name Field -->
              <div class="mb-3">
                <label for="name" class="form-label fw-bold form-label">Name</label>
                <input
                  id="name"
                  type="text"
                  v-model="name"
                  class="form-control form-input"
                  placeholder="Enter transportation service name"
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
                  placeholder="Enter price"
                  required
                />
                <div v-if="errors.price" class="text-danger mt-1 error-text">
                  <i class="bi bi-exclamation-circle-fill me-1"></i>{{ errors.price[0] }}
                </div>
              </div>

              <!-- Villa ID Field -->
              <div class="mb-3">
                <label for="villa_id" class="form-label fw-bold form-label">Villa</label>
                <input
                  id="villa_id"
                  type="number"
                  v-model="villa_id"
                  class="form-control form-input"
                  placeholder="Enter associated villa ID"
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
                  <i class="bi bi-save me-2"></i> Add Service
                  <span v-if="isLoading" class="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span>
                </button>
              </div>
            </form>

            <!-- Display Created Service -->
            <div v-if="createdService" class="mt-4 alert alert-success">
              <h5 class="alert-heading">Transportation Service Created!</h5>
              <p><strong>Name:</strong> {{ createdService.name }}</p>
              <p><strong>Description:</strong> {{ createdService.description }}</p>
              <p><strong>Price:</strong> ${{ createdService.price }}</p>
              <p><strong>Villa ID:</strong> {{ createdService.villa_id }}</p>
            </div>
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

/* Success Message Styling */
.alert-success {
  background-color: #28a745;
  color: white;
}
</style>
