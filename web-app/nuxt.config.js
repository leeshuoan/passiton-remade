export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'web-app',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/firebase.js',
    '~/plugins/directives.js',
    { src: '~/plugins/vue-toast-notification.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/fontawesome',
  ],

  fontawesome: {
    icons: {
      solid: true,
      brands: true
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    [
    '@nuxtjs/recaptcha',
      {
        siteKey: process.env.SITE_KEY,
        size: 'normal',
        hideBadge: false,
        version: 2
      }
    ],
  ],
  

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
  },

  proxy: {
    "/captcha-api/": {
      target: "https://www.google.com/recaptcha/api",
      pathRewrite: {
        "^/captcha-api": ""
      }
    },

    "/directions-api/":{
      target: "https://maps.googleapis.com/maps/api",
      pathRewrite: {
        "/directions-api/": ""
      },
    },

    "/geolocation-api/":{
      target: "https://www.googleapis.com/geolocation/v1",
      pathRewrite: {
        "/geolocation-api/": ""
      },
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  
  generate: {
    fallback: true
  },
}
