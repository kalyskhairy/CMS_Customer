<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Registration</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="email"
                    name="email"
                    prepend-icon="mdi-account"
                    type="email"
                    v-model="email"
                    clearable
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    v-model="password"
                    :type="show ? 'text' : 'password'"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show = !show"
                  ></v-text-field>
                <v-text-field
                    id="password"
                    label="Confirm Password"
                    name="password"
                    type="password"
                    prepend-icon="mdi-ticket-confirmation-outline"
                    v-model="confirmPassword"
                  ></v-text-field>

                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="Registration">Registration</v-btn>
              </v-card-actions>
              <v-card-text justify="center" class="red--text">{{message}}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import axios from 'axios'
const baseUrl = 'http://localhost:3000'

export default {
  name: 'Register',
  data () {
    return {
      show: false,
      email: '',
      password: '',
      confirmPassword: '',
      message: ''
    }
  },
  methods: {
    Registration () {
      if (this.password !== this.confirmPassword) {
        setTimeout(() => {
          this.message = ''
        }, 2000)
        this.message = 'Password not Match'
        this.confirmPassword = ''
      } else {
        axios.post(`${baseUrl}/users/register`, {
          email: this.email,
          password: this.password
        })
          .then(({ data }) => {
            this.email = ''
            this.password = ''
            this.confirmPassword = ''
            this.$router.push({ name: 'Login' })
          })
          .catch(err => {
            // console.log(err.response.data)
            setTimeout(() => {
              this.message = ''
            }, 2000)
            this.message = err.response.data.message
          })
      }
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style>

</style>
