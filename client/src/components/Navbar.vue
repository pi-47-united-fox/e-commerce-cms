<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="light" class="fixed-top">
      <div>
        <router-link to="/Product"> <i class="fa fa-mug-hot"> My Home </i></router-link>
      </div>
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em> <i class="fa fa-cogs"> My Shop </i></em>
            </template>
            <b-dropdown-item href="#"
              ><router-link to="/addProduct">
                <b-button variant="outline-dark" class="mb-2">
                  <b-icon icon="plus-square" aria-hidden="true"></b-icon> Add
                </b-button>
                <br /></router-link
            ></b-dropdown-item>
            <b-dropdown-item href="#">
            <b-button @click="logout"  variant="outline-dark" class="mb-2">
              <b-icon icon="power" aria-hidden="true"></b-icon> Logout
            </b-button>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
export default {
  name: 'Navbar',
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style>
a{
  color: black !important;
  text-decoration: none;
}
</style>
