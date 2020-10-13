<template>
  <nav>
    <v-navigation-drawer
        v-model="drawer"
        dark
        app
        class="blue accent-2"
    >
      <v-layout column align-center>
        <v-flex class="mt-10 mb-8">
          <v-avatar
            color="white"
            size="80"
          >
            <v-icon
              color="blue accent-2"
              large
            >mdi-account</v-icon>
          </v-avatar>
        </v-flex>
      </v-layout>
      <v-list>
        <v-list-item
         v-for="link in links" :key="link.text" router :to="link.route" active-class="border"
        >
          <v-list-item-action>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{link.text}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  props: {
    drawer: Boolean
  },
  data () {
    return {
      links: [
        { icon: 'mdi-home', text: 'Home', route: '/dash' },
        { icon: 'mdi-page-layout-sidebar-right', text: 'Pages', route: '/dash/pages' },
        { icon: 'mdi-bag-personal', text: 'Products', route: '/dash/products' },
        { icon: 'mdi-image', text: 'Banners', route: '/dash/banners' }
      ]
    }
  }
}
</script>

<style>

</style>
