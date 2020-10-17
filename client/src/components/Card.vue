<template>
    <div class="col-lg-3 col-md-6 mb-4 mb-lg-0">
      <!-- Card-->
      <div id="card-flex" class="container d-flex flex-row">
        <div class="card rounded shadow-sm border-0">
          <div class="card-body p-4">
            <img
              :src="allData.image_url"
              class="img-fluid d-block mx-auto mb-3"
            />
            <h1>
              <a href="" class="text-dark" @click.prevent="toDetailPage(allData.name)">{{ allData.name }}</a>
            </h1>
            <ul class="list-inline small">
              <li class="list-inline-item m-0">
                <i class="fa fa-star text-success"></i>
              </li>
              <li class="list-inline-item m-0">
                <i class="fa fa-star text-success"></i>
              </li>
              <li class="list-inline-item m-0">
                <i class="fa fa-star text-success"></i>
              </li>
              <li class="list-inline-item m-0">
                <i class="fa fa-star text-success"></i>
              </li>
              <li class="list-inline-item m-0">
                <i class="fa fa-star-o text-success"></i>
              </li>
            </ul>
            <button
              type="button"
              class="btn btn-primary"
              style="margin-right: 3px"
              @click.prevent="toEditPage(allData.id)"
            >
              Edit
            </button>
            <button type="button" class="btn btn-danger"
            @click.prevent="deleteHandler(allData.id)">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['allData'],
  components: {},
  methods: {
    toEditPage (id) {
      this.$router.push({ path: `/editForm/${id}` })
    },
    toDetailPage (name) {
      this.$router.push({ path: `/detail/${name}` })
    },
    deleteHandler (id) {
      this.$store.dispatch('deleteHandler', id)
    }
  }
}
</script>

<style>
body {
  min-height: 100vh;
  background: #fafafa;
}

#card-flex {
  display: flex;
}

.social-link {
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  border-radius: 50%;
  transition: all 0.3s;
  font-size: 0.9rem;
}

.social-link:hover,
.social-link:focus {
  background: #ddd;
  text-decoration: none;
  color: #555;
}

.progress {
  height: 10px;
}
</style>
