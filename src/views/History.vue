<template>
<v-container>
   <v-simple-table fixed-header height="600px">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Image</th>
          <th class="text-left">Name</th>
          <th class="text-left">Status</th>
          <th class="text-left">Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in Cart" :key="item.name">
          <img :src="item.Product.imageUrl" height="50">
          <td>{{ item.Product.name }}</td>
          <td>{{ item.status }}</td>
          <td> Rp.{{ item.Product.price }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</v-container>
</template>

<script>
export default {
  name: 'History',
  data () {
    return {
    }
  },
  computed: {
    Cart () {
      return this.$store.state.cartList
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      const payload = {
        token: localStorage.getItem('token')
      }
      this.$store.dispatch('fetchHistory', payload)
    } else {
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style>

</style>
