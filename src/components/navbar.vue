<template>
  <nav>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      temporary
      v-if="isLogin"
    >
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.text"
          link
          router :to="item.router"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-subheader class="mt-4 grey--text text--darken-1">My Account</v-subheader>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
                <v-img src="https://cdn0.iconfinder.com/data/icons/man-user-human-profile-avatar-business-person/100/09B-1User-512.png"></v-img>
            </v-list-item-avatar>
            <v-list-item-title>{{username}}</v-list-item-title>
          </v-list-item>
        </v-list>
        <v-list-item
          class="mt-4"
          link
        >
          <v-list-item-action>
            <v-icon color="grey darken-1">mdi-logout-variant</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1" @click="Logout">Log out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
      color="red"
      dense
    >
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="isLogin"></v-app-bar-nav-icon>
      <v-icon
        class="mx-4"
        large
      >
        mdi-foot-print
      </v-icon>
      <v-toolbar-title class="mr-12 align-center">
        <span class="title">Sneakerin</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
            <v-row
        align="center"
        style="max-width: 650px"
      >
        <v-text-field
          :append-icon-cb="() => {}"
          placeholder="Search..."
          single-line
          append-icon="mdi-magnify"
          color="white"
          hide-details
        ></v-text-field>
      </v-row>
      <v-spacer></v-spacer>
      <router-link to="/Login" v-if="!isLogin">
        <v-btn>
      Login
        </v-btn>
      </router-link>
    </v-app-bar>
  </nav>
</template>
<script>
export default {
  name: 'navbar',
  props: {
    source: String
  },
  data: () => ({
    drawer: false,
    items: [
      { icon: 'mdi-view-dashboard-variant-outline', text: 'Home', router: '/' },
      { icon: 'mdi-cart', text: 'Cart List', router: '/Cart' },
      { icon: 'mdi-history', text: 'History', router: '/History' }
    ]
  }),
  methods: {
    Logout () {
      localStorage.clear()
      this.$store.commit('set_isLogin', false)
    }
  },
  created () {
  },
  computed: {
    username () {
      return localStorage.getItem('username')
    },
    isLogin () {
      return this.$store.state.isLogin
    }
  }

}
</script>

<style>

</style>
