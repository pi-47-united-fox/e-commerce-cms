<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-info">
        <a class="navbar-brand text-white" href="#" @click.prevent="$router.push({ path:'/' })">E-Commerce</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <a class="nav-link text-white" href="#" tabindex="-1" aria-disabled="true" 
                @click.prevent="$router.push({ path:'/login' })"
                v-if="this.$route.name === 'Login'">
                Login</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white" href="#" tabindex="-1" aria-disabled="true"
              @click.prevent="$router.push({ path:'/addForm' })"
              v-if="this.$route.name === 'Home' || this.$route.name === 'AddForm' || this.$route.name === 'EditForm' || this.$route.name === 'Detail'"
              >Add Product</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white" href="#" tabindex="-1" aria-disabled="true"
              @click.prevent="logoutHandler"
              v-if="this.$route.name === 'Home' || this.$route.name === 'AddForm' || this.$route.name === 'EditForm' || this.$route.name === 'Detail'"
              >Logout</a>
            </li>
          </ul>
        </div>
      </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  components: {},
  methods: {
    logoutHandler () {
      localStorage.clear()
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style>
</style>
