import en from "./locales/en-US.json";
import ja from "./locales/ja-JP.json";

export default defineI18nConfig(() => ({
  legacy: false,
  langDir: "./locales",
  messages: { "en-US": en, "ja-JP": ja, },
  baseUrl: import.meta.env.API_BASE_URL,
  locales: [
    {
      code: "en",
      iso: "en-US",
      isCatchallLocale: true,
    },
    {
      code: "ja",
      iso: "ja-JP",
    },
  ],
}));
