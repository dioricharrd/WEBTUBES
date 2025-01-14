<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import api from "../../api/index.js";

const review = ref({
  villa_id: "",
  customer_name: "",
  review: "",
  rating: 5,
});
const errors = ref({});
const router = useRouter();
const route = useRoute();
const reviewId = route.params.id;

const fetchReview = async () => {
  try {
    const response = await api.get(`/reviews/${reviewId}`);
    review.value = response.data;
  } catch (error) {
    console.error("Error fetching review:", error);
  }
};

const updateReview = async () => {
  try {
    await api.put(`/reviews/${reviewId}`, review.value);
    router.push({ name: "reviews.index" });
  } catch (error) {
    console.error("Error updating review:", error);
  }
};

onMounted(fetchReview);
</script>

<template>
  <div class="container mt-5 mb-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card border-0 rounded shadow-lg form-card">
          <div class="card-header text-white text-center fs-4 fw-bold form-header">
            <i class="bi bi-pencil-square me-2"></i> Edit Review
          </div>
          <div class="card-body form-body">
            <form @submit.prevent="updateReview">
              <div class="mb-3">
                <label for="villa_id" class="form-label">Villa ID</label>
                <input
                  v-model="review.villa_id"
                  type="text"
                  id="villa_id"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="customer_name" class="form-label">Customer Name</label>
                <input
                  v-model="review.customer_name"
                  type="text"
                  id="customer_name"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="review" class="form-label">Review</label>
                <textarea
                  v-model="review.review"
                  id="review"
                  class="form-control"
                  required
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="rating" class="form-label">Rating (1-5)</label>
                <input
                  v-model="review.rating"
                  type="number"
                  id="rating"
                  class="form-control"
                  min="1"
                  max="5"
                  required
                />
              </div>
              <button type="submit" class="btn btn-success">Update Review</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
