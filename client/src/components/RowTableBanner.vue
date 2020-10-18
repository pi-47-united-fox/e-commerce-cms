<template> 
    <tr> 
        <td>{{count+1}}</td>
        <td> {{banner.name}} </td>
        <td> <img :src="banner.image_url" width="400px" alt=""> </td>
        <td>{{banner.isActive}}</td> 
        <td> <button class="btn btn-outline-info mr-2" @click="editproduct">Edit</button>
            <button class="btn btn-outline-danger" @click="deleteproduct">Delete</button>
        </td>
    </tr>  
</template>

<script>
export default {
    name:'TableRowproducts',
    props: ['banner','count'],
    methods: {
        deleteproduct () {
            // console.log(this.banner.id);
            this.$store.dispatch('deleteBanner',this.banner.id)
        },
        editproduct () {
            let payload = {
                id: this.banner.id,
                name: this.banner.name,
                image_url: this.banner.image_url,
                isActive: this.banner.isActive, 
            }  
            this.$emit('editData', payload)
        }
    },
    computed: {
        category(){
            // return this.$store.state.categories[this.product.CategoryId-1].name
            
        }
    }

}
</script>

<style>

</style>
