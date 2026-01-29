<template>
  <div
    class="container d-flex justify-content-center align-items-center"
    style="min-height: 80vh"
  >
    <div
      class="card shadow-lg"
      style="width: 400px; border: 2px solid #000; border-radius: 15px"
    >
      <!-- HEADER -->
      <div
        class="card-header bg-dark text-white text-center py-3"
        style="border-radius: 13px 13px 0 0"
      >
        <h3 class="mb-0 fw-bold">Invoice System Login</h3>
      </div>

      <!-- BODY -->
      <div class="card-body p-5">
        <!-- ERROR -->
        <div v-if="error" class="alert alert-danger">
          {{ error }}
        </div>

        <form @submit.prevent="login">
          <!-- EMAIL -->
          <div class="mb-3">
            <label class="form-label fw-bold">Email</label>
            <input
              v-model="email"
              type="email"
              class="form-control"
              required
              autofocus
            />
          </div>

          <!-- PASSWORD -->
          <div class="mb-4">
            <label class="form-label fw-bold">Password</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              required
            />
          </div>

          <button
            type="submit"
            class="btn btn-dark w-100 fw-bold py-2"
            :disabled="loading"
          >
            {{ loading ? "Signing in..." : "Sign In" }}
          </button>
        </form>
      </div>

      <!-- FOOTER -->
      <div
        class="card-footer text-center py-3 bg-light"
        style="border-radius: 0 0 13px 13px"
      >
        <small class="text-muted">
          Use <b>admin@example.com</b> / <b>admin</b>
        </small>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useAuthStore } from "@/stores/auth.store"
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")
const error = ref("")
const loading = ref(false)

const auth = useAuthStore()
const router = useRouter()

const login = async () => {
  error.value = ""
  loading.value = true

  try {
    await auth.login({
      email: email.value,
      password: password.value,
    })

    router.push("/invoices")
  } catch (e) {
    error.value = "Email or password is incorrect"
  } finally {
    loading.value = false
  }
}
</script>
