<template>
    <div class="pop-up"  >
        <div class="card pop-up-form" >
            <div class="card-header">
                <h2>Edit Product</h2>
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
                    <input type="text" class="form-control" name="form-task-title" v-model="inputProductEditName" placeholder="-- Sepatu Niqe --" >
                </div>
                <div class="form-group row mx-sm-3 mb-2 ">
                    <label for="form-product-image" class="mr-3">Product Image</label>
                    <input type="text" class="form-control" name="form-product-image" v-model="inputProductEditImage" placeholder="-- https://image.com/gambar-sepatu.jpeg --" >
                </div>
                <div class="form-group row mx-sm-3 mb-2 "> 
                    <label for="form-product-price" class="mr-3">Product Price</label>
                    <input type="number" class="form-control" name="form-product-price" v-model="inputProductEditPrice" placeholder=" -- Rp. 3.000.000 -- " > 
                </div>
                <div class="form-group mx-sm-3 mb-2 ">
                    <label for="form-product-stock" class="mr-3">Product Stock</label><br>
                    <input type="number" class="form-control" name="form-product-stock" v-model="inputProductEditStock" placeholder=" -- 1000 --" >
                </div>
                <div class="form-group mx-sm-3 mb-2 ">
                    <label for="form-task-category" class="mr-3">Product Category</label>
                    <select class="form-control" v-model="inputProductEditCategory" name="category" id="">
                        <option value="">--Select Category--</option>
                        <option v-for="category in this.$store.state.categories" :key="category.id" :value="category.id"> {{category.name}} </option> 
                    </select>
                </div> 
                <center>
                    <a href="#" @click="editProduct()" class="btn btn-info mr-2">Edit Product</a>
                    <a href="#" @click="close()" class="btn btn-danger">Cancel</a>
                </center>  
            </form> 
            </div>
        </div> 
    </div>
</template>

<script>
export default {
    name: 'FormEdit',
    // props:[],
    data () {
        return {
            id:this.$store.state.editProductData.id,
            inputProductEditName: this.$store.state.editProductData.name,
            inputProductEditImage: this.$store.state.editProductData.url,
            inputProductEditPrice: this.$store.state.editProductData.price,
            inputProductEditStock: this.$store.state.editProductData.stock,
            inputProductEditCategory:this.$store.state.editProductData.category
        }
    },
    methods:{
        editProduct () {
            let payload = {
                name: this.inputProductEditName,
                image_url: this.inputProductEditImage,
                price: +this.inputProductEditPrice,
                stock: +this.inputProductEditStock,
                CategoryId: +this.inputProductEditCategory
            }
            this.$store.dispatch('editProduct', {id:this.id,newData:payload})
        },
        close () {
            this.clearError()
            this.$store.commit('TOGGLE_EDITFORM')
        },
        clearError () {
            this.$store.commit('CLEAR_ERRMSG')
        } 
    },
    computed:{
        productEdit () {
            return this.$store.state.editProductData
        }
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