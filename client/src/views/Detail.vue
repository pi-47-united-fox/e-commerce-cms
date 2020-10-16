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
          src="https://www.wilton.com/dw/image/v2/AAWA_PRD/on/demandware.static/-/Sites-wilton-project-master/default/dw2e5ac60f/images/project/WLRECIP-420/2105-6818_TaPaHa_44211-1.jpg?sw=800&sh=800"
          alt=""
        />
      </div>
      <div></div>
      <div class="detail-item">
        <h1>Update Product</h1>
        <h4>Title</h4>
        <input type="text" class="detail-text">
        <h4>Image</h4>
        <input type="text" class="detail-text">
        <h4>Price</h4>
        <input type="text" class="detail-text">
        <h4>Stock</h4>
        <input type="text" class="detail-text">
      </div>
      <button class="cancel-btn">Delete</button>
      <button class="submit-btn">Submit</button>
  </div>
</template>

<script>
export default {
  created () {
    console.log('ini di detail')
  }
}
</script>

<style>
</style>
