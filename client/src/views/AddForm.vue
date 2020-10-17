<template>
<div class="container my-5 py-3 border border-dark rounded bg-secondary text-white" style="width: 30%;">
    <div class="container" id="addTask">
        <img src="https://images.unsplash.com/photo-1522273400909-fd1a8f77637e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
            alt="products" class="img-fluid rounded">
        <div class="container my-1">
            <h3 class="text-center">Add a new product</h3>
        </div>
        <form id="addForm" v-on:submit.prevent="addTask">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" placeholder="Product's name" v-model="name">
            </div>
            <div class="form-group">
                <label for="image_url">Image URL</label>
                <textarea class="form-control" id="image_url" rows="1" placeholder="Product's image" v-model="image_url"></textarea>
            </div>
            <div class="form-group">
                <label for="price">Price</label>
                <input type="number" class="form-control" name="price" id="price" placeholder="Price should be greater than 0." v-model="price">
            </div>
            <div class="form-group">
                <label for="stock">Stock(s)</label>
                <input type="number" class="form-control" id="stock" placeholder="Do not input negative value." v-model="stock">
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%;">Add</button>
            <button type="button" class="btn btn-danger my-2" style="width: 100%;" v-on:click.prevent="returnHome">Cancel</button>
        </form>
    </div>
</div>
</template>

<script>
export default {
  name: 'AddForm',
  data () {
      return {
          name: '',
          image_url: '',
          price: 0,
          stock: 0
      }
  }
}
</script>

<style>
#addForm{
    text-align: left;
}
</style>
