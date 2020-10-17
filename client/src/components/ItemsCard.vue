<template>
  <div class="column">
    <!-- items template fetch -->
    <div v-for="products in products.products" :key="products.id">
      <div class="item-card">
        <img :src="products.image_url" alt="" srcset="" />

        <div class="item-card-text">
          <h3 @click.prevent="getDetails(products.id)">{{ products.name }}</h3>
          <p>Stock : {{ products.stock }} items</p>
          <p>Category: {{ products.category }}</p>
          <a href="#" @click.prevent="editProducts(products.id)">Edit</a> |
          <a href="#" @click.prevent="deleteProduct(products.id)">Delete</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemsCard",
  props: ["products"],
  methods: {
    fetchProducts() {
      this.$store.dispatch("fetchProducts");
    },
    deleteProduct(id) {
      // this.fetchProducts();
      this.$store.dispatch("deleteProducts", id);
    },
    getDetails(data) {
      this.$store.dispatch("fetchOneProducts", data);
      this.$emit("emitFetchOneProducts", data);
    },
    editProducts(id) {
      this.$emit("emitEditProducts", true);
      this.$store.dispatch("idProducts", id);
      console.log("id dari item card >>> ", id);
    },
  },
  computed: {
    productId() {
      // console.log("computed id >>>", this.$store.state.idProducts);
      return this.$store.state.idProducts;
    },
  },
  created() {
    this.fetchProducts();
  },
};
</script>

<style>
/* item card components */
.column {
  width: 65%;
  height: auto;
  /* background: chartreuse; */
  display: flex;
  flex-direction: column;
}

.item-card {
  width: 100%;
  height: 200px;
  display: flex;
  border-radius: 10px;
  overflow: hidden;
  color: whitesmoke;
  margin-top: 20px;
  margin-left: 40px;
}

.item-card-text {
  width: 80%;
  height: 100%;
  background-color: rgb(36, 36, 36);
  text-align: left;
  line-height: normal;
  color: white;
  align-items: center;
  padding: 20px;
}
.item-card-text h3 {
  color: white;
  font-weight: bold;
}

.item-card img {
  width: 30%;
  height: auto;
}

h3 {
  cursor: pointer;
}
</style>
