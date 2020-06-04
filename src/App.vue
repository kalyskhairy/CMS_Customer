<template>
  <v-app>
    <Navbar />
    <v-content>
    <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/navbar.vue'

export default {
  name: 'App',

  components: {
    Navbar
  },

  data: () => ({
    //
  }),
  created () {
    this.$vuetify.theme.dark = true
    if (localStorage.getItem('token')) {
      this.$store.commit('set_isLogin', true)
      this.$store.dispatch('fetchCategory')
    }
  }
}
</script>
