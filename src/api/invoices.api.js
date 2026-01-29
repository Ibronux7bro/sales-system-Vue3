import api from "./axios"

// جميع الفواتير - GET /api/invoices/
export const getInvoices = () => {
    return api.get("/invoices/")
}

// تفاصيل فاتورة - GET /api/invoices/detail/<id>/
export const getInvoiceDetail = (id) => {
    return api.get(`/invoices/detail/${id}/`)
}

// إنشاء فاتورة - POST /api/invoices/create/
export const createInvoice = (data) => {
    return api.post("/invoices/create/", data)
}

// تعديل فاتورة - PUT /api/invoices/<id>/
export const updateInvoice = (id, data) => {
    return api.put(`/invoices/${id}/`, data)
}

// حذف فاتورة - DELETE /api/invoices/delete/<id>/
export const deleteInvoice = (id) => {
    return api.delete(`/invoices/delete/${id}/`)
}
