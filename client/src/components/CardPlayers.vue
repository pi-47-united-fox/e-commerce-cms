<template>
  <div class="container">
    <div class="row">
      <div class="col-4 my-5" v-for="player in players" :key="player.id">
        <div class="card" style="width: 18rem">
          <div class="crop">
            <img
              :src="player.image_url"
              class="card-img-top"
              :alt="player.name"
            />
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ player.name }}</h5>
            <table class="table table-sm table-dark">
              <tbody>
                <tr>
                  <td>Price:</td>
                  <td>€ {{ player.price.toLocaleString("eur") }}</td>
                </tr>
                <tr>
                  <td>Position:</td>
                  <td>{{ player.category }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {},
  created() {
    this.$store.dispatch("fetchProducts");
  },
  computed: {
    players() {
      return this.$store.state.players;
    },
  },
};
</script>

<style>
.crop {
  padding: 5px;
  width: 286px;
  height: 353px;
  overflow: hidden;
}
</style>