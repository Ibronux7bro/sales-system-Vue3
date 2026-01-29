import api from "./axios"

// جميع المنتجات - GET /api/products/
export const getProducts = () => {
    return api.get("/products/")
}

// تفاصيل منتج - GET /api/products/<id>/
export const getProduct = (id) => {
    return api.get(`/products/${id}/`)
}

// إنشاء منتج - POST /api/products/create/
export const createProduct = (data) => {
    return api.post("/products/create/", data)
}

// تعديل منتج - PUT /api/products/<id>/update/
export const updateProduct = (id, data) => {
    return api.put(`/products/${id}/update/`, data)
}

// حذف منتج - DELETE /api/products/<id>/delete/
export const deleteProduct = (id) => {
    return api.delete(`/products/${id}/delete/`)
}
