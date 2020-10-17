<template>
  <div class="column is-9">
    <h1 class="title has-text-centered">List of all Banners</h1>
    <div class="columns banner-col" v-for="banner in banners" :key="banner.id">
      <div class="card column">
        <div class="card-image">
          <figure class="image is-3by1">
            <img :src="banner.img_url" alt="banner picture" />
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">{{ banner.name }}</p>
            </div>
            <p v-if="banner.is_active" class="title is-4">Is It Active: Yes</p>
            <p v-else class="title is-4">Is It Active: No</p>
          </div>
        </div>
        <footer class="card-footer">
          <a
            v-if="banner.is_active"
            class="card-footer-item"
            @click.prevent="editBanners(false, banner.id)"
            >Change Status</a
          >
          <a
            v-else
            class="card-footer-item"
            @click.prevent="editBanners(true, banner.id)"
            >Change Status</a
          >
          <a class="card-footer-item" @click.prevent="deleteBanner(banner.id)">Delete</a>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getBanners() {
      this.$store.dispatch("getBanners");
    },
    editBanners(status, id) {
      this.$store.dispatch("changeStatus", { id, data: status });
    },
    deleteBanner(id) {
      this.$store.dispatch("deleteBanner", id);
    }
  },
  computed: {
    banners() {
      return this.$store.state.banners;
    },
  },
  created() {
    this.getBanners();
  },
};
</script>

<style>
.banner-col {
  margin: 40px 10px;
}
</style>