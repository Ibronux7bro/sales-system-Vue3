import { defineStore } from "pinia"
import { loginApi, getMeApi } from "@/api/auth"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
  }),

  actions: {
    async login(credentials) {
      //  تسجيل الدخول (JWT)
      const res = await loginApi(credentials)

      // SimpleJWT
      this.token = res.data.access
      localStorage.setItem("token", this.token)

      //  جلب بيانات المستخدم + الصلاحيات
      const me = await getMeApi()
      this.user = me.data

      this.isAuthenticated = true
      localStorage.setItem("user", JSON.stringify(this.user))
    },

    loadFromStorage() {
      const token = localStorage.getItem("token")
      const user = localStorage.getItem("user")

      if (token && user) {
        this.token = token
        this.user = JSON.parse(user)
        this.isAuthenticated = true
      }
    },

    logout() {
      this.token = null
      this.user = null
      this.isAuthenticated = false
      localStorage.clear()
    },
  },
})
