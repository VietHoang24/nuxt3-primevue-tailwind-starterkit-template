// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path';
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ['nuxt-primevue', '@nuxtjs/i18n', '@pinia/nuxt'],
    components: [
        {
            path: '~/components',
            pathPrefix: false
        }
    ],
    primevue: {
        options: {
            unstyled: true
        },
        importPT: { from: path.resolve(__dirname, './presets/lara/') } //import and apply preset
    },
    imports: {
        dirs: ["./locales"],
    },
    css: [
        '@/assets/styles/style.css',
        '/node_modules/primeicons/primeicons.css',
        '@/assets/styles/layout/layout.scss'
    ],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {}
        }
    },
    runtimeConfig: {
        public: {
            API_BASE_URL: process.env.NODE_ENV === "development" ? 'http://localhost:3000/' : process.env.API_BASE_URL,
        }
    },
    i18n: {
        vueI18n: './i18n.config.ts'
    },
});
