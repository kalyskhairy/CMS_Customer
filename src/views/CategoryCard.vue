<template>
  <v-container>
        <div class="d-flex" justify="center" align="center">
        <v-btn link router to="/">Home</v-btn>
        </div>
    <v-layout row warp>
      <v-flex xs12 md4 lg3>
          <v-col v-for="item in Category.Products" :key="item.id">
                <v-card
                class="d-inline-blok mx-2 my-1"
                max-width="400"
                >
                <v-img
                    class="white--text align-end"
                    height="200px"
                    :src="item.imageUrl"
                >
                </v-img>
                <v-toolbar class="white black--text" style="font-size: inherit;" flat>{{item.name}}</v-toolbar>
                <v-card-text class="white black--text">
                    <div>Price : Rp.{{item.price}}</div>
                </v-card-text>
                <v-card-actions class="red">
                    <v-card-text>
                    <div>Stock : {{item.stock}} </div>
                    </v-card-text>
                    <v-btn
                    color="waring"
                    text
                    @click.prevent="addCart(item.id)"
                    v-if="isLogin"
                    >
                    Add Cart
                    </v-btn>
                </v-card-actions>
                </v-card>
          </v-col>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'CategoryCard',
  methods: {
    addCart (id) {
      // console.log(id)
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
  computed: {
    Category () {
      let category = []
      for (let i = 0; i < this.$store.state.categories.length; i++) {
        if (this.$store.state.categories[i].type === this.$route.params.type) {
          category = this.$store.state.categories[i]
        }
      }
      return category
    },
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  created () {
  }
}
</script>

<style>

</style>
