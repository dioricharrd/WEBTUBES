<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "../../api/index.js";

// State untuk data reviews dan input form
const reviews = ref([]);
const newReview = ref({
  villa_id: "",
  customer_name: "",
  review: "",
  rating: 5,
});

// State untuk menyimpan error
const errors = ref({});

// Router untuk navigasi
const router = useRouter();

// Fungsi untuk mengambil data reviews dari API
const fetchReviews = async () => {
  try {
    const response = await api.get("/reviews");
    reviews.value = response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
};

// Fungsi untuk menambahkan review baru
const addReview = async () => {
  try {
    await api.post("/reviews", newReview.value);
    fetchReviews(); // Refresh data setelah menambahkan review
    newReview.value = { villa_id: "", customer_name: "", review: "", rating: 5 }; // Reset form
  } catch (error) {
    console.error("Error adding review:", error);
  }
};

// Fungsi untuk menghapus review
const deleteReview = async (id) => {
  if (confirm("Are you sure you want to delete this review?")) {
    try {
      await api.delete(`/reviews/${id}`);
      fetchReviews(); // Refresh daftar reviews setelah menghapus
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  }
};

// Fungsi untuk mengedit review
const editReview = (id) => {
  router.push({ name: "reviews.edit", params: { id } });
};

// Ambil data reviews saat halaman pertama kali dimuat
onMounted(fetchReviews);
</script>

<template>
  <div class="container mt-5 mb-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card border-0 rounded shadow-lg form-card">
          <div class="card-header text-white text-center fs-4 fw-bold form-header">
            <i class="bi bi-list-ul me-2"></i> Reviews List
          </div>
          <div class="card-body form-body">
            <!-- Form untuk menambahkan review baru -->
            <form @submit.prevent="addReview">
              <div class="mb-3">
                <label for="villa_id" class="form-label">Villa ID</label>
                <input
                  v-model="newReview.villa_id"
                  type="text"
                  id="villa_id"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="customer_name" class="form-label">Customer Name</label>
                <input
                  v-model="newReview.customer_name"
                  type="text"
                  id="customer_name"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="review" class="form-label">Review</label>
                <textarea
                  v-model="newReview.review"
                  id="review"
                  class="form-control"
                  required
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="rating" class="form-label">Rating (1-5)</label>
                <input
                  v-model="newReview.rating"
                  type="number"
                  id="rating"
                  class="form-control"
                  min="1"
                  max="5"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary">Add Review</button>
            </form>

            <!-- Tabel Daftar Ulasan -->
            <table class="table table-striped table-dark mt-4">
              <thead>
                <tr>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Review</th>
                  <th scope="col">Rating</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <!-- Loop untuk menampilkan reviews -->
                <tr v-for="review in reviews" :key="review.id">
                  <td>{{ review.customer_name }}</td>
                  <td>{{ review.review }}</td>
                  <td>{{ review.rating }}</td>
                  <td>
                    <button @click="editReview(review.id)" class="btn btn-warning me-2">
                      <i class="bi bi-pencil-square"></i> Edit
                    </button>
                    <button @click="deleteReview(review.id)" class="btn btn-danger">
                      <i class="bi bi-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- Jika tidak ada ulasan -->
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
</style>
