<template>
  <!-- <div class="card lm" style="width: 18rm">
    <div class="card-img">
      <img
        class="card-img-top "
        :src="products.image_url"
        alt="Card image cap"
      />
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ products.name }}</h5>
      <div class="ft-card">
        <div>
          <div>Price: {{ products.price }}</div>
          <div>Stock: {{ products.stock }}</div>
          <div>category</div>
        </div>
        <div style="display=flex   flex-direction: row;">
          <div>
            <button class="update-btn" @click.prevent="editProduct()">Update</button>
          </div>
          <div>
            <button
              class="delete-btn"
              @click.prevent="deleteProduct(products.id)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div> -->
  <div class="container">
    <div class="card-group">
      <div class="card" style="">
        <img class="card-img-top" :src="products.image_url" alt="Bologna" />
        <div class="card-body">
          <h4 class="card-title">{{ products.name }}</h4>
          <h6 class="card-subtitle mb-2">Price Rp.{{ products.price }}</h6>
          <h6 class="card-subtitle mb-2">Stock {{ products.stock }}</h6>
          <div class="btn-wraper">
          <button class="update-btn" @click.prevent="editProduct()">
            Update
          </button>
          <button
            class="delete-btn"
            @click.prevent="deleteProduct(products.id)"
          >
            Delete
          </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  props: ["products"],
  methods: {
    deleteProduct(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        iconColor: "#ea9292",
        showCancelButton: true,
        confirmButtonColor: "#ea9292",
        cancelButtonColor: " #7453b8;",
        confirmButtonText: "Yes, deleted it!",
      }).then((data) => {
        if (data.isConfirmed) {
          console.log(id, "<------ini id delete");
          this.$store.dispatch("deleteData", id);
          Swal.fire("Deleted!", "Your file has been deleted.", "Succedd");
        }
      });
    },
    editProduct() {
      let newData = {
        id: this.products.id,
        name: this.products.name,
        image_url: this.products.image_url,
        price: this.products.price,
        stock: this.products.stock,
      };
      console.log(newData);
      this.$store.commit("POLULATE_DATA_EDIT", newData);
      this.$router.push({ path: "Detail" });
    },
  },
};
</script>

<style>
</style>
