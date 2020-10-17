<template>
    <tr>
        <th scope="row">1</th>
        <td>Adidas Yeezy</td>
        <td>url</td>
        <td>Rp 2.000.000 </td>
        <td>5</td>
        <td class="text-center"><button type="button" class="btn btn-success mr-2" v-on:click="toEditProduct(product.id)">Edit</button><button type="button" class="btn btn-danger">Delete</button></td>
    </tr>
</template>

<script>
export default {
  name: 'TableRow',
  props: ['product'],
  methods: {
    toEditProduct (productId) {
      this.$route.push({name: 'EditForm', params: {id: productId}})
    }
  }
}
</script>

<style>

</style>
