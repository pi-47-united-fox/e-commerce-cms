<template>
  <!--- NAVIGATION START-->
    <nav class="navbar" role="navigation" aria-label="main navigation" id="dashboard-top-menu">
        <div class="navbar-brand">
            <a class="navbar-item" href="https://bulma.io">
                <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
            </a>
            <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false"
                data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <a @click="logout" class="button is-primary">
                            Logout
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <!---NAVIGATION END-->
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  }

}
</script>

<style>

</style>
