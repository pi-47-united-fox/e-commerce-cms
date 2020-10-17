<template>
<div class="container">
    <h2 class="py-3">Current Products</h2>
    <button type="button" class="btn btn-info my-3 d-flex justify-content-end">Add Product</button>
    <table class="table">
        <caption>List of products</caption>
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Image</th>
                <th scope="col">Price</th>
                <th scope="col">Stock(s)</th>
                <th class="text-center" scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
            <TableRow></TableRow>
        </tbody>
    </table>
</div>
</template>

<script>
// @ is an alias to /src
import TableRow from '../components/TableRow'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    TableRow
  },
  methods: {
    fetchProducts () {
      axios({
        url: 'http://localhost:3000/stocks',
        method: 'get'
      })
        .then(({ data }) => {
          console.log(data)
        })
        .catch(console.log)
    },
    
  },
  created () {
    this.fetchProducts()
  }
}
</script>
