<script setup>
// Import ref, onMounted, and router
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

// Import API
import api from "../../api/index.js";

// State for storing transportation service data
const transportationServices = ref([]);
const isLoading = ref(false);
const errors = ref({});

// Router for navigation
const router = useRouter();

// Function to load transportation services
const loadTransportationServices = async () => {
  isLoading.value = true;

  try {
    const response = await api.get("/transportation-services");
    transportationServices.value = response.data;
  } catch (error) {
    console.error("Error fetching transportation services:", error);
  } finally {
    isLoading.value = false;
  }
};

// Function to delete transportation service
const deleteTransportationService = async (id) => {
  const confirmDelete = confirm("Are you sure you want to delete this service?");
  if (confirmDelete) {
    try {
      await api.delete(`/transportation-services/${id}`);
      loadTransportationServices(); // Reload data after deletion
    } catch (error) {
      console.error("Error deleting transportation service:", error);
    }
  }
};

// Call the function to load data when the component is mounted
onMounted(loadTransportationServices);
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <div class="card border-0 rounded shadow-lg">
          <!-- Header -->
          <div class="card-header d-flex justify-content-between align-items-center text-white fs-4 fw-bold" style="background-color: #00467f;">
            <div>
              <i class="bi bi-bus-front me-2"></i> Transportation Services
            </div>
            <!-- Create Button -->
            <button
              @click="router.push({ name: 'transportation-services.create' })"
              class="btn btn-create shadow"
            >
              <i class="bi bi-plus-circle me-2"></i> Create New Service
            </button>
          </div>
          <div class="card-body">
            <!-- Loading State -->
            <div v-if="isLoading" class="text-center">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>

            <!-- No Data State -->
            <div v-if="!isLoading && transportationServices.length === 0" class="text-center">
              <p>No transportation services available.</p>
            </div>

            <!-- Table with Data -->
            <div v-if="!isLoading && transportationServices.length > 0">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Service Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Price</th>
                    <th scope="col">Villa</th>
                    <th scope="col" class="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="service in transportationServices" :key="service.id">
                    <td>{{ service.name }}</td>
                    <td>{{ service.description }}</td>
                    <td>{{ service.price | currency }}</td>
                    <td>{{ service.villa_id }}</td>
                    <td class="text-center">
                      <button
                        @click="router.push({ name: 'transportation-services.edit', params: { id: service.id } })"
                        class="btn btn-sm btn-warning me-2"
                      >
                        <i class="bi bi-pencil"></i> Edit
                      </button>
                      <button
                        @click="deleteTransportationService(service.id)"
                        class="btn btn-sm btn-danger"
                      >
                        <i class="bi bi-trash"></i> Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Table Styling */
.table th, .table td {
  vertical-align: middle;
}

.table th {
  background-color: #00467f;
  color: white;
}

.table tbody tr:hover {
  background-color: #f1f1f1;
}

/* Button Styling */
.btn-create {
  background-color: #28a745;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  padding: 0.5rem 1.5rem;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.btn-create:hover {
  background-color: #218838;
  color: #ffffff;
}

.btn-edit {
  background-color: #f39c12;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  padding: 0.5rem 1.5rem;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.btn-edit:hover {
  background-color: #e67e22;
  color: #1a1a1a;
}

.btn-delete {
  background-color: #e74c3c;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  padding: 0.5rem 1.5rem;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.btn-delete:hover {
  background-color: #c0392b;
  color: white;
}
</style>
