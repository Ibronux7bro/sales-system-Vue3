<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
    <div class="container">
      <RouterLink class="navbar-brand" to="/invoices">Invoice System</RouterLink>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/invoices">Invoices</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/customers">Customers</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/products">Products</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/users">Users</RouterLink>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <li v-if="auth.isAuthenticated" class="nav-item">
            <span class="nav-link">Hello, {{ auth.user?.username || auth.user?.email }}</span>
          </li>
          <li v-if="auth.isAuthenticated" class="nav-item">
            <button
              type="button"
              class="btn btn-link nav-link"
              style="text-decoration: none"
              @click="logout"
            >
              Logout
            </button>
          </li>
          <li v-else class="nav-item">
            <RouterLink class="nav-link" to="/login">Login</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth.store"
import { useRouter } from "vue-router"

const auth = useAuthStore()
const router = useRouter()

const logout = () => {
  auth.logout()
  router.push("/login")
}
</script>
