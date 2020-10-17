<template>
  <div class="card sm" style="width: 18rm">
    <div class="card-img">
      <img
        class="card-img-top"
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
            <button
              class="update-btn"
              @click.prevent="$router.push({ path: 'Detail' })"
            >
              Update
            </button>
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
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  props: ['products'],
  methods: {
    deleteProduct (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        iconColor: '#ea9292',
        showCancelButton: true,
        confirmButtonColor: '#ea9292',
        cancelButtonColor: ' #7453b8;',
        confirmButtonText: 'Yes, deleted it!'
      }).then((data) => {
        console.log(id, '<------ini id delete')
        this.$store.dispatch('deleteData', id)
        Swal.fire('Deleted!', 'Your file has been deleted.', 'Succedd')
      })
    }
  }
}
</script>

<style>
</style>
