import { useUserStore } from "~/stores/user"

export default defineNuxtPlugin(() => {
    return {
        provide: { 
            userStore: useUserStore(),
        },
    }
})