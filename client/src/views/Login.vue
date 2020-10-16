<template>
  <div>
    <center>
      <div class="login">
        <div style="margin-top: 20px">
          <img src="../assets/zambanlogo.svg" alt="" />
        </div>
        <h3 style="margin-top: 20px">Admin Login</h3>
        <div style="margin-top: 10px">
          <div class="input">
            <input
              type="email"
              class="text"
              placeholder="Your Email"
              v-model="email"
            />
          </div>
          <div class="input">
            <input
              type="password"
              class="text"
              placeholder="******"
              v-model="password"
            />
          </div>
          <div></div>
          <button class="btn-login" @click.prevent="login">
            login
          </button>
        </div>
      </div>
    </center>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  nama: 'LoginPage',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      axios({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          localStorage.access_token = data.access_token
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
</style>
