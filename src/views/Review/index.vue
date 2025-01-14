<script setup>
// Import ref, onMounted, dan router
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "../../api/index.js";

const reviews = ref([]);
const errors = ref({});
const router = useRouter();

// Fungsi untuk mengambil data ulasan
const fetchReviews = async () => {
  try {
    const response = await api.get("/reviews");
    reviews.value = response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
};

// Fungsi untuk menghapus ulasan
const deleteReview = async (id) => {
  if (confirm("Are you sure you want to delete this review?")) {
    try {
      await api.delete(`/reviews/${id}`);
      fetchReviews(); // Refresh daftar ulasan setelah penghapusan
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  }
};

// Ambil data ulasan saat komponen dimuat
onMounted(() => {
  fetchReviews();
});
</script>

<template>
  <div class="container mt-5 mb-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card border-0 rounded shadow-lg form-card">
          <div class="card-header text-white text-center fs-4 fw-bold form-header">
            <i class="bi bi-list-ul me-2"></i> Reviews List
            <button
              class="btn btn-success float-end"
              @click="router.push({ name: 'reviews.create' })"
            >
              <i class="bi bi-plus-circle"></i> Add Review
            </button>
          </div>
          <div class="card-body form-body">
            <table class="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Review</th>
                  <th scope="col">Rating</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="review in reviews" :key="review.id">
                  <td>{{ review.customer_name }}</td>
                  <td>{{ review.review }}</td>
                  <td>{{ review.rating }}</td>
                  <td>
                    <button
                      @click="router.push({ name: 'reviews.edit', params: { id: review.id } })"
                      class="btn btn-warning me-2"
                    >
                      <i class="bi bi-pencil-square"></i> Edit
                    </button>
                    <button
                      @click="deleteReview(review.id)"
                      class="btn btn-danger"
                    >
                      <i class="bi bi-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="reviews.length === 0" class="text-center mt-4">
              <p>No reviews found.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
/* Styling untuk Card */
.form-card {
  background-color: #2d2d2d;
  border-radius: 10px;
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

/* Styling untuk Header */
.form-header {
  background-color: #00467f;
  font-size: 1.25rem;
  font-weight: bold;
}

/* Styling untuk Body */
.form-body {
  background-color: #1f1f1f;
  padding: 1.5rem;
  color: white;
}

/* Styling untuk Tabel */
.table th,
.table td {
  text-align: center;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: #333;
}

.table th {
  color: #e6b980;
}

.table td {
  color: white;
}

/* Button Styling */
.btn {
  font-weight: bold;
  padding: 0.5rem 1rem;
}

.btn-warning {
  background-color: #f39c12;
  border-color: #f39c12;
}

.btn-warning:hover {
  background-color: #e67e22;
  border-color: #e67e22;
}

.btn-danger {
  background-color: #e74c3c;
  border-color: #e74c3c;
}

.btn-danger:hover {
  background-color: #c0392b;
  border-color: #c0392b;
}

.btn-success {
  background-color: #2ecc71;
  border-color: #2ecc71;
}

.btn-success:hover {
  background-color: #27ae60;
  border-color: #27ae60;
}
</style>
