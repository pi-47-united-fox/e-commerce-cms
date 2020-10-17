<template>
    <div id="editProduct">
        <div class="container">
            <div id="addNew-row" class="row justify-content-center align-items-center">
                <div id="addNew-box" class="col-md-12">
                    <form id="addNew-form" class="form">
                        <h3 class="text-center text-info">Delete Product</h3>
                        <div class="form-group text-center">
                            <label for="title" class="text-info">Are you sure you wanna delete this product?</label><br>
                            <div class="d-flex justify-content-around">
                                <button @click.prevent="deleteProduct" class="btn btn-outline-danger">Yes</button>
                                <button class="btn btn-outline-info"><router-link to="/mainpage">Cancel</router-link></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../axios/axiosInstance'

export default {
  name: 'DeleteProduct',
  methods: {
    deleteProduct () {
      const deleteId = this.$route.params.id
      axios({
        url: '/products/' + deleteId,
        method: 'DELETE',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
