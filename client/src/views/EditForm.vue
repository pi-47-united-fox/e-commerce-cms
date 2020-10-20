<template>
  <div class="container">
    <h1>Edit Product</h1>
    <br />
    <form @submit.prevent="editHandler(findById.id)">
      <div class="form-group">
        <label for="name" style="margin-right: 20px">Name Product</label>
        <input type="text" class="form-control" id="name" v-model="findById.name" />
      </div>
      <div class="form-group">
        <label for="image_url" style="margin-right: 20px">Image URL</label>
        <input type="text" class="form-control" id="image_url" v-model="findById.image_url" />
      </div>
      <div class="form-group">
        <label for="price" style="margin-right: 20px">Price</label>
        <input type="text" class="form-control" id="price" v-model="findById.price" />
      </div>
      <div class="form-group">
        <label for="stock" style="margin-right: 20px">Stock</label>
        <input type="text" class="form-control" id="stock" v-model="findById.stock" />
      </div>
      <div class="form-group">
        <label for="category" style="margin-right: 20px">Category</label>
        <input type="text" class="form-control" id="category" v-model="findById.category" />
      </div>
      <button type="submit" class="btn btn-primary" style="margin-right: 20px">
        Submit
      </button>
      <button class="btn btn-danger">Back</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'EditForm',
  computed: {
    findById () {
      return this.$store.state.findById
    }
  },
  components: {},
  created () {
    this.$store.dispatch('findById', this.$route.params.id)
  },
  methods: {
    editHandler (id) {
      const obj = {
        id: id,
        name: this.findById.name,
        image_url: this.findById.image_url,
        price: this.findById.price,
        stock: this.findById.stock,
        category: this.findById.category
      }
      this.$store.dispatch('editProduct', obj)
      
    }
  }
}
</script>

<style>
</style>
