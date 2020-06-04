<template>
  <v-content>
    <v-container fluid>
      <v-layout row warp>
      <v-flex v-for="data in Categories" :key="data.id">
        <v-col>
        <div align="center">
          <v-btn :data="data.Product" link router :to="`/${data.type}`">{{data.type}}</v-btn>
        </div>
        </v-col>
      </v-flex>
      </v-layout>
      <v-layout row warp>
      <v-flex xs 12 md4 lg3 v-for="data in item" :key="data.id">
      <v-card
          class="d-inline-blok mx-2 my-1"
          max-width="400"
        >
          <v-img
            class="white--text align-end"
            height="200px"
            link
            router to="data.Procuct.imageUrl"
            :src="data.imageUrl"
          >
          </v-img>
          <v-toolbar class="white black--text" style="font-size: inherit;" flat>{{data.name}}</v-toolbar>
          <v-card-text class="white black--text">
            <div>Price : Rp.{{data.price}}</div>
          </v-card-text>
          <v-card-actions class="red">
            <v-card-text>
              <div>Stock : {{data.stock}} </div>
            </v-card-text>
            <v-btn
              color="waring"
              text
              :disabled="disabled"
              @click.prevent="addCart(data.id)"
              v-if="isLogin"
            >
              Add Cart
            </v-btn>
          </v-card-actions>
        </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'Content',
  props: ['item'],
  data () {
    return {
      message: '',
      cardId: null,
      disabled: false
    }
  },
  methods: {
    addCart (id) {
      const payload = {
        ProductId: id,
        token: localStorage.getItem('token')
      }
      this.$store.dispatch('AddCart', payload)
        .then(({ data }) => {
          setTimeout(() => {
            this.message = ''
          }, 2000)
          this.message = 'Success add to cart'
          this.$store.commit('set_addCartList', data.cart)
          this.cardId = id
        })
        .catch(err => {
          setTimeout(() => {
            this.message = ''
          }, 2000)
          this.message = err.response.data
        })
    }
  },
  created () {
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    Categories () {
      return this.$store.state.categories
    }
  }
}
</script>

<style>
.textCard .black--text {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 100px;
  font-size: inherit;
}
</style>
