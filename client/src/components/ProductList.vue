<template>
  <!--Fetch product data container--->
  <div class="column" id="main-area">
    <router-link to="/add-product">
    <button class="button is-primary">
      <i class="fas fa-plus-circle"> </i>
      Add a New Product
    </button></router-link>
    <table class="table">
      <thead>
        <th>No</th>
        <th>Product Image</th>
        <th>Product Name</th>
        <th>Price</th>
        <th>Stock</th>
        <th>Actions</th>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>
            <img
              class="image is-64x64"
              src="https://m.media-amazon.com/images/I/81Mty84-ttL._AC_UL320_.jpg"
              alt="product-name"
            />
          </td>
          <td>
            <strong
              >Dual USB Table Lamp, Kakanuo Traditional Bedside Lamp</strong
            >
          </td>
          <td>3000000</td>
          <td>9</td>
          <td>
            <span class="icon has-text-info">
              <i class="fas fa-edit"></i>
            </span>
            <span class="icon has-text-danger">
              <i class="fas fa-trash"></i>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
    name: 'ProductList'
};
</script>

<style>
</style>