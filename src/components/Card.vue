<template>
<div>
  <v-card
    class="mx-1 my-1"
    max-width="400"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      :src="data.Product.imageUrl"
    >
      <v-card-title class="black--text">{{data.Product.name}}</v-card-title>
    </v-img>
    <v-card-text class="text--primary">
      <div>Price : Rp.{{data.Product.price}}</div>
      <div>Status : {{data.status}} </div>
      <div>Stock : {{data.Product.stock}}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="error"
        text
        @click.prevent="DeleteCart(data)"
      >
        Delete
      </v-btn>
    <v-btn
        color="primary"
        text
        @click.prevent="buyCart(data)"
    >
        Buy
      </v-btn>
    </v-card-actions>
  </v-card>
</div>
</template>
<script>

export default {
  name: 'Card',
  props: ['data'],
  data () {
    return {
      message: ''
    }
  },
  methods: {
    DeleteCart (Cart) {
      const payload = {
        token: localStorage.getItem('token'),
        id: Cart.id
      }
      this.$store.dispatch('deleteCart', payload)
        .then(({ data }) => {
        //   console.log(data, 'delete Cart')
          this.message = data.message
          this.$store.commit('set_deleteCart', Cart)
          setTimeout(() => {
            this.message = ''
          }, 1500)
        })
        .catch(err => {
        //   console.log(err.response)
          setTimeout(() => {
            this.message = ''
          }, 2000)
          this.message = err.response.data.message
        })
    },
    buyCart (Cart) {
      console.log(Cart.id)
      const payload = {
        token: localStorage.getItem('token'),
        id: Cart.id,
        status: 'Berhasil'
      }
      this.$store.dispatch('updateCart', payload)
        .then(({ data }) => {
          console.log(data.Cart)
          setTimeout(() => {
            this.$store.commit('set_messageSuccess', '')
          }, 2000)
          this.$store.commit('set_messageSuccess', 'Success payment')
          this.$store.commit('set_deleteCart', Cart)
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  }
}
</script>

<style>

</style>
