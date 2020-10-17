<template>
  <div>
    <center>
      <div class="login">
        <div style="margin-top: 20px">
          <img src="../assets/zambanlogo.svg" alt="" />
        </div>
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
          <button class="btn-login" @click.prevent="login">login</button>
          <div>
            <img
              src="../assets/www.zamban.co.id.svg"
              alt=""
              width="100px margin-top=30px"
            />
          </div>
        </div>
      </div>
    </center>
  </div>
</template>

<script>
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
      // console.log(this.email, this.password, '<----ini dari view login')
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>

<style>
</style>
