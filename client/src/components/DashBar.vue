<template>
  <v-app-bar app flat>
    <!-- SideBar Control Show Hide -->
    <v-app-bar-nav-icon @click="drawer"></v-app-bar-nav-icon>
    <!-- <v-toolbar-title>unShop</v-toolbar-title> -->
    <v-spacer></v-spacer>

    <!-- Center Title -->
    <h2>unShop Admin Dashboard</h2>

    <v-spacer></v-spacer>
    <ChangeTheme />
    <v-btn bottom @click="signOut">Sign Out</v-btn>
  </v-app-bar>
</template>

<script>
import ChangeTheme from '@/components/ChangeTheme.vue'

export default {
  name: 'DasboardBar',
  components: {
    ChangeTheme
  },
  data () {
    return {
      menus: [
        { title: 'Sign Out', action: 'signOut()' },
        { title: 'About Page', action: 'viewAbout()' }
      ]
    }
  },
  methods: {
    drawer () {
      this.$emit('drawer')
    },
    signOut () {
      this.$store.commit('SIGN_OUT')
      this.$router.push('/')
    }
  }
}
</script>

<style></style>
