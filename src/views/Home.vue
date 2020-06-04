<template>
<v-container>
    <v-content app>
      <Content :item="Products" />
    </v-content>
</v-container>
</template>

<script>
import Content from '@/components/Content.vue'

export default {
  name: 'Home',
  components: {
    Content
  },
  computed: {
    Products () {
      return this.$store.state.Products
    }
  },
  created () {
    this.$vuetify.theme.dark = true
    this.$store.dispatch('fetchProduct')
    this.$store.dispatch('fetchCategory')
  }
}
</script>
