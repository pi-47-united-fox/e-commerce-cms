<template>
  <form
    class="bg-dark mx-auto text-primary my-5 py-5 px-3"
    @submit.prevent="addPlayer"
  >
    <div class="form-group">
      <label for="name">Player Name</label>
      <input type="text" class="form-control" id="name" v-model="name" />
    </div>
    <div class="form-group">
      <label for="image_url">Image</label>
      <input
        type="text"
        class="form-control"
        id="image_url"
        v-model="image_url"
      />
    </div>
    <div class="form-group">
      <label for="price">Price</label>
      <input type="number" class="form-control" id="price" v-model="price" />
      <label for="category">Position</label>
      <input
        type="text"
        class="form-control"
        id="category"
        v-model="category"
      />
    </div>
    <button type="submit" class="btn btn-primary">Add Player</button>
  </form>
</template>

<script>
export default {
  name: "addPlayer",
  data() {
    return {
      name: "",
      image_url: "",
      price: null,
      category: "",
    };
  },
  methods: {
    addPlayer() {
      let input = {
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        category: this.category,
      };
      this.$store.dispatch("addPlayer", input);
      this.$router.push({ path: "/footballPlayers" });
    },
  },
};
</script>

<style>
</style>