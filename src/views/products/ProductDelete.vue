<template>
  <div class="row justify-content-center mt-5">
    <div class="col-md-6">
      <div class="card border-danger">
        <div class="card-header bg-danger text-white text-center">
          Delete Product
        </div>

        <div class="card-body text-center p-4">
          <p class="fs-5">
            Are you sure you want to delete <b>{{ product.name }}</b>?
          </p>

          <button @click="confirmDelete" class="btn btn-danger px-4 fw-bold">
            Confirm Delete
          </button>

          <RouterLink to="/products" class="btn btn-secondary px-4 fw-bold ms-2">
            Cancel
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { getProduct, deleteProduct } from "@/api/products.api"

const route = useRoute()
const router = useRouter()
const product = ref({})

onMounted(async () => {
  const res = await getProduct(route.params.id)
  product.value = res.data
})

const confirmDelete = async () => {
  await deleteProduct(route.params.id)
  router.push("/products")
}
</script>
