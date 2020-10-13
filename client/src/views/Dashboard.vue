<template>
  <v-app>
    <DashSidebar :drawer="drawer" />
    <DashBar @drawer='changeDrawer' />
    <v-main>
      <v-container grid-list-md dark>
        <v-alert
          dismissible
          dense
          text
          type="success"
          >Welcome Back Admin</v-alert
        >
      <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import DashSidebar from '@/components/DashSidebar'
import DashBar from '@/components/DashBar'

export default {
  name: 'Dashboard',
  components: {
    DashSidebar,
    DashBar
  },
  data () {
    return {
      drawer: true
    }
  },
  methods: {
    changeDrawer () {
      this.drawer = !this.drawer
    }
  }
}
</script>

<style></style>
