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
        <tr v-for="product in products" :key="product.id">
          <td>{{product.id}}</td>
          <td>
            <img
              class="image is-64x64"
              :src="product.image_url"
              :alt="product.name"
            />
          </td>
          <td>
            <strong
              >{{product.name}}</strong
            >
          </td>
          <td>{{product.price}}</td>
          <td>{{product.stock}}</td>
          <td>
            <span @click="editProductForm(product)" class="icon has-text-info">
              <i class="fas fa-edit"></i>
            </span>
            <span @click="deleteProduct(product.id)" class="icon has-text-danger">
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
  name: 'ProductList',
  methods: {
    fetchProducts () {
      this.$store.dispatch('fetchProducts')
    },

    editProductForm (product) {
      this.$store.dispatch('editProductForm', product)
    },

    deleteProduct (id) {
      this.$store.dispatch('deleteProduct', id)
    }
  },
  created () {
    this.fetchProducts()
  },

  computed: {
    products () {
      return this.$store.state.products
    }
  }
}
</script>

<style>
</style>
