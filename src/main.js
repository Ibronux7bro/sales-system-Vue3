import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "./App.vue"
import router from "./router"
import { setupGuards } from "@/router/guards"
import { useAuthStore } from "@/stores/auth.store"

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// تحميل المستخدم
const authStore = useAuthStore()
authStore.loadFromStorage()

// تفعيل الحماية
setupGuards(router)

app.mount("#app")
