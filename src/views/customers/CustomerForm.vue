<template>
  <div class="container mt-4">
    <h2 class="text-center mb-4">
      {{ isEdit ? "Update Customer" : "Create Customer" }}
    </h2>

    <div class="card shadow-sm">
      <div class="card-body p-4">
        <form @submit.prevent="save">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="fw-bold">Name</label>
              <input v-model="form.name" class="form-control" required />
            </div>

            <div class="col-md-6 mb-3">
              <label class="fw-bold">Email</label>
              <input v-model="form.email" type="email" class="form-control" />
            </div>

            <div class="col-md-6 mb-3">
              <label class="fw-bold">Phone</label>
              <input v-model="form.phone" class="form-control" />
            </div>

            <div class="col-md-6 mb-3">
              <label class="fw-bold">Address</label>
              <input v-model="form.address" class="form-control" />
            </div>
          </div>

          <button class="btn btn-success px-4 fw-bold">Save</button>
          <RouterLink to="/customers" class="btn btn-secondary px-4 fw-bold ms-2">
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
import { createCustomer, getCustomer, updateCustomer } from "@/api/customers.api"

const route = useRoute()
const router = useRouter()

const isEdit = route.params.id
const form = ref({
  name: "",
  email: "",
  phone: "",
  address: "",
})

onMounted(async () => {
  if (isEdit) {
    const res = await getCustomer(isEdit)
    form.value = res.data
  }
})

const save = async () => {
  if (isEdit) {
    await updateCustomer(isEdit, form.value)
  } else {
    await createCustomer(form.value)
  }
  router.push("/customers")
}
</script>
