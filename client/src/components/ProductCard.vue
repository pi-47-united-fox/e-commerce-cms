<template>
    <div class="col-3">
        <div class="card bg-white shadow">
            <img :src="product.image_url" :alt="product.name" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title"><b>{{ product.name }}</b></h5>
                <p class="card-text">Price: Rp. {{ product.price.toLocaleString() }}</p>
                <p class="card-text">Stock: {{ product.stock }}</p>
                 <div class="d-flex justify-content-around" style="padding:10px">
                <button class="btn btn-outline-primary btn-sm" @click="editProduct(product.id)">Edit</button>
                <button class="btn btn-outline-danger btn-sm" @click="deleteProduct(product.id)">Delete</button>
          </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Product-Card',
  props: ['product'],
  methods: {
    editProduct (productId) {
      this.$router.push('/edit-product/' + productId)
    },
    deleteProduct (productId) {
      this.$router.push('/delete-product/' + productId)
    }
  }
}
</script>

<style>

</style>
