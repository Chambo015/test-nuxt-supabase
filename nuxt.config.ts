/* eslint-disable node/prefer-global/process */
// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: false },

  app: {
    head: {
      link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
      meta: [{ name: "robots", content: process.env.NUXT_SITE_ENV === "production" ? "index, follow" : "noindex, nofollow" }],
      script: [
        ...(process.env.NODE_ENV === "production" && process.env.NUXT_SITE_ENV === "production"
          ? [
            // Yandex Metrika
              {
                type: "text/javascript",
                innerHTML: `
                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                  (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
                  ym(97577652, "init", {
                      clickmap:true,
                      trackLinks:true,
                      accurateTrackBounce:true,
                      webvisor:true
                });`,
              },
              // Google Tag Manager
              {
                innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-W5XB8DZG')`,
              },
            ]
          : []),
      ],
      noscript: [
        ...(process.env.NODE_ENV === "production" && process.env.NUXT_SITE_ENV === "production"
          ? [
              // Yandex Metrika
              {
                innerHTML: "<div><img src='https://mc.yandex.ru/watch/97577652' style='position:absolute; left:-9999px;' /></div>",
              },
              // Google Tag Manager
              {
                innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W5XB8DZG"
                      height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
              },
            ]
          : []),
      ],
      htmlAttrs: {
        prefix: "og: http://ogp.me/ns#",
      },
    },
  },

  css: ["@/app/styles/main.scss"],

  modules: [
    "@nuxt/eslint",
    "@nuxtjs/i18n",
    "@nuxtjs/tailwindcss", // "@nuxtjs/color-mode" https://tailwindcss.nuxtjs.org/examples/dark-mode
    "nuxt-primevue",
    "vue3-carousel-nuxt",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/device",
    "@nuxtjs/google-fonts",
    "@nuxt/image",
    "nuxt-svgo",
    // "nuxt-capo",
  ],

  srcDir: "src/",
  serverDir: "./server",

  runtimeConfig: {
    secret: "123",
    public: {
      BaseAPIUrl: process.env.NUXT_BASE_URL,
      BaseSiteUrl: process.env.NUXT_SITE_URL,
      SiteMode: process.env.NUXT_SITE_ENV, // "development" / "production"
      GoogleId: process.env.NUXT_GOOGLE_CLIENT_ID,
      TipTopPublicId: process.env.NUXT_TIPTOP_PUBLIC_ID,
    },
  },

  build: {
    transpile: ["pinia-plugin-persistedstate"],
  },

  routeRules: {
    "/": { prerender: true },
    "/course/**": { ssr: false },
    "/cabinet-infosecurity": { redirect: "/cabinet-infosecurity/progress", ssr: false },
    "/courses/1": { redirect: "/awareness" },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/sitemap.xml", "/robots.txt"],
    },
  },

  experimental: {
    watcher: "chokidar",
  },

  googleFonts: {
    families: {
      Inter: {
        wght: [400, 700, 600, 800, 300, 900, 500],
        ital: [400, 700, 300, 500],
      },
    },
    preload: true,
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  i18n: {
    vueI18n: "./i18n.config.ts",
    compilation: {
      strictMessage: false,
      escapeHtml: false,
      jit: true,
    },
    locales: [
      { code: "ru", language: "ru-RU" },
      { code: "kz", language: "kk-KZ" },
      { code: "en", language: "en-US" },
    ],
    defaultLocale: "ru",
  },

  primevue: {
    options: {
      unstyled: true,
      ptOptions: {
        mergeProps: true,
        mergeSections: true,
      },
    },
    importPT: { as: "Lara", from: "@/../presets/lara/" },
  },

  pinia: {
    storesDirs: ["./src/shared/store/**"],
  },

  tailwindcss: {
    cssPath: false,
    viewer: false,
    configPath: "./tailwind.config.js",
  },

  carousel: {
    prefix: "Vue",
  },

  svgo: {
    autoImportPath: false,
  },
});
