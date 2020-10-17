<template>
<div class="container">
    <Navbar class="mb-5"></Navbar>
    <h3 class="text-center mt-5 pt-5">Edit {{product.name}}</h3>
    <div class="container my-5 py-3 border border-dark rounded bg-secondary text-white" style="width: 40%;">
        <div class="container" id="editProduct">
            <img src="https://images.unsplash.com/photo-1522273400909-fd1a8f77637e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
                alt="products" class="img-fluid rounded">
            <form id="editForm" v-on:submit.prevent="editProduct">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" placeholder="Product's name" v-model="name">
                </div>
                <div class="form-group">
                    <label for="image_url">Image URL</label>
                    <textarea class="form-control" id="image_url" rows="1" placeholder="Product's image" v-model="image_url"></textarea>
                </div>
                <div class="form-group">
                    <label for="category">Category</label>
                    <input type="text" class="form-control" id="category" placeholder="T-shirt, pants, shoes, etc..." v-model="category">
                </div>
                <div class="form-group">
                    <label for="price">Price</label>
                    <input type="number" class="form-control" name="price" id="price" placeholder="Price should be greater than 0." v-model="price">
                </div>
                <div class="form-group">
                    <label for="stock">Stock(s)</label>
                    <input type="number" class="form-control" id="stock" placeholder="Do not input negative value." v-model="stock">
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%;">Update</button>
                <button type="button" class="btn btn-danger my-2" style="width: 100%;" v-on:click.prevent="home">Cancel</button>
            </form>
        </div>
    </div>

</div>
</template>

<script>
import Navbar from '../components/Navbar'
import axios from 'axios'
export default {
  name: 'EditForm',
  components: {
      Navbar
  },
  data () {
    return {
      name: '',
      image_url: '',
      category: '',
      price: '',
      stock: ''
    }
  },
  created () {
    console.log(this.$route.params.id, 'id produk dari edit form')
    this.$store.dispatch('fetchProductById', this.$route.params.id)
  },
  computed: {
      product () {
          return this.$store.state.product
    }
  },
  watch: {
      product () {
          this.name = this.product.name
          this.image_url = this.product.image_url
          this.category = this.product.category
          this.price = this.product.price
          this.stock = this.product.stock
      }
  },
  methods: {
    editProduct () {
      const productId = this.$route.params.id
      const updated = {
        id: productId,
        name: this.name,
        image_url: this.image_url,
        category: this.category,
        price: this.price,
        stock: this.stock
      }
      this.$store.dispatch('editProduct', updated)
    },
    home () {
        this.$router.push({name: 'Home'})
    }
  }

}
</script>

<style>
#editorm{
    text-align: left;
}
</style>
