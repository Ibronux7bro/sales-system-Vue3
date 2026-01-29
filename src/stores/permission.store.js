import { defineStore } from "pinia"
import { useAuthStore } from "./auth.store"

export const usePermissionStore = defineStore("permission", {
  getters: {
    permissions() {
      const authStore = useAuthStore()
      return authStore.user?.permissions || {}
    },

    can: (state) => {
      return (model, action) => {
        const authStore = useAuthStore()
        const permissions = authStore.user?.permissions

        if (!permissions) return false
        if (!permissions[model]) return false

        return permissions[model][action] === true
      }
    }
  }
})
