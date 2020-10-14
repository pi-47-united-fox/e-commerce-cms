<template>
  <div class="column is-2" id="dashboard-side-menu">
    <aside class="menu">
      <p class="menu-label">General</p>
      <ul class="menu-list">
        <li>
          <a><i class="fas fa-store"></i> Dashboard</a>
        </li>
        <li>
          <a><i class="fas fa-users"></i> Customers</a>
        </li>
      </ul>
      <p class="menu-label">Product</p>
      <ul class="menu-list">
        <li>
          <router-link to="/"><i class="fas fa-shopping-bag"></i> Show All Products</router-link>
        </li>
        <li>
          <router-link to="/add-product"><i class="fas fa-plus-square"></i> Add a Product</router-link>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
};
</script>

<style>
</style>