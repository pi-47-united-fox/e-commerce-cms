<template>
  <nav class="bg-dark sidebar">
      <div class="sidebar">
        <router-link to="/">Home</router-link>
        <router-link to="/footballPlayers">Football players</router-link>
        <router-link to="/login">login</router-link>
      </div>
      <router-link to="/login"><button class="button text-primary bg-dark" @click="logout">logout</button></router-link>
    </nav>
</template>

<script>
export default {
  methods: {
    logout () {
      localStorage.clear()
    }
  }

}
</script>

<style>
.button {
  border: none;
}
</style>