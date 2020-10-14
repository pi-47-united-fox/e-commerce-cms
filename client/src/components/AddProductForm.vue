<template>
  <div class="column is-9" id="AddProductForm">
    <div class="field">
      <label class="label">Product Name</label>
      <div class="control">
        <input class="input" type="text" placeholder="Text input" />
      </div>
    </div>

    <div class="field">
      <label class="label">Price</label>
      <div class="control has-icons-left has-icons-right">
        <input
          class="input"
          type="number"
          placeholder="Product Price"
          min="100"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-dollar-sign"></i>
        </span>
      </div>
    </div>

    <div class="field">
      <label class="label">Stock</label>
      <div class="control has-icons-left has-icons-right">
        <input
          class="input"
          type="number"
          placeholder="Product Stock"
          min="1"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-boxes"></i>
        </span>
      </div>
    </div>

    <div class="field">
      <label class="label">Product Image URL</label>
      <div class="control has-icons-left has-icons-right">
        <input class="input" type="url" placeholder="image url" />
        <span class="icon is-small is-left">
          <i class="fas fa-images"></i>
        </span>
      </div>
    </div>

    <div class="field">
      <label class="label">Subject</label>
      <div class="control">
        <div class="select">
          <select>
            <option>Fashion</option>
            <option>Computer & Laptop</option>
            <option>Phone & Tablet</option>
          </select>
        </div>
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link">Submit</button>
      </div>
      <div class="control">
        <button class="button is-link is-light">
          <router-link to="/home">Cancel</router-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>