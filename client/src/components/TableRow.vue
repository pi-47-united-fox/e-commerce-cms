<template>
    <tr>
        <th scope="row">{{index+1}}</th>
        <td>{{product.name}}</td>
        <td><img :src="product.image_url" alt="" class="img-thumbnail" style="width: 50%;"></td>
        <td>{{product.category}}</td>
        <td>{{product.price}}</td>
        <td>{{product.stock}}</td>
        <td class="text-center d-flex flex-row">
          <button type="button" class="btn btn-success mr-2" v-on:click.prevent="toEditProduct(product.id)">Edit</button>
          <button type="button" class="btn btn-danger" v-on:click.prevent="deleteProduct(product.id)">Delete</button>
        </td>
    </tr>
</template>

<script>
import axios from 'axios'
export default {
  name: 'TableRow',
  props: ['product', "index"],
  methods: {
    toEditProduct (productId) {
      this.$router.push({ name: 'EditForm', params: { id: productId } })
    },
    deleteProduct (num) {
      const productId = num
      this.$store.dispatch('deleteProduct', productId)
    }
  }
}
</script>

<style>

</style>
