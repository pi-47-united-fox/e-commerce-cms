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
          timeout="5000"
          >Welcome Back Admin</v-alert
        >
        <v-alert
          dismissible
          dense
          text
          timeout="5000"
          type="success"
          >Open tab Product to see the Product list</v-alert
        >
        <transition name="fade" mode="out-in">
          <router-view transition="slide-x-transition" />
        </transition>
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

<style>
.router-link-active {
  color: red;
}

.fade-enter {
  transform: scale(0);
}

.fade-enter-active {
  transition: transform 0.2s ease;
}

.fade-leave-active {
  transition: transform 0.2s ease;
  transform: scale(0);
}
</style>
