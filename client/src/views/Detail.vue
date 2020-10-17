<template>
  <div class="detail">
      <div class="detail-img">
        <div >
          <button
          class="back-btn-c"
          @click="$router.push({name:'Home'})"
          >
          <img
          class="back-btn"
          src="../assets/circle-with-an-arrow-pointing-to-left.svg"
          >
          </button>
        </div>
        <br>
        <img
          class="detail-pic"
          :src="image_url"
          alt=""
        />
      </div>
      <div></div>
      <div class="detail-item">
        <h1>Update Product</h1>
        <h4>Name</h4>
        <input type="text" class="detail-text" v-model="name">
        <h4>Image_url</h4>
        <input type="text" class="detail-text" v-model="image_url">
        <h4>Price</h4>
        <input type="text" class="detail-text" v-model="price">
        <h4>Stock</h4>
        <input type="text" class="detail-text" v-model="stock">
      </div>
      <button class="submit-btn" @click.prevent="editData()">Submit</button>
  </div>
</template>

<script>
export default {
  props: ["products"],
  data(){
    return{
      id:this.$store.state.dataEdit.id,
      name:this.$store.state.dataEdit.name,
      image_url:this.$store.state.dataEdit.image_url,
      price:this.$store.state.dataEdit.price,
      stock:this.$store.state.dataEdit.stock,
    }
  },
  created () {
    console.log('ini di detail')
  },
  methods: {
    editData(){
      this.$store.dispatch('editData', {
        id:this.id,
        name: this.name,
        imageurl: this.imageurl,
        price: this.price,
        stock: this.stock
      })
      this.$router.push({ name: "Home" })

    }
  }
}
</script>

<style>
</style>
