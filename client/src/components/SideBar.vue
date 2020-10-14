<template>
  <div class="column is-3">
    <p class="menu-label">General</p>
    <ul class="menu-list">
      <li><router-link to="/home">Dashboard</router-link></li>
      <li><a>Logout</a></li>
    </ul>
    <p class="menu-label">Product</p>
    <ul class="menu-list">
      <li><router-link to="/home">See all Product</router-link></li>
      <li>
        <a>Filter by Categories</a>
        <ul>
          <li><a>Fashion</a></li>
          <li><a>Computer & Laptop</a></li>
          <li><a>Phone & Tablet</a></li>
          <li><a>Furniture</a></li>
        </ul>
      </li>
      <li><router-link to="/home/add">Add Product</router-link></li>
    </ul>
    <p class="menu-label">Banner</p>
    <ul class="menu-list">
      <li><a>See All Banner</a></li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>