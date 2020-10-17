<template>
        <div class="jumbotron container mt-3" id="addTask">
          <h3>Edit Product</h3>
            <form @submit.prevent="editProduct" class="container mt-4">
                <div class="form-group">
                    <label for="title">Name:</label><br>
                    <input v-model="name" type="text" name="title" id="title" class="form-control">
                </div>
                <div class="form-group">
                    <label for="image_url">Image URL:</label><br>
                    <input v-model="image_url" type="text" name="image_url" id="image_url" class="form-control">
                </div>
                <div class="form-group">
                    <label for="price">Price:</label><br>
                    <input v-model="price" type="number" name="price" id="price" class="form-control">
                </div>
                <div class="form-group">
                    <label for="stock">Stock:</label><br>
                    <input v-model="stock" type="number" name="stock" id="stock" class="form-control">
                </div>
                <div class="form-group text-center">
                    <input type="submit" name="submit" class="btn btn-primary btn-md" value="submit">
                </div>
            </form>
        </div>
</template>

<script>
import axios from '../axios/axiosInstance'

export default {
  name: 'EditProduct',
  data () {
    return {
      name: '',
      image_url: '',
      price: '',
      stock: ''
    }
  },
  created () {
    this.fetchProductById()
  },
  methods: {
    fetchProductById () {
      const productId = this.$route.params.id
      axios({
        url: '/products/' + productId,
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          this.name = data.name
          this.image_url = data.image_url
          this.price = data.price
          this.stock = data.stock
        })
        .catch(err => {
          console.log(err)
        })
    },
    editProduct () {
      const productId = this.$route.params.id
      axios({
        url: '/products/' + productId,
        method: 'PUT',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          name: this.name,
          image_url: this.image_url,
          price: this.price,
          stock: this.stock
        }
      })
        .then(({ data }) => {
          console.log(data)
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
