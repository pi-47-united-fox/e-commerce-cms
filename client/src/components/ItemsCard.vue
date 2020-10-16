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
          <a href="">Edit</a> |
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
      console.log(id, ">> delete");
      this.fetchProducts();
      this.$store.dispatch("deleteProducts", id);
    },
    getDetails(data) {
      console.log(data, "data product untuk details item card");
      this.$store.dispatch("fetchOneProducts", data);
      this.$emit("emitFetchOneProducts", data);
    },
  },
  created() {
    this.fetchProducts();
    // console.log('DATA FETCH')
    // console.log(this.products.products[0].UserId)
    // console.log(this.products.products[0].name)
    // console.log(this.products.products[0].image_url)
    // console.log(this.products.products[0].category)
    // console.log(this.products.products[0].price)
    // console.log(this.products.products[0].stock)
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
  width: 90%;
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
