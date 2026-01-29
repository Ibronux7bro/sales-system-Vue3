import api from "./axios"

// جميع المستخدمين
export const getUsers = () => api.get("/users/")

// مستخدم واحد
export const getUser = (id) => api.get(`/users/${id}/`)

// إنشاء مستخدم
export const createUser = (data) => api.post("/users/", data)

// تعديل مستخدم
export const updateUser = (id, data) => api.put(`/users/${id}/`, data)

// حذف مستخدم
export const deleteUser = (id) => api.delete(`/users/${id}/`)
