<template>
  <div class="container mt-4">
    <h2 class="text-center mb-4">
      {{ isEdit ? "Update Invoice" : "Create Invoice" }}
    </h2>

    <!-- MASTER SECTION -->
    <div class="card mb-4" style="border: 1px solid #000">
      <div class="card-header bg-white border-bottom-0 pt-3 ps-3">
        <h5 class="card-title fw-bold" style="text-decoration: underline">
          Invoice Master
        </h5>
      </div>
      <div class="card-body">
        <div class="row mb-3">
          <div class="col-md-6 d-flex align-items-center">
            <label class="form-label fw-bold me-2 mb-0" style="width: 100px">ID</label>
            <input
              type="text"
              class="form-control"
              :value="isEdit ? route.params.id : 'Auto'"
              disabled
              style="background-color: #e9ecef"
            />
          </div>
          <div class="col-md-6 d-flex align-items-center">
            <label class="form-label fw-bold me-2 mb-0" style="width: 100px">Date</label>
            <input
              type="date"
              class="form-control"
              v-model="invoice.invoice_date"
            />
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-6 d-flex align-items-center">
            <label class="form-label fw-bold me-2 mb-0" style="width: 100px">Customer</label>
            <select v-model="invoice.customer" class="form-select">
              <option disabled value="">Select customer</option>
              <option v-for="c in customers" :key="c.id" :value="c.id">
                {{ c.name }}
              </option>
            </select>
          </div>
          <div class="col-md-6 d-flex align-items-center">
            <label class="form-label fw-bold me-2 mb-0" style="width: 100px">Total</label>
            <input
              type="text"
              class="form-control"
              :value="grandTotal.toFixed(2)"
              readonly
            />
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 d-flex align-items-center">
            <label class="form-label fw-bold me-2 mb-0" style="width: 100px">Status</label>
            <select v-model="invoice.status" class="form-select">
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="refused">Refused</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- DETAILS SECTION -->
    <div class="card mb-4" style="border: 1px solid #000">
      <div class="card-header bg-white border-bottom-0 pt-3 ps-3">
        <h5 class="card-title fw-bold" style="text-decoration: underline">
          Invoice Details
        </h5>
      </div>
      <div class="card-body p-0">
        <table class="table table-bordered text-center mb-0">
          <thead class="table-light">
            <tr>
              <th style="width: 5%">
                <button
                  type="button"
                  class="btn btn-outline-dark btn-sm fw-bold"
                  @click="addRow"
                >
                  +
                </button>
              </th>
              <th style="width: 35%">Product</th>
              <th style="width: 15%">Quantity</th>
              <th style="width: 15%">Price</th>
              <th style="width: 20%">Total Price</th>
              <th style="width: 10%">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td class="align-middle fw-bold">{{ index + 1 }}</td>
              <td>
                <select
                  v-model="item.product_id"
                  class="form-select"
                  @change="updatePrice(item)"
                >
                  <option disabled value="">Select product</option>
                  <option v-for="p in products" :key="p.id" :value="p.id">
                    {{ p.name }}
                  </option>
                </select>
              </td>
              <td>
                <input
                  type="number"
                  class="form-control text-center"
                  v-model.number="item.quantity"
                  min="1"
                  @input="calculate"
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control text-center"
                  :value="item.price.toFixed(2)"
                  readonly
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control text-center"
                  :value="(item.price * item.quantity).toFixed(2)"
                  readonly
                />
              </td>
              <td>
                <button
                  type="button"
                  class="btn btn-danger btn-sm"
                  @click="removeRow(index)"
                >
                  Delete
                </button>
              </td>
            </tr>

            <tr v-if="items.length === 0">
              <td colspan="6" class="py-4 text-muted">
                No products added. Click + to add products.
              </td>
            </tr>
          </tbody>

          <tfoot>
            <tr>
              <td colspan="4" class="text-end fw-bold pe-3">Totals</td>
              <td>
                <input
                  type="text"
                  class="form-control text-center fw-bold"
                  :value="grandTotal.toFixed(2)"
                  readonly
                />
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>

    <!-- BUTTONS -->
    <div class="d-flex justify-content-start gap-3 mt-4 mb-5 ps-3">
      <button
        type="button"
        class="btn btn-light border border-dark px-4 fw-bold"
        @click="save"
        :disabled="saving"
      >
        {{ saving ? "Saving..." : "Save" }}
      </button>
      <RouterLink
        to="/invoices"
        class="btn btn-light border border-dark px-4 fw-bold"
      >
        Cancel
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { getCustomers } from "@/api/customers.api"
import { getProducts } from "@/api/products.api"
import { getInvoiceDetail, createInvoice, updateInvoice } from "@/api/invoices.api"

const route = useRoute()
const router = useRouter()

const isEdit = computed(() => !!route.params.id)

const customers = ref([])
const products = ref([])
const saving = ref(false)

const invoice = ref({
  customer: "",
  status: "pending",
  invoice_date: new Date().toISOString().split("T")[0],
})

const items = ref([])

// Grand total computed
const grandTotal = computed(() => {
  return items.value.reduce((sum, item) => {
    return sum + item.price * item.quantity
  }, 0)
})

// Load customers and products
onMounted(async () => {
  try {
    const [customersRes, productsRes] = await Promise.all([
      getCustomers(),
      getProducts(),
    ])
    customers.value = customersRes.data
    products.value = productsRes.data

    // If edit mode, load invoice data
    if (isEdit.value) {
      const res = await getInvoiceDetail(route.params.id)
      const data = res.data
      
      invoice.value = {
        customer: data.customer_id || data.customer,
        status: data.status,
        invoice_date: data.invoice_date,
      }

      // Load items
      if (data.items) {
        items.value = data.items.map((item) => ({
          product_id: item.product_id || item.product,
          quantity: item.quantity,
          price: parseFloat(item.unit_price || item.price || 0),
        }))
      }
    }
  } catch (error) {
    console.error("Error loading data:", error)
  }
})

// Add new row
const addRow = () => {
  items.value.push({
    product_id: "",
    quantity: 1,
    price: 0,
  })
}

// Remove row
const removeRow = (index) => {
  items.value.splice(index, 1)
}

// Update price when product changes
const updatePrice = (item) => {
  const product = products.value.find((p) => p.id === item.product_id)
  item.price = product ? parseFloat(product.price) : 0
}

// Recalculate (triggers reactivity)
const calculate = () => {
  // Vue's reactivity handles this automatically through grandTotal computed
}

// Save invoice
const save = async () => {
  if (!invoice.value.customer) {
    alert("Please select a customer")
    return
  }

  if (items.value.length === 0) {
    alert("Please add at least one product")
    return
  }

  saving.value = true

  try {
    const payload = {
      customer: invoice.value.customer,
      status: invoice.value.status,
      invoice_date: invoice.value.invoice_date,
      total_amount: grandTotal.value,
      items: items.value.map((item) => ({
        product: item.product_id,
        quantity: item.quantity,
        unit_price: item.price,
        amount: item.price * item.quantity,
      })),
    }

    if (isEdit.value) {
      await updateInvoice(route.params.id, payload)
    } else {
      await createInvoice(payload)
    }

    router.push("/invoices")
  } catch (error) {
    console.error("Error saving invoice:", error)
    alert("Error saving invoice")
  } finally {
    saving.value = false
  }
}
</script>
