<template>
  <div class="container">
    <h1>Edit Product {{$route.params.id}}</h1>
    <br />
    <form>
      <div class="form-group">
        <label for="name" style="margin-right: 20px">Name Product</label>
        <input type="text" class="form-control" id="name" />
      </div>
      <div class="form-group">
        <label for="image_url" style="margin-right: 20px">Image URL</label>
        <input type="text" class="form-control" id="image_url" />
      </div>
      <div class="form-group">
        <label for="price" style="margin-right: 20px">Price</label>
        <input type="text" class="form-control" id="price" />
      </div>
      <div class="form-group">
        <label for="stock" style="margin-right: 20px">Stock</label>
        <input type="text" class="form-control" id="stock" />
      </div>
      <div class="form-group">
        <label for="category" style="margin-right: 20px">Category</label>
        <input type="text" class="form-control" id="category" />
      </div>
      <button type="submit" class="btn btn-primary" style="margin-right: 20px">
        Submit
      </button>
      <button class="btn btn-danger">Back</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'EditForm',
  components: {}
}
</script>

<style>
</style>
