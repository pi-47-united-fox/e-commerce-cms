<template>
  <v-app-bar app flat>
    <v-app-bar-nav-icon @click="drawer"></v-app-bar-nav-icon>
    <!-- <v-toolbar-title>unShop</v-toolbar-title> -->
    <v-spacer></v-spacer>

    <h2>unShop Admin Dashboard</h2>

    <v-spacer></v-spacer>

    <v-menu left>

      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="menu in menus" :key="menu.title" @click="menu.action" >
          <v-list-item-title>{{ menu.title }}</v-list-item-title>
        </v-list-item>
      </v-list>

    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: 'DasboardBar',
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
      console.log ('masuk')
    },
    viewAbout () {

    }
  }
}
</script>

<style></style>
