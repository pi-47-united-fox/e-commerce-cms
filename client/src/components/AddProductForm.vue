<template>
    <div class="column is-three-fifth is-offset-one-fourth" id="main-area">
      <div >
        <h1 class="title">Add a New Product</h1>
        <form>
          <div class="field">
            <label class="label">Product Name</label>
            <p class="control has-icons-left">
              <input
                class="input"
                type="text"
                placeholder="Add a SEO friendly product name"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-shopping-bag"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <label class="label">Image URL</label>
            <p class="control has-icons-left">
              <input
                class="input"
                type="text"
                placeholder="Insert an URL of an uploaded image"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-link"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <label class="label">Price</label>
            <p class="control has-icons-left">
              <input
                class="input"
                type="number"
                placeholder="Be competetive about the price"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-coins"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <label class="label">Stock</label>
            <p class="control has-icons-left">
              <input
                class="input"
                type="number"
                placeholder="How many is left in the store?"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-warehouse"></i>
              </span>
            </p>
          </div>
          <div class="field is-grouped">
            <p class="control">
              <a class="button is-primary"> Add </a>
            </p>
            <p class="control">
              <a class="button is-light"> Cancel </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  
</template>

<script>
export default {
  name: "AddProductForm",
};
</script>

<style>
</style>