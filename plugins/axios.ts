import { useAxiosInstance } from "~/api";

export default defineNuxtPlugin(() => {
    const axiosInstance = useAxiosInstance()
   
    return {
        provide: {
            axios: axiosInstance
        }
    };
});
