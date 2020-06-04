import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const baseUrl = 'https://lit-badlands-37387.herokuapp.com/'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Products: [],
    isLogin: false,
    cartList: [],
    categories: [],
    messageSuccess: '',
    messageError: ''
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
    },
    set_messageError (state, payload) {
      state.messageError = payload
    }
  },
  actions: {
    fetchProduct (context, payload) {
      axios({
        method: 'get',
        url: baseUrl + 'products'
      }).then(({ data }) => {
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
          context.commit('set_Cart', data.cart)
        })
        .catch(err => {
          context.commit('set_messageError', err.response.data.message)
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
          context.commit('set_Cart', data.cart)
        })
        .catch(err => {
          context.commit('set_messageError', err.response.data.message)
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
