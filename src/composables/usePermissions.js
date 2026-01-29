import { usePermissionStore } from "@/stores/permission.store"

export function usePermissions() {
  const permissionStore = usePermissionStore()

  const can = (model, action) => {
    return permissionStore.can(model, action)
  }

  return { can }
}
