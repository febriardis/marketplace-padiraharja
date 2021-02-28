export default {
  babel: {
    babelrc: true,
  },
  server: {
    port: 8000, // default: 3000
    host: '0.0.0.0', // default: localhost
  },
  // mode: 'spa',
  ssr: false,
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Fast Pants – Pride n Joy Fast Pants',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'og:image',
        property: 'og:image',
        content: '/favicon.ico',
      },
      {
        hid: 'og:title',
        name: 'og:title',
        content: 'Fast Pants – Pride n Joy Fast Pants',
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: 'Padiraharja',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['element-ui/lib/theme-chalk/index.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~plugins/vue-carousel', ssr: false },
    { src: '~plugins/element-ui', ssr: false },
    { src: '~plugins/custom-ui', ssr: false },
    { src: '~plugins/axios', ssr: false },
    { src: '~plugins/local-storage', ssr: false },
    { src: '~plugins/three', ssr: false },
    { src: '~plugins/filters', ssr: false },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/composition-api',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [/^element-ui/],
  },

  genereta: {
    interval: 2000,
  },
}
