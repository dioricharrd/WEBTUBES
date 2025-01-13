<script setup>
    // Import ref
    import { ref } from "vue";

    // Import router
    import { useRouter } from 'vue-router';

    // Import api
    import api from "../../api";

    // Init router
    const router = useRouter();

    // Define state
    const name = ref("");
    const description = ref("");
    const price = ref("");
    const capacity = ref("");
    const errors = ref([]);

    // Method "storeVilla"
    const storeVilla = async () => {
        // Init formData
        let formData = new FormData();

        // Assign state value to formData
        formData.append("name", name.value);
        formData.append("description", description.value);
        formData.append("price", price.value);
        formData.append("capacity", capacity.value);

        try {
            // Store data with API
            const response = await api.post('/villas', formData);

            // Check if response is successful
            if (response.status === 201) {
                // Redirect after success
                router.push({ path: "/villas" });
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
                        <i class="bi bi-plus-circle me-2"></i> Add New Villa
                    </div>
                    <div class="card-body form-body">
                        <form @submit.prevent="storeVilla()">
                            <!-- Name -->
                            <div class="mb-3">
                                <label class="form-label fw-bold form-label">Name</label>
                                <input
                                    type="text"
                                    class="form-control form-input"
                                    v-model="name"
                                    placeholder="Villa Name"
                                />
                                <div v-if="errors.name" class="text-danger mt-1 error-text">
                                    <i class="bi bi-exclamation-circle-fill me-1"></i>{{ errors.name[0] }}
                                </div>
                            </div>

                            <!-- Description -->
                            <div class="mb-3">
                                <label class="form-label fw-bold form-label">Description</label>
                                <textarea
                                    class="form-control form-input"
                                    v-model="description"
                                    rows="4"
                                    placeholder="Villa Description"
                                ></textarea>
                                <div v-if="errors.description" class="text-danger mt-1 error-text">
                                    <i class="bi bi-exclamation-circle-fill me-1"></i>{{ errors.description[0] }}
                                </div>
                            </div>

                            <!-- Price -->
                            <div class="mb-3">
                                <label class="form-label fw-bold form-label">Price</label>
                                <input
                                    type="number"
                                    class="form-control form-input"
                                    v-model="price"
                                    placeholder="Villa Price"
                                />
                                <div v-if="errors.price" class="text-danger mt-1 error-text">
                                    <i class="bi bi-exclamation-circle-fill me-1"></i>{{ errors.price[0] }}
                                </div>
                            </div>

                            <!-- Capacity -->
                            <div class="mb-3">
                                <label class="form-label fw-bold form-label">Capacity</label>
                                <input
                                    type="number"
                                    class="form-control form-input"
                                    v-model="capacity"
                                    placeholder="Villa Capacity"
                                />
                                <div v-if="errors.capacity" class="text-danger mt-1 error-text">
                                    <i class="bi bi-exclamation-circle-fill me-1"></i>{{ errors.capacity[0] }}
                                </div>
                            </div>

                            <!-- Submit Button -->
                            <div class="d-flex justify-content-end">
                                <button
                                    type="submit"
                                    class="btn btn-lg rounded shadow-sm btn-submit"
                                >
                                    <i class="bi bi-save me-2"></i> Save Villa
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
