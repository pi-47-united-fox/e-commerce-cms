<template>
  <div class="column is-9" id="AddProductForm">
    <h1 class="title has-text-centered">Add New Banner</h1>
    <form @submit.prevent="addBanner">
      <div class="field">
        <label class="label">Banner Name</label>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="Banner Name"
            required
            v-model="name"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">Banner Image URL</label>
        <div class="control has-icons-left has-icons-right">
          <input
            class="input"
            type="url"
            placeholder="Banner Image"
            v-model="img_url"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-images"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <label class="label">Is it going to active?</label>
        <div class="control">
          <label class="radio">
            <input
              type="radio"
              name="is_active"
              value="true"
              v-model="is_active"
            />
            Yes
          </label>
          <label class="radio">
            <input
              type="radio"
              name="is_active"
              value="false"
              v-model="is_active"
            />
            No
          </label>
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button type="submit" class="button is-link">Submit</button>
        </div>
        <div class="control">
          <button class="button is-link is-light">
            <router-link to="/home/banners">Cancel</router-link>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      img_url: "",
      is_active: false,
    };
  },
  methods: {
    addBanner() {
      this.$store.dispatch("addBanner", {
        name: this.name,
        is_active: this.is_active,
        img_url: this.img_url,
      });
    },
  },
};
</script>

<style>
</style>