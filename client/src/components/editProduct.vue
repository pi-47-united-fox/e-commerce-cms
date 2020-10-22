<template>
  <div class="container">
      <form @submit.prevent="onSubmitEditProduct">
        <div class="form-group">
            <label for="name">name</label>
            <input type="text" class="form-control"  id="name" aria-describedby="emailHelp" v-model="dataEdit.name" >
        </div>
        <div class="form-group">
            <label for="image_urlId">image url</label>
            <input type="text" class="form-control" id="image_urlId" v-model="dataEdit.image_url">
        </div>
          <div class="form-group">
            <label for="priceId">price</label>
            <input type="text" class="form-control" id="priceId" v-model="dataEdit.price">
        </div>
          <div class="form-group">
            <label for="stockId">stock</label>
            <input type="text" class="form-control" id="stockId" v-model="dataEdit.stock">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
    name:'editProduct',
    data () { 
        return { 

        }
    },
    methods:{
        onSubmitEditProduct () {
            this.$store.dispatch('editProduct',{id:this.dataEdit.id,name:this.dataEdit.name,image_url:this.dataEdit.image_url,price:this.dataEdit.price,stock:this.dataEdit.stock})
        }
    },
    computed : {
        dataEdit () {
            return this.$store.state.dataEdit
        }
    }
}
</script>

<style>

</style>