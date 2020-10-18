<template>
    <div class="pop-up"  >
        <div class="card pop-up-form" >
            <div class="card-header">
                <h2>Add New Product</h2>
                <!-- <button class="btn btn-large btn-danger float-right">X</button> -->
            </div>
            <div class="card-body">
                
            <div class="alert alert-warning alert-dismissible fade show" v-if="this.$store.state.errMessage.length > 0" role="alert">
                {{this.$store.state.errMessage}}
                <button type="button" class="close" @click="clearError" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form class="form text-left"> 
                <div class="form-group row mx-sm-3 mb-2 ">
                    <label for="form-task-name" class="mr-3">Product Name</label>
                    <input type="text" class="form-control" name="form-task-title" v-model="inputProductName" placeholder="-- Sepatu Niqe --" >
                </div>
                <div class="form-group row mx-sm-3 mb-2 ">
                    <label for="form-product-image" class="mr-3">Product Image</label>
                    <input type="text" class="form-control" name="form-product-image" v-model="inputProductImage" placeholder="-- https://image.com/gambar-sepatu.jpeg --" >
                </div>
                <div class="form-group row mx-sm-3 mb-2 "> 
                    <label for="form-product-price" class="mr-3">Product Price</label>
                    <input type="number" class="form-control" name="form-product-price" v-model="inputProductPrice" placeholder=" -- Rp. 3.000.000 -- " > 
                </div>
                <div class="form-group mx-sm-3 mb-2 ">
                    <label for="form-product-stock" class="mr-3">Product Stock</label><br>
                    <input type="number" class="form-control" name="form-product-stock" v-model="inputProductStock" placeholder=" -- 1000 --" >
                </div>
                <div class="form-group mx-sm-3 mb-2 ">
                    <label for="form-task-category" class="mr-3">Product Category</label>
                    <select class="form-control" v-model="inputProductCategory" name="category" id="">
                        <option value="">--Select Category--</option>
                        <option v-for="category in this.$store.state.categories" :key="category.id" :value="category.id"> {{category.name}} </option> 
                    </select>
                </div> 
                <center>
                    <a href="#" @click="addProduct()" class="btn btn-info mr-2">Add Product</a>
                    <a href="#" @click="close()" class="btn btn-danger">Cancel</a>
                </center>  
            </form> 
            </div>
        </div> 
    </div>
</template>

<script>
export default {
    name: 'FormAdd',
    data () {
        return {
            inputProductName:"",
            inputProductImage:'',
            inputProductPrice:'',
            inputProductStock:'',
            inputProductCategory:'',
        }
    },
    methods:{
        addProduct () {
            let payload = {
                name: this.inputProductName,
                image_url: this.inputProductImage,
                price: +this.inputProductPrice,
                stock: +this.inputProductStock,
                CategoryId: +this.inputProductCategory
            }
            this.$store.dispatch('addProduct', payload)
        },
        close () {
            this.clearError()
            this.$store.commit('TOGGLE_ADDFORM') 
        },
        clearError () {
            this.$store.commit('CLEAR_ERRMSG')
        } 

    },
    destroy () {
        console.log("destroy");
    }
}
</script>

<style>

.pop-up{
    position: fixed;
    z-index: 999; 
    height: 100vh;
    width: 100%;
    background-color: #75879a7a;
}
.pop-up-form{
    margin: 15% auto;
    width: 50%;
    min-width:700px
}
</style>