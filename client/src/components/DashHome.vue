<template>
  <v-card>
      <h1>Total Product: {{product.length}}</h1>
  </v-card>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    products () {
      return this.$store.state.products
    },
    categories () {
      return this.$store.state.categories
    },
    banners () {
      return this.$store.state.banners
    }
  }
}
</script>

<style>

</style>>
