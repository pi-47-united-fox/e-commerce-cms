<template>
  <div class="hero is-fullheight bg">
    <div class="columns hero-body">
      <LoginForm></LoginForm>
    </div>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm'

export default {
  name: 'Login',
  components: {
    LoginForm
  }
}
</script>

<style>
</style>
