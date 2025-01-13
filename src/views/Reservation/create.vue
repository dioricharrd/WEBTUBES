<script setup>
    // Import ref
    import { ref } from "vue";

    // Import router
    import { useRouter } from "vue-router";

    // Import api
    import api from "../../api";

    // Init router
    const router = useRouter();

    // Define state sesuai dengan ReservationController
    const villa_id = ref("");
    const customer_name = ref("");
    const check_in = ref("");
    const check_out = ref("");
    const number_of_guests = ref("");
    const errors = ref({});

    // Method "storeReservation"
    const storeReservation = async () => {
        // Init formData
        let formData = new FormData();

        // Assign state value to formData
        formData.append("villa_id", villa_id.value);
        formData.append("customer_name", customer_name.value);
        formData.append("check_in", check_in.value);
        formData.append("check_out", check_out.value);
        formData.append("number_of_guests", number_of_guests.value);

        try {
            // Store data with API
            const response = await api.post("/reservations", formData);

            // Check if response is successful
            if (response.status === 201) {
                // Redirect after success
                router.push({ path: "/reservations" });
            }
        } catch (error) {
            // Handle errors and display error messages
            if (error.response && error.response.data.errors) {
                errors.value = error.response.data.errors;
            } else {
                console.error("An unexpected error occurred:", error);
            }
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
                        <i class="bi bi-calendar-plus me-2"></i> Add Reservation
                    </div>
                    <div class="card-body form-body">
                        <form @submit.prevent="storeReservation()">
                            <!-- Villa ID -->
                            <div class="mb-3">
                                <label class="form-label fw-bold form-label">Villa ID</label>
                                <input
                                    type="text"
                                    class="form-control form-input"
                                    v-model="villa_id"
                                    placeholder="Villa ID"
                                />
                                <div v-if="errors.villa_id" class="text-danger mt-1 error-text">
                                    <i class="bi bi-exclamation-circle-fill me-1"></i>{{ errors.villa_id[0] }}
                                </div>
                            </div>

                            <!-- Customer Name -->
                            <div class="mb-3">
                                <label class="form-label fw-bold form-label">Customer Name</label>
                                <input
                                    type="text"
                                    class="form-control form-input"
                                    v-model="customer_name"
                                    placeholder="Customer Name"
                                />
                                <div v-if="errors.customer_name" class="text-danger mt-1 error-text">
                                    <i class="bi bi-exclamation-circle-fill me-1"></i>{{ errors.customer_name[0] }}
                                </div>
                            </div>

                            <!-- Check-in Date -->
                            <div class="mb-3">
                                <label class="form-label fw-bold form-label">Check-in Date</label>
                                <input
                                    type="date"
                                    class="form-control form-input"
                                    v-model="check_in"
                                />
                                <div v-if="errors.check_in" class="text-danger mt-1 error-text">
                                    <i class="bi bi-exclamation-circle-fill me-1"></i>{{ errors.check_in[0] }}
                                </div>
                            </div>

                            <!-- Check-out Date -->
                            <div class="mb-3">
                                <label class="form-label fw-bold form-label">Check-out Date</label>
                                <input
                                    type="date"
                                    class="form-control form-input"
                                    v-model="check_out"
                                />
                                <div v-if="errors.check_out" class="text-danger mt-1 error-text">
                                    <i class="bi bi-exclamation-circle-fill me-1"></i>{{ errors.check_out[0] }}
                                </div>
                            </div>

                            <!-- Number of Guests -->
                            <div class="mb-3">
                                <label class="form-label fw-bold form-label">Number of Guests</label>
                                <input
                                    type="number"
                                    class="form-control form-input"
                                    v-model="number_of_guests"
                                    placeholder="Number of Guests"
                                />
                                <div v-if="errors.number_of_guests" class="text-danger mt-1 error-text">
                                    <i class="bi bi-exclamation-circle-fill me-1"></i>{{ errors.number_of_guests[0] }}
                                </div>
                            </div>

                            <!-- Submit Button -->
                            <div class="d-flex justify-content-end">
                                <button
                                    type="submit"
                                    class="btn btn-lg rounded shadow-sm btn-submit"
                                >
                                    <i class="bi bi-save me-2"></i> Save Reservation
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
