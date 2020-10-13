<template>
  <div>
    <center>
      <div class="login">
        <div style="margin-top:20px">
          <img src="../assets/zambanlogo.svg" alt="" />
        </div>
        <h3 style="margin-top:20px">Admin Login</h3>
        <div style="margin-top:10px">
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
            v-model="email"
          />
        </div>
        <div>
        </div>
          <button class="btn-login">login</button>
        </div>
      </div>
    </center>
  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style>
</style>
