<template>
  <div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/addForm">Add Product</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  components: {}
}
</script>

<style>
</style>
