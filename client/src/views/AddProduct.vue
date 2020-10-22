<template>
        <div class="jumbotron container mt-3" id="addTask">
          <h3>Add New Product</h3>
            <form @submit.prevent="addProduct" class="container mt-4">
                <div class="form-group">
                    <label for="title">Name:</label><br>
                    <input v-model="name" type="text"  placeholder="Enter name here" class="form-control">
                </div>
                <div class="form-group">
                    <label for="image_url">Image URL:</label><br>
                    <input v-model="image_url" type="text" placeholder="Enter image url here" class="form-control">
                </div>
                <div class="form-group">
                    <label for="price">Price:</label><br>
                    <input v-model="price" type="number" placeholder="Enter Price here" class="form-control">
                </div>
                <div class="form-group">
                    <label for="stock">Stock:</label><br>
                    <input v-model="stock" type="number" placeholder="Enter Stock here" class="form-control">
                </div>
                <div class="form-group text-center">
                    <button class="btn btn-info float-right">Add Product</button>
                </div>
            </form>
        </div>
</template>

<script>
import axios from '../axios/axiosInstance'

export default {
  name: 'AddProduct',
  data () {
    return {
      name: '',
      image_url: '',
      price: '',
      stock: ''
    }
  },
  methods: {
    addProduct () {
      axios({
        url: '/products',
        method: 'POST',
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
          // console.log(data, '<<<<<<<<<<<<<<<<< INI DARI CLIENT >>>>>>>>>>>>>>>>>>')
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
