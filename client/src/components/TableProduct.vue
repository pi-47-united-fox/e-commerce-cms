<template>
  <table class="table responsive-table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Image</th>
        <th scope="col">Price</th>
        <th scope="col">Stock</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody class="tbody">
      <tr v-for="product in products" :key="product.id">
        <th scope="row">{{ product.id }}</th>
        <td class="name-product">{{ product.name }}</td>
        <td class="pic-product">
          <div class="card" style="width: 18rem">
            <img :src="`${product.image_url}`" class="card-img-top" alt="" />
          </div>
        </td>
        <td>Rp {{ product.price.toLocaleString()}}</td>
        <td>{{ product.stock }} cups</td>
        <td>
          <button @click="populateProduct(product)" class="btn btn-danger mr-3">Edit</button>
          <button @click="deleteProduct(product.id)" class="btn btn-danger">delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "TableProduct",
  props: ["products"],
  methods: {
    populateProduct (data) {
      this.$store.commit("EDITPAGE", data)
      this.$router.push({name : 'editPage', params: {id : data.id}})
    },
    deleteProduct (id) {
      this.$store.dispatch("deleteProduct", id)
      .then(({ data }) => {
        console.log(data)
        })
        .catch(err => {
        console.log(err.response.data.errors);
        })
    }
  }
};
</script>

<style scoped>
.name-product {
  text-align: center !important;
}
.pic-product {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
.tbody {
  position: relative;
  margin-top: 50px !important;
}
/* .table-area {
  position: relative;
  z-index: 0;
  margin-top: 50px;
} */

/* table.responsive-table { 
  display: table;
  table-layout: fixed;
  width: 100%; 
  height: 100%;
}

table.responsive-table thead {
  position: fixed;
  top: 50px;
  left: 0;
  right: 0;
  width: 100%;
  height: 50px;
  line-height: 3em;
  background: #eee;
  table-layout: fixed;
  display: table;
} */
</style>
