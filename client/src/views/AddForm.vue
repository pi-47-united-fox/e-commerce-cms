<template>
  <div class="container">
      <h1>Add Product</h1>
      <br>
    <form @submit.prevent="addProduct">
      <div class="form-group">
        <label for="name" style="margin-right: 20px">Name Product</label>
        <input type="text" class="form-control" id="name" v-model="name"/>
      </div>
      <div class="form-group">
        <label for="image_url" style="margin-right: 20px;">Image URL</label>
        <input type="text" class="form-control" id="image_url" v-model="image_url"/>
      </div>
      <div class="form-group">
        <label for="price" style="margin-right: 20px;">Price</label>
        <input
          type="text"
          class="form-control"
          id="price"
          placeholder="Number"
          v-model="price"
        />
      </div>
      <div class="form-group">
        <label for="stock" style="margin-right: 20px;">Stock</label>
        <input
          type="text"
          class="form-control"
          id="stock"
          placeholder="Number"
          v-model="stock"
        />
      </div>
      <div class="form-group">
        <label for="category" style="margin-right: 20px;">Category</label>
        <input
          type="text"
          class="form-control"
          id="category"
          v-model="category"
        />
      </div>
      <button type="submit" class="btn btn-primary" style="margin-right: 20px;">Submit</button>
      <button class="btn btn-danger" @click.prevent="$router.push({path: '/'})">Back</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AddForm',
  data () {
    return {
      name: '',
      image_url: '',
      price: '',
      stock: '',
      category: ''
    }
  },
  methods: {
    addProduct () {
      const obj = {
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock,
        category: this.category
      }
      this.$store.dispatch('addProduct', obj)
    }
  },
  components: {}
}
</script>

<style>
</style>
