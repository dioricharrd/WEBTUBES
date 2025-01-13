<script setup>
// Import ref and router
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

// Import API
import api from "../../api/index.js";

// State for form input and loading status
const name = ref("");
const position = ref("");
const email = ref("");
const phone = ref("");
const errors = ref({});
const isLoading = ref(true); // New state to handle loading

// Fetch route parameters and initialize staff
const route = useRoute();
const router = useRouter();

// Fetch staff data based on route parameter
const fetchStaff = async () => {
  try {
    const staffIdFromRoute = route.params.id; // Get the staff ID from the route
    if (!staffIdFromRoute) {
      throw new Error("Staff ID not provided in route params.");
    }

    const response = await api.get(`/villa-staff/${staffIdFromRoute}`);
    const staff = response.data;

    // Validate received staff data
    if (!staff || !staff.id) {
      throw new Error("Invalid staff data received.");
    }

    // Populate form with staff data
    name.value = staff.name;
    position.value = staff.position;
    email.value = staff.email;
    phone.value = staff.phone;

  } catch (error) {
    console.error("Error fetching staff data:", error);
    if (error.response && error.response.status === 404) {
      router.push({ name: "staffs.index" });
    }
  } finally {
    isLoading.value = false; // Set loading to false after fetching is done
  }
};

// Function to update staff data
const updateStaff = async () => {
  try {
    const updatedData = {
      name: name.value,
      position: position.value,
      email: email.value,
      phone: phone.value,
    };

    const staffIdFromRoute = route.params.id;
    if (!staffIdFromRoute) {
      console.error("Staff ID is not available in route parameters.");
      return;
    }

    // Make the PUT request to update the staff
    await api.put(`/villa-staff/${staffIdFromRoute}`, updatedData);

    // Redirect to the staff list after successful update
    router.push({ name: "staffs.index" });
  } catch (error) {
    if (error.response && error.response.data.errors) {
      errors.value = error.response.data.errors;
    } else {
      console.error("Error updating staff:", error);
    }
  }
};

// Fetch staff data on component mount
onMounted(() => {
  fetchStaff();
});

</script>

<template>
  <div class="container mt-5 mb-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card border-0 rounded shadow-lg form-card">
          <!-- Header -->
          <div class="card-header text-white text-center fs-4 fw-bold form-header">
            <i class="bi bi-pencil-square me-2"></i> Edit Staff
          </div>

          <div class="card-body form-body">
            <!-- Show loading indicator while fetching data -->
            <div v-if="isLoading">
              <p class="text-center">Loading staff data...</p>
            </div>

            <form v-else @submit.prevent="updateStaff">
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

              <div class="d-flex justify-content-end">
                <button
                  type="submit"
                  class="btn btn-lg rounded shadow-sm btn-submit"
                >
                  <i class="bi bi-save me-2"></i> Update Staff
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
