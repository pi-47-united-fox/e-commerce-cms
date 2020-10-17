<template>
<div class="container">
    <Navbar class="mb-5"></Navbar>
    <h2 class="pt-5 my-5">Current Products</h2>
    <button type="button" class="btn btn-info my-3 d-flex justify-content-end" v-on:click.prevent="toAddForm">Add Product</button>
    <table class="table">
        <caption>List of products</caption>
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Image</th>
                <th scope="col">Category</th>
                <th scope="col">Price</th>
                <th scope="col">Stock(s)</th>
                <th class="text-center" scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
            <TableRow v-for="(product, i) in products" v-bind:key="i" v-bind:product="product" v-bind:index="i"></TableRow>
        </tbody>
    </table>
</div>
</template>

<script>
// @ is an alias to /src
import Navbar from '../components/Navbar'
import TableRow from '../components/TableRow'
// import axios from 'axios'

export default {
  name: 'Home',
  components: {
    TableRow,
    Navbar
  },
  methods: {
    toAddForm () {
      this.$router.push({name: 'AddForm'})
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  }
}
</script>
