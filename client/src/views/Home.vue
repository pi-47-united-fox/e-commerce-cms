<template>
  <div class="home container mt-5"> 
    <h2>List of Products</h2> 

    <table class="table">
      <thead class="thead-light">
        <tr>
          <th scope="col">No</th>
          <th scope="col">Image</th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">Stock</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody> 
          <TableRow v-for="(product, count) in productList" 
            :key="product.id" 
            :product="product"
            :count="count"
          >
          </TableRow> 
      </tbody>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import TableRow from '@/components/RowTableProduct.vue'

export default {
  name: 'Home',
  components: { 
    TableRow
  },
  methods: {
  },
  created () { 
    this.$store.dispatch('fetchProducts')
  },
  computed: {
    productList () {
      return this.$store.state.products
    }
  }
}
</script>

<style scoped>

</style>
