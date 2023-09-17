// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  runtimeConfig: {
    public: {
      baseUrl: 'https://api.themoviedb.org/3',
      imageBaseUrl: 'https://image.tmdb.org/t/p/w500',
      bearerToken: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNzBjOTdhMjMyMDM0NTVhN2RiODNhZThlOTE4ODQwOSIsInN1YiI6IjY1MDQ2MWU0ZDdkY2QyMDBhY2IyNWQyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p1TDMBLTSuCT_0WOqZtgLmx-Lu7lk7WMnJkDiHxG1r0'
    }
  },
  appConfig: {
  }
})
