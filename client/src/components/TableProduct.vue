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
      <div>
        <b-alert variant="danger" show dismissible v-if="deleteMessage">
          {{deleteMessage}} <b>&rArr;</b>
        </b-alert>
      </div>
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
        <td>Rp {{ product.price.toLocaleString() }}</td>
        <td>{{ product.stock }} cups</td>
        <td>
          <button @click="populateProduct(product)" class="btn btn-danger mr-3">
            Edit
          </button>
          <b-button class="btn-danger" @click="showMsgBoxTwo(product.id)"
            >Delete</b-button
          >
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'TableProduct',
  props: ['products'],
  data () {
    return {
      deleteMessage: ''
    }
  },
  methods: {
    populateProduct (data) {
      this.$store.commit('EDITPAGE', data)
      this.$router.push({ name: 'editPage', params: { id: data.id } })
    },
    showMsgBoxTwo (id) {
      this.$bvModal
        .msgBoxConfirm('Please confirm that you want to delete?', {
          title: 'Please Confirm',
          size: 'md',
          buttonSize: 'md',
          okVariant: 'danger',
          okTitle: 'YES',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true,
          bodyBgVariant: 'transparent',
          bodyTextVariant: 'dark',
          headerBgVariant: 'dark',
          headerTextVariant: 'light'
        })
        .then((value) => {
          if (value) {
            return this.$store.dispatch('deleteProduct', id)
          }
        })
        .then(({ data }) => {
          this.deleteMessage = data.message
          this.$store.dispatch('fetchProduct')
        })
        .catch((err) => {
          // An error occurred
          console.log(err)
        })
    }
  }
}
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
