<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "../../api";

// State untuk form input
const customerName = ref("");
const checkIn = ref("");
const checkOut = ref("");
const reservationId = ref(null);

// Ambil parameter route
const route = useRoute();
const router = useRouter();

// Fungsi untuk mengambil data reservation berdasarkan ID
const fetchReservation = async () => {
  try {
    const response = await api.get(`/reservations/${route.params.id}`);
    const reservation = response.data;
    customerName.value = reservation.customer_name;
    checkIn.value = reservation.check_in;
    checkOut.value = reservation.check_out;
    reservationId.value = reservation.id;
  } catch (error) {
    console.error("Error fetching reservation:", error);
  }
};

// Fungsi untuk mengupdate reservation
const updateReservation = async () => {
  try {
    await api.put(`/reservations/${reservationId.value}`, {
      customer_name: customerName.value,
      check_in: checkIn.value,
      check_out: checkOut.value,
    });
    // Redirect setelah sukses update
    router.push({ name: "reservations.index" });
  } catch (error) {
    console.error("Error updating reservation:", error);
  }
};

// Fetch data saat komponen di-mount
onMounted(() => {
  fetchReservation();
});
</script>

<template>
  <div class="container mt-5 mb-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card border-0 rounded shadow-lg form-card">
          <!-- Header -->
          <div class="card-header text-white text-center fs-4 fw-bold form-header">
            <i class="bi bi-calendar-event me-2"></i> Edit Reservation
          </div>
          <div class="card-body form-body">
            <form @submit.prevent="updateReservation">
              <!-- Customer Name -->
              <div class="mb-3">
                <label for="customerName" class="form-label fw-bold form-label">Customer Name</label>
                <input
                  type="text"
                  id="customerName"
                  v-model="customerName"
                  class="form-control form-input"
                  required
                />
              </div>

              <!-- Check-in Date -->
              <div class="mb-3">
                <label for="checkIn" class="form-label fw-bold form-label">Check-in Date</label>
                <input
                  type="date"
                  id="checkIn"
                  v-model="checkIn"
                  class="form-control form-input"
                  required
                />
              </div>

              <!-- Check-out Date -->
              <div class="mb-3">
                <label for="checkOut" class="form-label fw-bold form-label">Check-out Date</label>
                <input
                  type="date"
                  id="checkOut"
                  v-model="checkOut"
                  class="form-control form-input"
                  required
                />
              </div>

              <!-- Submit Button -->
              <div class="d-flex justify-content-end">
                <button
                  type="submit"
                  class="btn btn-lg rounded shadow-sm btn-submit"
                >
                  <i class="bi bi-save me-2"></i> Update Reservation
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
