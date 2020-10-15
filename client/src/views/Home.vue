<template>
  <div class="home">
    <Navbar></Navbar>
    <Product></Product>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '../components/Navbar.vue'
import Product from '@/views/Product.vue'

export default {
  name: 'Home',
  components: {
    Product,
    Navbar
  }
}
</script>
