import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const baseUrl = 'http://localhost:3000/'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Products: [],
    isLogin: false,
    cartList: [],
    categories: [],
    messageSuccess: ''
  },
  mutations: {
    set_Products (state, payload) {
      state.Products = payload
    },
    set_isLogin (state, payload) {
      state.isLogin = payload
    },
    set_addCartList (state, payload) {
      state.cartList.push(payload)
    },
    set_Cart (state, payload) {
      state.cartList = payload
    },
    set_deleteCart (state, payload) {
      const index = state.cartList.indexOf(payload)
      if (index !== -1) state.cartList.splice(index, 1)
    },
    set_category (state, payload) {
      state.categories = payload
    },
    set_messageSuccess (state, payload) {
      state.messageSuccess = payload
    }
  },
  actions: {
    fetchProduct (context, payload) {
      axios({
        method: 'get',
        url: baseUrl + 'products'
      }).then(({ data }) => {
        // console.log(data.products, 'ini data fetchProduct')
        context.commit('set_Products', data.products)
      }).catch(err => {
        console.log(err)
      })
    },
    fetchCategory (context, payload) {
      axios({
        method: 'get',
        url: baseUrl + 'categories'
      }).then(({ data }) => {
        // console.log(data.Categories, 'ini data fetchCategory')
        context.commit('set_category', data.Categories)
      }).catch(err => {
        console.log(err)
      })
    },
    AddCart (context, payload) {
      return axios({
        method: 'post',
        url: baseUrl + 'transaction',
        data: {
          ProductId: payload.ProductId
        },
        headers: {
          token: payload.token
        }
      })
    },
    fetchCart (context, payload) {
      axios({
        method: 'get',
        url: baseUrl + 'transaction',
        headers: {
          token: payload.token
        }
      })
        .then(({ data }) => {
          // console.log(data, 'ini fetchCart')
          context.commit('set_Cart', data.cart)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    fetchHistory (context, payload) {
      axios({
        method: 'get',
        url: baseUrl + 'transaction/history',
        headers: {
          token: payload.token
        }
      })
        .then(({ data }) => {
          // console.log(data, 'ini fetchHistory')
          context.commit('set_Cart', data.cart)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    deleteCart (context, payload) {
      return axios({
        method: 'delete',
        url: baseUrl + 'transaction/' + payload.id,
        headers: {
          token: payload.token
        }
      })
    },
    updateCart (context, payload) {
      return axios({
        method: 'put',
        url: baseUrl + 'transaction/' + payload.id,
        headers: {
          token: payload.token
        },
        data: {
          status: payload.status
        }
      })
    }
  },
  modules: {
  }
})
