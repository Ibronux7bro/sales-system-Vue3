<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="fw-bold">Products List</h2>
      <RouterLink to="/products/create" class="btn btn-primary px-4 fw-bold">
        + New Product
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
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td>{{ product.id }}</td>
              <td class="fw-bold">{{ product.name }}</td>
              <td>${{ product.price }}</td>
              <td>{{ product.quantity }}</td>
              <td>
                <RouterLink
                  :to="`/products/edit/${product.id}`"
                  class="btn btn-sm btn-warning me-1"
                >
                  Edit
                </RouterLink>
                <RouterLink
                  :to="`/products/delete/${product.id}`"
                  class="btn btn-sm btn-danger"
                >
                  Delete
                </RouterLink>
              </td>
            </tr>

            <tr v-if="products.length === 0 && !loading">
              <td colspan="5" class="text-center py-4 text-muted">
                No products found.
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
import { getProducts } from "@/api/products.api"

const products = ref([])
const loading = ref(true)
const error = ref("")

onMounted(async () => {
  try {
    console.log("Fetching products...")
    const res = await getProducts()
    console.log("Products response:", res.data)
    products.value = res.data
  } catch (err) {
    console.error("Error loading products:", err)
    error.value = "Failed to load products: " + (err.response?.data?.error || err.message)
  } finally {
    loading.value = false
  }
})
</script>
