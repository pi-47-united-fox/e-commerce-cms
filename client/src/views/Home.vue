<template>
  <div>
    <h3>Toko Komputer</h3>
    <div class="container">
      <div class="row">
       <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product">
       </ProductCard>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductCard from '@/components/ProductCard'

export default {
  name: 'Home',
  components: {
    ProductCard
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  created () {
    // if (localStorage.getItem('access_token')) {
    this.$store.dispatch('fetchProduct')
    // }
  }
}
</script>
