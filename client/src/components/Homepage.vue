<template>
  <div class="container">
      <button class="btn btn-success mb-3" @click.prevent="onAddHandler">Add</button>
      <table class="table table-striped">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">name</th>
            <th scope="col">image</th>
            <th scope="col">price</th>
            <th scope="col">stock</th>
            <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
            <tr 
            v-for="(product,i) in dataProduct"
            :key="i">
            <th scope="row">{{ i+1 }}</th>
            <td>{{product.name}}</td>
            <td><img :src="product.image_url" alt="" width="150px"></td>
            <td>{{ product.price }}</td>
            <td>{{ product.stock }} </td>
            <td>
              <button class="btn btn-success m-1" @click.prevent="onEditHandler(product.id)">edit</button>
              <button class="btn btn-danger m-1" @click.prevent="onDeleteHandler(product.id)">delete</button>
            </td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import router from '../router'
export default {
  name:'Homepage',
  created () {
    this.$store.dispatch('getData')
  },
  computed: {
    dataProduct () { 
      return this.$store.state.dataProduct
    }
  },
  methods : {
    onAddHandler () {
      router.push({path:'/addproduct'})
    },
    onDeleteHandler (id) {
      this.$store.dispatch('deleteProduct', id)
    },
    onEditHandler (id) {
      const dataEdit = this.dataProduct.filter(val=>val.id == id)
      this.$store.commit('dataEdit', dataEdit[0])
    }
  }
}
</script>

<style>

</style>
