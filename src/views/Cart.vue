<template>
  <div>
    <v-container>
      <v-flex>
        <div justify="center" align="center">
          <p>My Whislist</p>
          <p> {{message}} </p>
        </div>
      </v-flex>
    <v-layout row warp>
      <v-flex xs 12 md4 lg3 v-for="data in Carts" :key="data.id">
        <Card :data="data" />
      </v-flex>
    </v-layout>
    </v-container>
  </div>
</template>
<script>
import Card from '@/components/Card.vue'

export default {
  name: 'addCart',
  components: {
    Card
  },
  computed: {
    Carts () {
      return this.$store.state.cartList
    },
    message () {
      return this.$store.state.messageSuccess
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      this.$store.commit('set_isLogin', true)
      const payload = {
        token: localStorage.getItem('token')
      }
      this.$store.dispatch('fetchCart', payload)
    } else {
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style>

</style>
