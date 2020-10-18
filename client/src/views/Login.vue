<template>
  <div id="login" class="bg-light p-5">
    <div class="container mt-5 border bg-white  p-5">
        <div id="login-row" class="row justify-content-center align-items-center">
          <h1 class="text-info">CMS Login</h1>
            <div id="login-column" class="col-md-12 col-xl-8">
              <div class="alert alert-warning alert-dismissible fade show" v-if="this.$store.state.errMessage.length > 0" role="alert">
                {{this.$store.state.errMessage}}
                <button type="button" class="close" @click="clearError" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
                <div id="login-box" class="col-md-12">
                    <form id="login-form"  @submit.prevent=""  class="form text-left" action="" method="post">
                        <!-- <h3 class="text-center text-info">Login</h3><hr> -->
                        <div class="form-group">
                            <label for="email" class="text-info">Username:</label><br>
                            <input v-model="emailFormLogin" type="email" name="email" id="email-login" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="password" class="text-info">Password:</label><br>
                            <input v-model="passwordFormLogin" type="password" name="password" id="password-login" class="form-control">
                        </div>
                            <input type="submit" class="btn btn-info btn-xl" @click="login" value="Login">
                        <div class="form-group">
                            <!-- Dont have any ? <a class="text-info">Register here</a> -->
                            <!-- <GoogleLogin class="float-right" :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin> -->
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
http://localhost:8080/
<script>
// @ is an alias to /src

export default {
  name: 'Login',
  data () {
    return {
      emailFormLogin: '',
      passwordFormLogin: ''
    }
  },
  components: {
  },
  methods: {
    login () {
      // console.log(this.emailFormLogin, this.passwordFormLogin)
      this.$store.dispatch('login', { email: this.emailFormLogin, password: this.passwordFormLogin })
    }, 
    clearError () {
      this.$store.commit('CLEAR_ERRMSG')
    } 
  }
}
</script>
<style scoped>
#login{
  height: 100vh;
}
.container{
  width: 50%;
}
#login-box {
  border-left: solid #17a2b8;
} 
</style>
