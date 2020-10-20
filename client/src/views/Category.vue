<template>
  <form
    class="bg-dark mx-auto text-primary my-5 py-5 px-3"
    @submit.prevent="changeDataPlayer"
  >
    <img
      :src="chosenPlayer.image_url"
      class="card-img-top crop-form"
      :alt="chosenPlayer.name"
    />
    <div class="form-group">
      <label for="name">Name</label>
      <input
        type="text"
        class="form-control"
        id="name"
        v-model="chosenPlayer.name"
      />
    </div>
    <div class="form-group">
      <label for="image_url">Image</label>
      <input
        type="text"
        class="form-control"
        id="image_url"
        v-model="chosenPlayer.image_url"
      />
    </div>
    <div class="form-group">
      <label for="price">Price</label>
      <input
        type="number"
        class="form-control"
        id="price"
        v-model="chosenPlayer.price"
      />
      <label for="category">Position</label>
      <input
        type="text"
        class="form-control"
        id="category"
        v-model="chosenPlayer.category"
      />
    </div>
    <button type="submit" class="btn btn-primary">Edit Player</button>
  </form>
</template>

<script>
export default {
  name: 'editPlayer',
  data () {
    return {}
  },
  methods: {
    changeDataPlayer () {
      const input = {
        id: this.chosenPlayer.id,
        name: this.chosenPlayer.name,
        image_url: this.chosenPlayer.image_url,
        price: this.chosenPlayer.price,
        category: this.chosenPlayer.category
      }
      this.$store.dispatch('editPlayer', input)
      this.$router.push({ path: '/footballPlayers' })
    }
  },
  computed: {
    chosenPlayer () {
      return this.$store.state.chosenPlayer
    }
  }
}
</script>
<style>
.crop-form {
  padding: 5px;
  width: 232px;
  height: 335px;
  overflow: hidden;
}
</style>
