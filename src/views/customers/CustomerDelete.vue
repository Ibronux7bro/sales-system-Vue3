<template>
  <div class="row justify-content-center mt-5">
    <div class="col-md-6">
      <div class="card border-danger">
        <div class="card-header bg-danger text-white text-center">
          Delete Customer
        </div>

        <div class="card-body text-center p-4">
          <p class="fs-5">
            Are you sure you want to delete <b>{{ customer.name }}</b>?
          </p>

          <button @click="confirmDelete" class="btn btn-danger px-4 fw-bold">
            Confirm Delete
          </button>

          <RouterLink to="/customers" class="btn btn-secondary px-4 fw-bold ms-2">
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
import { getCustomer, deleteCustomer } from "@/api/customers.api"

const route = useRoute()
const router = useRouter()
const customer = ref({})

onMounted(async () => {
  const res = await getCustomer(route.params.id)
  customer.value = res.data
})

const confirmDelete = async () => {
  await deleteCustomer(route.params.id)
  router.push("/customers")
}
</script>
