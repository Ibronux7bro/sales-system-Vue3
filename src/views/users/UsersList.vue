<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="fw-bold">Users List</h2>
      <RouterLink to="/users/create" class="btn btn-primary px-4 fw-bold">
        + New User
      </RouterLink>
    </div>

    <div v-if="loading" class="text-center py-4">
      <span class="spinner-border spinner-border-sm me-2"></span>
      Loading...
    </div>

    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <div class="card shadow-sm" style="border: 1px solid #000">
      <div class="card-body p-0">
        <table class="table table-hover mb-0 text-center align-middle">
          <thead class="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td class="fw-bold">{{ user.name || user.username }}</td>
              <td>{{ user.email }}</td>
              <td>
                <span class="badge bg-primary">
                  {{ user.role || 'N/A' }}
                </span>
              </td>
              <td>
                <span
                  class="badge"
                  :class="user.status === 'active' ? 'bg-success' : 'bg-secondary'"
                >
                  {{ user.status || 'active' }}
                </span>
              </td>
              <td>
                <RouterLink
                  :to="`/users/edit/${user.id}`"
                  class="btn btn-sm btn-warning me-1"
                >
                  Edit
                </RouterLink>
                <RouterLink
                  :to="`/users/delete/${user.id}`"
                  class="btn btn-sm btn-danger"
                >
                  Delete
                </RouterLink>
              </td>
            </tr>

            <tr v-if="users.length === 0 && !loading">
              <td colspan="6" class="text-center py-4 text-muted">
                No users found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { getUsers } from "@/api/users.api"

const users = ref([])
const loading = ref(true)
const error = ref("")

onMounted(async () => {
  try {
    console.log("Fetching users...")
    const res = await getUsers()
    console.log("Users response:", res.data)
    users.value = res.data
  } catch (err) {
    console.error("Error loading users:", err)
    error.value = "Failed to load users: " + (err.response?.data?.error || err.message)
  } finally {
    loading.value = false
  }
})
</script>
