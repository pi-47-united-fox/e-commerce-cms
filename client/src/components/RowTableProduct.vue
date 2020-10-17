<template> 
    <tr> 
        <th scope="row">{{count+1}}</th>
        <td> <img :src="product.image_url" width="150px" alt=""> </td>
        <td> {{product.name}}</td>
        <td>{{category}}</td>
        <td>{{product.price}}</td>
        <td>{{product.stock}}</td>
        <td> <button class="btn btn-outline-info mr-2" @click="editProduct">Edit</button>
            <button class="btn btn-outline-danger" @click="deleteProduct(product.id)">Delete</button>
        </td>
    </tr>  
</template>

<script>
export default {
    name:'TableRowProducts',
    props: ['product','count'],
    methods: {
        deleteProduct (id) {
            this.$store.dispatch('deleteProduct',id)
        },
        editProduct () {
            let payload = {
                id: this.product.id,
                name: this.product.name,
                url: this.product.image_url,
                price: this.product.price,
                stock: this.product.stock,
                category: this.product.CategoryId,
            }
            // this.$store.state.editProductData = payload
            this.$store.commit('SET_EDITPRODUCTDATA',payload)
            this.$store.commit('TOGGLE_EDITFORM')
        }
    },
    computed: {
        category(){
            return this.$store.state.categories[this.product.CategoryId-1].name
            
        }
    }

}
</script>

<style>

</style>
