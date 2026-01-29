<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>Invoices</h2>
      <RouterLink to="/invoices/create" class="btn btn-primary">
        Create Invoice
      </RouterLink>
    </div>

    <div v-if="loading" class="text-center py-4">
      <span class="spinner-border spinner-border-sm me-2"></span>
      Loading...
    </div>

    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <table v-if="!loading" class="table table-striped table-hover">
      <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Customer</th>
          <th>Date</th>
          <th>Total Amount</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="invoice in invoices" :key="invoice.id">
          <td>{{ invoice.id }}</td>
          <td>{{ invoice.customer }}</td>
          <td>{{ invoice.invoice_date }}</td>
          <td>{{ invoice.total_amount }}</td>
          <td>
            <span class="badge" :class="statusClass(invoice.status)">
              {{ statusDisplay(invoice.status) }}
            </span>
          </td>
          <td>
            <RouterLink
              :to="`/invoices/${invoice.id}`"
              class="btn btn-sm btn-info"
            >
              View
            </RouterLink>
            <RouterLink
              :to="`/invoices/edit/${invoice.id}`"
              class="btn btn-sm btn-warning"
            >
              Edit
            </RouterLink>
            <RouterLink
              :to="`/invoices/delete/${invoice.id}`"
              class="btn btn-sm btn-danger"
            >
              Delete
            </RouterLink>
          </td>
        </tr>

        <tr v-if="invoices.length === 0 && !loading">
          <td colspan="6" class="text-center">No invoices found.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { getInvoices } from "@/api/invoices.api"

const invoices = ref([])
const loading = ref(true)
const error = ref("")

onMounted(async () => {
  try {
    console.log("Fetching invoices...")
    const res = await getInvoices()
    console.log("Invoices response:", res.data)
    invoices.value = res.data
  } catch (err) {
    console.error("Error loading invoices:", err)
    error.value = "Failed to load invoices: " + (err.response?.data?.error || err.message)
  } finally {
    loading.value = false
  }
})

const statusClass = (status) => {
  if (status === "paid") return "bg-success"
  if (status === "refused") return "bg-danger"
  return "bg-warning"
}

const statusDisplay = (status) => {
  if (status === "paid") return "Paid"
  if (status === "refused") return "Refused"
  return "Pending"
}
</script>
