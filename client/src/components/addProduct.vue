<template>
  <div class="container">
      <form @submit.prevent="onSubmitAddProduct">
        <div class="form-group">
            <label for="name">name</label>
            <input type="text" class="form-control"  id="name" aria-describedby="emailHelp" v-model="name">
        </div>
        <div class="form-group">
            <label for="image_urlId">image url</label>
            <input type="text" class="form-control" id="image_urlId" v-model="image_url">
        </div>
          <div class="form-group">
            <label for="priceId">price</label>
            <input type="text" class="form-control" id="priceId" v-model="price">
        </div>
          <div class="form-group">
            <label for="stockId">stock</label>
            <input type="text" class="form-control" id="stockId" v-model="stock">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <div class="alert alert-danger mt-5" role="alert" v-if="errorAdd">
        {{ errorAddMessage }}
    </div>
  </div>
</template>

<script>
export default {
    name:'addProduct',
    data () { 
        return { 
            name:'',
            image_url:'',
            price:0,
            stock:0
        }
    },
    methods:{
        onSubmitAddProduct () {
            console.log(this.name,this.image_url,this.price,this.stock)
            this.$store.dispatch('addProduct',{name:this.name,image_url:this.image_url,price:this.price,stock:this.stock})
        }
    },
    computed: { 
        errorAdd () {
            return this.$store.state.errorAdd
        },
        errorAddMessage () { 
            return this.$store.state.errorAddMessage
        }
    }
}
</script>

<style>

</style>