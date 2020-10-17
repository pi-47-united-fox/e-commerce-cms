<template>
  <div class="column is-9" id="AddProductForm">
    <h1 class="title has-text-centered">Add New Product</h1>
    <form @submit.prevent="addProduct">
      <div class="field">
        <label class="label">Product Name</label>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="Product Name"
            required
            v-model="name"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">Price</label>
        <div class="control has-icons-left has-icons-right">
          <input
            class="input"
            type="number"
            placeholder="Product Price"
            min="100"
            required
            v-model="price"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-dollar-sign"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <label class="label">Stock</label>
        <div class="control has-icons-left has-icons-right">
          <input
            class="input"
            type="number"
            placeholder="Product Stock"
            min="1"
            required
            v-model="stock"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-boxes"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <label class="label">Product Image URL</label>
        <div class="control has-icons-left has-icons-right">
          <input
            class="input"
            type="url"
            placeholder="Product Image"
            v-model="img_url"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-images"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <label class="label">Category</label>
        <div class="control">
          <div class="select">
            <select v-model="CategoryId">
              <option value="1">Fashion</option>
              <option value="2">Computer & Laptop</option>
              <option value="3">HandPhone & Tablet</option>
              <option value="4">Makanan & Minuman</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button type="submit" class="button is-link">Submit</button>
        </div>
        <div class="control">
          <button class="button is-link is-light">
            <router-link to="/home">Cancel</router-link>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      price: 0,
      stock: 0,
      CategoryId: 0,
      img_url: "",
    };
  },
  methods: {
    addProduct() {
      this.$store.dispatch("addProduct", {
        name: this.name,
        price: this.price,
        stock: this.stock,
        CategoryId: this.CategoryId,
        img_url: this.img_url,
      });
    },
  },
};
</script>

<style>
</style>