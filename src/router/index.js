import { createRouter, createWebHistory } from "vue-router"

// ====================
// Auth
// ====================
import Login from "@/views/auth/Login.vue"

// ====================
// Invoices
// ====================
import InvoicesList from "@/views/invoices/InvoicesList.vue"
import InvoiceDetail from "@/views/invoices/InvoiceDetail.vue"
import InvoiceForm from "@/views/invoices/InvoiceForm.vue"
import InvoiceDelete from "@/views/invoices/InvoiceDelete.vue"

// ====================
// Products
// ====================
import ProductsList from "@/views/products/ProductsList.vue"
import ProductForm from "@/views/products/ProductForm.vue"
import ProductDelete from "@/views/products/ProductDelete.vue"

// ====================
// Users
// ====================
import UsersList from "@/views/users/UsersList.vue"

const routes = [
  // -------- Auth --------
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { guest: true },
  },

  // -------- Home --------
  {
    path: "/",
    redirect: "/invoices",
  },

  // -------- Invoices --------
  {
    path: "/invoices",
    name: "Invoices",
    component: InvoicesList,
    meta: {
      requiresAuth: true,
      model: "Invoices",
      action: "read",
    },
  },
  {
    path: "/invoices/create",
    name: "InvoiceCreate",
    component: InvoiceForm,
    meta: {
      requiresAuth: true,
      model: "Invoices",
      action: "create",
    },
  },
  {
    path: "/invoices/edit/:id",
    name: "InvoiceEdit",
    component: InvoiceForm,
    meta: {
      requiresAuth: true,
      model: "Invoices",
      action: "update",
    },
  },
  {
    path: "/invoices/delete/:id",
    name: "InvoiceDelete",
    component: InvoiceDelete,
    meta: {
      requiresAuth: true,
      model: "Invoices",
      action: "delete",
    },
  },
  {
    path: "/invoices/:id",
    name: "InvoiceDetail",
    component: InvoiceDetail,
    meta: {
      requiresAuth: true,
      model: "Invoices",
      action: "read",
    },
  },

  // -------- Products --------
  {
    path: "/products",
    name: "Products",
    component: ProductsList,
    meta: {
      requiresAuth: true,
      model: "Products",
      action: "read",
    },
  },
  {
    path: "/products/create",
    name: "ProductCreate",
    component: ProductForm,
    meta: {
      requiresAuth: true,
      model: "Products",
      action: "create",
    },
  },
  {
    path: "/products/edit/:id",
    name: "ProductEdit",
    component: ProductForm,
    meta: {
      requiresAuth: true,
      model: "Products",
      action: "update",
    },
  },
  {
    path: "/products/delete/:id",
    name: "ProductDelete",
    component: ProductDelete,
    meta: {
      requiresAuth: true,
      model: "Products",
      action: "delete",
    },
  },

  // -------- Customers --------
  {
    path: "/customers",
    name: "Customers",
    component: () => import("@/views/customers/CustomersList.vue"),
    meta: {
      requiresAuth: true,
      model: "Customers",
      action: "read",
    },
  },
  {
    path: "/customers/create",
    name: "CustomerCreate",
    component: () => import("@/views/customers/CustomerForm.vue"),
    meta: {
      requiresAuth: true,
      model: "Customers",
      action: "create",
    },
  },
  {
    path: "/customers/edit/:id",
    name: "CustomerEdit",
    component: () => import("@/views/customers/CustomerForm.vue"),
    meta: {
      requiresAuth: true,
      model: "Customers",
      action: "update",
    },
  },
  {
    path: "/customers/delete/:id",
    name: "CustomerDelete",
    component: () => import("@/views/customers/CustomerDelete.vue"),
    meta: {
      requiresAuth: true,
      model: "Customers",
      action: "delete",
    },
  },

  // -------- Users --------
  {
    path: "/users",
    name: "Users",
    component: UsersList,
    meta: {
      requiresAuth: true,
      model: "Users",
      action: "read",
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
