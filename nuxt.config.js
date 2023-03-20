import colors from 'vuetify/es5/util/colors'

const selectBaseURL = () => {
  if (process.env.NODE_ENV === 'production')
    return process.env.BASE_URL
  else
    return process.env.BASE_URL || 'https://c038578a-7c6a-4024-8465-18d0b365e8c1.mock.pstmn.io'
}

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  target: 'static',
  head: {
    titleTemplate: '%s - lnp2pbot-market',
    title: 'lnp2pbot-market',
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
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/i18n'
  ],
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.js',
        name: 'English',
        icon: '🇺🇸 EN'
      },
      {
        code: 'es',
        file: 'es.js',
        name: 'Español',
        icon: '🇪🇸 ES'
      },
      {
        code: 'pt',
        file: 'pt.js',
        name: 'Português',
        icon: '🇧🇷 PT'
      }
    ],
    defaultLocale: 'es',
    lazy: true,
    langDir: 'lang/'
  },
  axios: {
    baseURL: selectBaseURL()
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
