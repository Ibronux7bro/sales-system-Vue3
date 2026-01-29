<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="text-center">Invoice #{{ invoice.id }}</h2>
      <div>
        <Can model="Invoices" action="update">
          <RouterLink
            :to="`/invoices/edit/${invoice.id}`"
            class="btn btn-warning px-4 fw-bold me-2"
          >
            Edit
          </RouterLink>
        </Can>
        <RouterLink to="/invoices" class="btn btn-secondary px-4 fw-bold">
          Back to List
        </RouterLink>
      </div>
    </div>

    <!-- MASTER SECTION -->
    <div class="card mb-4" style="border: 1px solid #000">
      <div class="card-header bg-white border-bottom-0 pt-3 ps-3">
        <h5 class="card-title fw-bold" style="text-decoration: underline">
          Invoice Master
        </h5>
      </div>
      <div class="card-body">
        <div class="row mb-3">
          <div class="col-md-6 d-flex">
            <label class="fw-bold me-2" style="width: 100px">ID:</label>
            <span>{{ invoice.id }}</span>
          </div>
          <div class="col-md-6 d-flex">
            <label class="fw-bold me-2" style="width: 100px">Date:</label>
            <span>{{ invoice.invoice_date }}</span>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-md-6 d-flex">
            <label class="fw-bold me-2" style="width: 100px">Customer:</label>
            <span>{{ invoice.customer_name || invoice.customer }}</span>
          </div>
          <div class="col-md-6 d-flex">
            <label class="fw-bold me-2" style="width: 100px">Total:</label>
            <span class="fw-bold">{{ invoice.total_amount }}</span>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 d-flex">
            <label class="fw-bold me-2" style="width: 100px">Status:</label>
            <span :class="statusClass(invoice.status)" class="badge">
              {{ invoice.status }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- DETAILS SECTION -->
    <div class="card mb-5" style="border: 1px solid #000">
      <div class="card-header bg-white border-bottom-0 pt-3 ps-3">
        <h5 class="card-title fw-bold" style="text-decoration: underline">
          Invoice Details
        </h5>
      </div>
      <div class="card-body p-0">
        <table class="table table-bordered text-center mb-0">
          <thead class="table-light">
            <tr>
              <th style="width: 50%">Product</th>
              <th style="width: 15%">Quantity</th>
              <th style="width: 15%">Unit Price</th>
              <th style="width: 20%">Total Price</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td>{{ item.product_name || item.product }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.unit_price }}</td>
              <td>{{ item.amount }}</td>
            </tr>
            <tr v-if="items.length === 0">
              <td colspan="4" class="text-muted py-4">No products found.</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-end fw-bold pe-3">Totals</td>
              <td class="fw-bold">{{ invoice.total_amount }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import { getInvoiceDetail } from "@/api/invoices.api"
import Can from "@/components/permissions/Can.vue"

const route = useRoute()

const invoice = ref({})
const items = ref([])

onMounted(async () => {
  try {
    const res = await getInvoiceDetail(route.params.id)
    invoice.value = res.data
    items.value = res.data.items || []
  } catch (error) {
    console.error("Error loading invoice:", error)
  }
})

const statusClass = (status) => {
  if (status === "paid") return "bg-success"
  if (status === "refused") return "bg-danger"
  return "bg-warning text-dark"
}
</script>
