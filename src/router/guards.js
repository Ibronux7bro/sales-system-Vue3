import { useAuthStore } from "@/stores/auth.store"

export function setupGuards(router) {
  router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    // صفحة للزوار فقط (login)
    if (to.meta.guest && authStore.isAuthenticated) {
      return next("/invoices")
    }

    // تحتاج تسجيل دخول
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      return next("/login")
    }

    // تحقق من الصلاحية - temporarily disabled for testing
    // if (to.meta.model && to.meta.action) {
    //   const permissionStore = usePermissionStore()
    //   const allowed = permissionStore.can(to.meta.model, to.meta.action)
    //   if (!allowed) {
    //     return next(false)
    //   }
    // }

    next()
  })
}
