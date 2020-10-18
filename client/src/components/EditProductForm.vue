<template>
  <div class="column is-three-fifth is-offset-one-fourth" id="main-area">
    <div>
      <h1 class="title">Edit Product</h1>
      <form>
        <div class="field">
          <label class="label">Product Name</label>
          <p class="control has-icons-left">
            <input
              v-model="inputName"
              class="input"
              type="text"
              placeholder="Add a SEO friendly product name"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-shopping-bag"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <label class="label">Image URL</label>
          <p class="control has-icons-left">
            <input
              v-model="inputUrl"
              class="input"
              type="text"
              placeholder="Insert an URL of an uploaded image"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-link"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <label class="label">Price</label>
          <p class="control has-icons-left">
            <input
              v-model="inputPrice"
              class="input"
              type="number"
              placeholder="Be competetive about the price"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-coins"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <label class="label">Stock</label>
          <p class="control has-icons-left">
            <input
              v-model="inputStock"
              class="input"
              type="number"
              placeholder="How many is left in the store?"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-warehouse"></i>
            </span>
          </p>
        </div>
        <div class="field is-grouped">
          <p class="control">
            <a @click="editProduct" class="button is-primary"> Save </a>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditProductForm',
  data () {
    return {
      id: 0,
      inputName: '',
      inputUrl: '',
      inputPrice: 0,
      inputStock: 0
    }
  },
  methods: {
    editProduct () {
      const newProduct = {
        id: this.id,
        name: this.inputName,
        image_url: this.inputUrl,
        price: this.inputPrice,
        stock: this.inputStock
      }
      this.$store.dispatch('editProduct', newProduct)
    }
  },

  created () {
    this.id = this.$store.state.productNeedEdit.id
    this.inputName = this.$store.state.productNeedEdit.name
    this.inputUrl = this.$store.state.productNeedEdit.image_url
    this.inputPrice = this.$store.state.productNeedEdit.price
    this.inputStock = this.$store.state.productNeedEdit.stock
  }
}
</script>

<style>
</style>
