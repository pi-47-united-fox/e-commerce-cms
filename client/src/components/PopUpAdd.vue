<template>
  <!--Add task pop up-->
  <div class="add-task">
    <h2>Add Products</h2>
    <form @submit.prevent="addProducts">
      <fieldset class="uk-fieldset">
        <legend class="uk-legend">Legend</legend>

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
      <button class="uk-button uk-button-default" @click="closePopAdd">
        Cancel
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'PopAdd',
  data () {
    return {
      name: '',
      image_url: '',
      stock: '',
      category: '',
      price: ''
    }
  },
  methods: {
    closePopAdd () {
      console.log('emit shiow pop add dari CR')
      this.$emit('emitClosePopAdd', false)
    },
    addProducts () {
      console.log('submit pop add!')
      const payload = {
        name: this.name,
        stock: this.stock,
        image_url: this.image_url,
        category: this.category,
        price: this.price
      }
      this.$store.dispatch('addProducts', payload)
      this.$store.dispatch('fetchProducts')
      // this.$emit("reload_page");
      this.closePopAdd()
    }
  },
  computed: {
    products () {
      return this.state.addProducts
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
  }
}
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
