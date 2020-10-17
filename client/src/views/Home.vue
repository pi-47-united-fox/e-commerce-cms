<template>
  <div class="home "> 
    <hr>
    <h2 class="">List of Products</h2> 
    <hr>
      <button class="float-right m-2 btn btn-info" @click="openForm">Add New Product</button>
    <table class="table">
      <thead class="thead-light">
        <tr>
          <th scope="col">No</th>
          <th scope="col">Image</th>
          <th scope="col">Name</th>
          <th scope="col">Category</th>
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
    openForm () {
      // console.log("open Add Form");
      this.$store.commit('TOGGLE_ADDFORM')
    }
  },
  created () { 
    this.$store.dispatch('fetchCategories')
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
.home {
  height: 98%; 
}
</style>
