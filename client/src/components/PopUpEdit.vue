<template>
  <!--Add task pop up-->
  <div class="add-task">
    <h2>Edit Products</h2>
    <form @submit.prevent="editProducts">
      <fieldset class="uk-fieldset">
        <div class="uk-margin">
          <input
            class="uk-input"
            type="text"
            placeholder="Name"
            v-model="name"
          />
        </div>

        <div class="uk-margin">
          <input
            class="uk-input"
            type="text"
            placeholder="input an image url products here"
            v-model="image_url"
          />
        </div>

        <div class="uk-margin">
          <input
            class="uk-input"
            type="number"
            placeholder="Stock"
            v-model="stock"
          />
        </div>

        <div class="uk-margin">
          <input
            class="uk-input"
            type="number"
            placeholder=" Rp .Price"
            v-model="price"
          />
        </div>

        <div class="uk-margin">
          <select class="uk-select" v-model="category">
            <option>All Mountain</option>
            <option>Cross Country</option>
            <option>City Bike</option>
          </select>
        </div>
      </fieldset>
      <button type="submit" class="uk-button uk-button-secondary">
        Add Data
      </button>
      <button class="uk-button uk-button-default" @click="closePopEdit">
        Cancel
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "PopEdit",
  data() {
    return {
      id: 58,
      name: "",
      image_url: "",
      stock: "",
      category: "",
      price: "",
    };
  },
  methods: {
    closePopEdit() {
      this.$emit("emitClosePopEdit", false);
    },
    editProducts() {
      console.log("edit products jalanin action");
      const payload = {
        id: this.productsId,
        name: this.name,
        stock: this.stock,
        image_url: this.image_url,
        category: this.category,
        price: this.price,
      };
      this.$store.dispatch("editProducts", payload);
      this.closePopEdit();
    },
  },
  created() {
    this.$store.dispatch("fetchOneProducts", this.productsId);
  },
  watch: {
    oneProduct() {
      this.id = 58;
      this.name = this.oneProduct.name;
      this.description = this.oneProduct.description;
      this.image_url = this.oneProduct.image_url;
      this.stock = this.oneProduct.stock;
      this.category = this.oneProduct.category;
      this.price = this.oneProduct.price;
    },
  },
  computed: {
    productsById() {
      console.log("masuk computed");
      return this.$store.state.oneProduct;
    },
    productsId() {
      return this.$store.state.idProducts;
    },
    oneProduct() {
      return this.$store.state.oneProduct;
    },
  },
};
</script>

<style>
.add-task {
  margin: 0 auto;
  width: 40%;
  height: auto;
  background-color: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  border-radius: 10px;
  display: absolute;
  padding: 20px;
  position: absolute;
  -webkit-box-shadow: 1px 4px 33px 9px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 1px 4px 33px 9px rgba(0, 0, 0, 0.2);
  box-shadow: 1px 4px 33px 9px rgba(0, 0, 0, 0.2);
}
</style>
