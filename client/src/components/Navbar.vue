<template>
    <!-- navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-primary mb-5 fixed-top">
        <a class="navbar-brand text-white" href="#">E-commerce CMS</a>
        <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <a class="nav-link text-dark" href="#" id="HomeNav"
                        v-on:click.prevent="home" v-if="this.$route.name === 'Home' || this.$route.name === 'AddForm' || this.$route.name === 'EditForm'">Home</a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link text-dark" href="#" id="LoginNav"
                        v-on:click.prevent="login" v-if="this.$route.name === 'Login'">Login</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-dark" href="#" id="logout"
                        v-on:click.prevent="logout" v-if="this.$route.name === 'Home' || this.$route.name === 'AddForm' || this.$route.name === 'EditForm'">Logout</a>
                </li>
            </ul>
            
        </div>
    </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
      home () {
          this.$router.push({name: 'Home'})
      },
      login () {
          this.$router.push({name: 'Login'})
      },
      logout () {
          localStorage.clear()
          this.$router.push({name: 'Login'})
      }
  }
}
</script>

<style>
 /* unvisited link */
a:link {
  color: white;
  text-decoration: none;
}

/* visited link */
a:visited {
  color: white;
  text-decoration: none;
}

/* mouse over link */
a:hover {
  color: white;
  text-decoration: none;
}

/* selected link */
a:active {
  color: white;
  text-decoration: none;
} 
</style>
