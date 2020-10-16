<template>
  <b-modal
    id="modal-prevent-closing"
    ref="modal"
    title="Submit Your Name"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleOk"
  >
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <b-form-group
        :state="titleState"
        label="Title"
        label-for="title-input"
        invalid-feedback="Product title is required"
      >
        <b-form-input
          id="title-input"
          v-model="title"
          :state="titleState"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        :state="imageurlState"
        label="imageurl"
        label-for="imageulr-input"
        invalid-feedback="Image url is required"
      >
        <b-form-input
          id="imageurl-input"
          v-model="imageurl"
          :state="imageurlState"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        :state="priceState"
        label="price"
        label-for="price-input"
        invalid-feedback="Price is required"
      >
        <b-form-input
          id="price-input"
          v-model="price"
          :state="priceState"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        :state="stockState"
        label="stock"
        label-for="stock-input"
        invalid-feedback="Stock is required"
      >
        <b-form-input
          id="stock-input"
          v-model="stock"
          :state="stockState"
          required
        ></b-form-input>
      </b-form-group>
    </form>
  </b-modal>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      titleState: null,
      submittedTitle: [],
      imageurl: '',
      imageurlState: null,
      submittedImageurl: [],
      price: '',
      priceState: null,
      submittedPrice: [],
      stock: '',
      stockState: null,
      submittedStock: []
    }
  },
  methods: {
    checkFormValidity () {
      const valid = this.$refs.form.checkValidity()
      console.log(valid)
      this.titleState = valid
      // this.imageurlState = valid
      // this.priceState = valid
      // this.stockState = valid
      // return valid
    },

    resetModal () {
      this.title = ''
      this.titleState = null
      // this.imageurl = ''
      // this.imageurlState = null
      // this.price = ''
      // this.priceState = null
      // this.stock = ''
      // this.stockState = null
    },
    handleOk (bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit () {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      // Push the name to submitted names
      this.submittedTitle.push(this.title)
      // this.submittedImageurl.push(this.imageurl)
      // this.submittedPrice.push(this.price)
      // this.submittedStock.push(this.stock)
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
      })
    }
  }
}
</script>

<style>
</style>
