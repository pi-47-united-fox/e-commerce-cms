<template> 
    <tr> 
        <th scope="row">{{count+1}}</th>
        <td> <img :src="product.image_url" alt=""> </td>
        <td> {{product.name}}</td>
        <td>{{product.price}}</td>
        <td>{{product.stock}}</td>
        <td> <button class="btn btn-outline-info mr-2">Edit</button>
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
            console.log(id);
        }
    }

}
</script>

<style>

</style>
