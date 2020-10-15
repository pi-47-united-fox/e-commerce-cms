<template>
    <div class="top-table align-content-end table-area">
        <TableProduct :products="products"/>
    </div>
</template>

<script>
import TableProduct from "../components/TableProduct";
export default {
  name: "Product",
  components: {
    TableProduct
  },
  computed: {
    products() {
      return this.$store.state.fetchProduct;
    }
  },
  created() {
    this.$store.dispatch("fetchProduct");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top-table {
  position: relative;
  top: 60px;
}
</style>
