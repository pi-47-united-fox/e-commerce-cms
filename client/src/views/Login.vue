<template>
    <div class="container">
        <form @submit.prevent="onLoginSubmit">
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="emailLogin" aria-describedby="emailHelp" v-model="email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="passwordLogin" v-model="password">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        <div  class="alert alert-danger mt-5" role="alert" v-show="loginStatus.errorLogin">
            {{ loginStatus.errorLoginMessage }}
        </div>
    </div>
</template>

<script>
import router from '../router/index'

export default {
  name: 'Login',
  methods: {
    onLoginSubmit () {
      this.$store.dispatch('loginHandler', { email: this.email, password: this.password })
    }
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    loginStatus () {
      return this.$store.state.loginStatus
    }
  },
  created () {
    if (localStorage.access_token) {
      router.push({ path: '/' })
    }
  }
}
</script>

<style>

</style>
