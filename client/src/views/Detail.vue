<template>
  <div class="container">
    <h1>Detail Page
    </h1>
    <div class="row">
      <!-- Card-->
      <div class="col-6">
        <div class="card rounded shadow-sm border-0" style="width: 18rem">
          <div class="card-body p-4">
            <img
              :src="result.image_url"
              class="img-fluid d-block mx-auto mb-3"
            />
            <h1>
              <span href="" class="text-dark">{{ result.name }}</span>
            </h1>
          </div>
        </div>
      </div>
      <div class="col-6">
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Price</th>
              <th scope="col">Stock</th>
              <th scope="col">Category</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{{result.price.toLocaleString()}}</th>
              <td>{{result.stock}}</td>
              <td>{{result.category}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
export default {
  name: "Detail",
  created() {
    this.$store.dispatch("findByName", this.$route.params.name);
  },
  computed: {
    result() {
      return this.$store.state.findByName;
    },
  },
  components: {
    Navbar,
  },
};
</script>

<style>
</style>
