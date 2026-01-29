<template>
  <slot v-if="allowed" />
</template>

<script setup>
import { computed } from "vue"
import { useAuthStore } from "@/stores/auth.store"

const props = defineProps({
  model: String,
  action: String,
})

const auth = useAuthStore()

const allowed = computed(() => {
  if (!auth.user) return false
  return auth.user.permissions?.[props.model]?.[props.action] === true
})
</script>
