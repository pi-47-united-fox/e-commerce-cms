<template>
  <div class="column is-3">
    <p class="menu-label">General</p>
    <ul class="menu-list">
      <li><router-link to="/home">Dashboard</router-link></li>
      <li><a @click.prevent="logout">Logout</a></li>
    </ul>
    <p class="menu-label">Product</p>
    <ul class="menu-list">
      <li><router-link to="/home">See all Product</router-link></li>
      <li>
        <a>Filter by Categories</a>
        <ul>
          <li><router-link to="/home/Fashion/filter">Fashion</router-link></li>
          <li><router-link to="/home/Computer & Laptop/filter">Computer & Laptop</router-link></li>
          <li><router-link to="/home/HandPhone & Tablet/filter">HandPhone & Tablet</router-link></li>
          <li><router-link to="/home/Makanan & Minuman/filter">Makanan & Minuman</router-link></li>
        </ul>
      </li>
      <li><router-link to="/home/add">Add Product</router-link></li>
    </ul>
    <p class="menu-label">Banner</p>
    <ul class="menu-list">
      <li><router-link to="/home/banners">See all Banners</router-link></li>
      <li><router-link to="/home/banners/add">Add Banners</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style>
</style>