import api from "./axios"

// جميع العملاء - GET /api/customers/
export const getCustomers = () => {
    return api.get("/customers/")
}

// تفاصيل عميل - GET /api/customers/<id>/
export const getCustomer = (id) => {
    return api.get(`/customers/${id}/`)
}

// إنشاء عميل - POST /api/customers/create/
export const createCustomer = (data) => {
    return api.post("/customers/create/", data)
}

// تعديل عميل - PUT /api/customers/<id>/update/
export const updateCustomer = (id, data) => {
    return api.put(`/customers/${id}/update/`, data)
}

// حذف عميل - DELETE /api/customers/<id>/delete/
export const deleteCustomer = (id) => {
    return api.delete(`/customers/${id}/delete/`)
}
