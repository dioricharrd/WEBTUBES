<template>
    <div>
        <!-- Navbar -->
        <nav class="navbar navbar-expand-lg custom-navbar">
            <div class="container">
                <!-- Brand Logo -->
                <router-link :to="{ name: 'home' }" class="navbar-brand">
                    <span class="brand-text">AMANKILLA VILLA</span>
                </router-link>

                <!-- Mobile Toggle Button -->
                <button
                    class="navbar-toggler custom-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>

                <!-- Navbar Items -->
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <router-link :to="{ name: 'villas.index' }" class="nav-link" active-class="active">
                                <i class="bi bi-house-heart me-1"></i>
                                VILLAS
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'reservations.index' }" class="nav-link" active-class="active">
                                <i class="bi bi-calendar-check me-1"></i>
                                RESERVATIONS
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'menus.index' }" class="nav-link" active-class="active">
                                <i class="bi bi-cup-hot me-1"></i>
                                RESTAURANT
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'staffs.index' }" class="nav-link" active-class="active">
                                <i class="bi bi-people me-1"></i>
                                STAFF
                            </router-link>
                        </li>
                        <!-- Transportation Menu -->
                        <li class="nav-item">
                            <router-link :to="{ name: 'transportation-services.index' }" class="nav-link" active-class="active">
                                <i class="bi bi-car-front me-1"></i>
                                TRANSPORTATION
                            </router-link>
                        </li>

                        <!-- Button to Review -->
                        <li class="nav-item">
                            <router-link :to="{ name: 'reviews.index' }" class="nav-link" active-class="active">
                                <i class="bi bi-star me-1"></i> REVIEW
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <!-- Router View -->
        <router-view></router-view>
    </div>
</template>

<style scoped>
.custom-navbar {
    background: linear-gradient(to right, #1a1a1a, #2d2d2d);
    padding: 1rem 0;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
}

.brand-text {
    font-size: 1.5rem;
    font-weight: 700;
    background: linear-gradient(45deg, #e6b980, #eacda3);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 1px;
}

.navbar-nav {
    gap: 0.5rem;
}

.nav-link {
    color: #ffffff !important;
    font-size: 0.9rem;
    font-weight: 500;
    letter-spacing: 1px;
    padding: 0.7rem 1.2rem !important;
    border-radius: 5px;
    transition: all 0.3s ease;
    position: relative;
    display: flex;
    align-items: center;
}

.nav-link:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
}

.nav-link.active {
    background: linear-gradient(45deg, #e6b980, #eacda3);
    color: #1a1a1a !important;
}

.nav-link i {
    font-size: 1.1rem;
    margin-right: 0.5rem;
}

/* Custom Toggler */
.custom-toggler {
    border: none;
    padding: 0.5rem;
}

.custom-toggler:focus {
    box-shadow: none;
}

.navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.7%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

/* Responsive Design */
@media (max-width: 991.98px) {
    .navbar-nav {
        padding: 1rem 0;
    }

    .nav-link {
        padding: 0.8rem 1rem !important;
        justify-content: center;
    }

    .navbar-collapse {
        background: linear-gradient(to bottom, #1a1a1a, #2d2d2d);
        border-radius: 10px;
        margin-top: 1rem;
        padding: 1rem;
    }
}
</style>
