<template>
  <div class="row justify-content-center mt-5">
    <div class="col-md-6">
      <div class="card border-danger">
        <div class="card-header bg-danger text-white text-center">
          Delete Invoice #{{ id }}
        </div>

        <div class="card-body text-center">
          <p>Are you sure you want to delete this invoice?</p>

          <button @click="confirm" class="btn btn-danger me-2">
            Confirm Delete
          </button>

          <RouterLink to="/invoices" class="btn btn-secondary">
            Cancel
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router"
import { deleteInvoice } from "@/api/invoices.api"

const route = useRoute()
const router = useRouter()
const id = route.params.id

const confirm = async () => {
  await deleteInvoice(id)
  router.push("/invoices")
}
</script>
