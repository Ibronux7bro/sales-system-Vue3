<template>
  <div class="container mt-4">
    <h2 class="text-center mb-4">
      {{ isEdit ? "Update Product" : "Create Product" }}
    </h2>

    <div class="card shadow-sm">
      <div class="card-body p-4">
        <form @submit.prevent="save">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="fw-bold">Name</label>
              <input v-model="form.name" class="form-control" required />
            </div>

            <div class="col-md-3 mb-3">
              <label class="fw-bold">Price</label>
              <input v-model="form.price" type="number" class="form-control" />
            </div>

            <div class="col-md-3 mb-3">
              <label class="fw-bold">Quantity</label>
              <input v-model="form.quantity" type="number" class="form-control" />
            </div>
          </div>

          <div class="mb-4">
            <label class="fw-bold">Description</label>
            <textarea v-model="form.description" class="form-control" />
          </div>

          <button class="btn btn-success px-4 fw-bold">Save</button>
          <RouterLink to="/products" class="btn btn-secondary px-4 fw-bold ms-2">
            Cancel
          </RouterLink>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { createProduct, getProduct, updateProduct } from "@/api/products.api"

const route = useRoute()
const router = useRouter()

const isEdit = route.params.id
const form = ref({
  name: "",
  price: "",
  quantity: "",
  description: "",
})

onMounted(async () => {
  if (isEdit) {
    const res = await getProduct(isEdit)
    form.value = res.data
  }
})

const save = async () => {
  if (isEdit) {
    await updateProduct(isEdit, form.value)
  } else {
    await createProduct(form.value)
  }
  router.push("/products")
}
</script>
