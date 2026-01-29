<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="fw-bold">Customers List</h2>
      <RouterLink to="/customers/create" class="btn btn-primary px-4 fw-bold">
        + New Customer
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
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="customer in customers" :key="customer.id">
              <td>{{ customer.id }}</td>
              <td class="fw-bold">{{ customer.name }}</td>
              <td>{{ customer.email }}</td>
              <td>{{ customer.phone }}</td>
              <td>
                <RouterLink
                  :to="`/customers/edit/${customer.id}`"
                  class="btn btn-sm btn-warning me-1"
                >
                  Edit
                </RouterLink>
                <RouterLink
                  :to="`/customers/delete/${customer.id}`"
                  class="btn btn-sm btn-danger"
                >
                  Delete
                </RouterLink>
              </td>
            </tr>

            <tr v-if="customers.length === 0 && !loading">
              <td colspan="5" class="text-center py-4 text-muted">
                No customers found.
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
import { getCustomers } from "@/api/customers.api"

const customers = ref([])
const loading = ref(true)
const error = ref("")

onMounted(async () => {
  try {
    console.log("Fetching customers...")
    const res = await getCustomers()
    console.log("Customers response:", res.data)
    customers.value = res.data
  } catch (err) {
    console.error("Error loading customers:", err)
    error.value = "Failed to load customers: " + (err.response?.data?.error || err.message)
  } finally {
    loading.value = false
  }
})
</script>
