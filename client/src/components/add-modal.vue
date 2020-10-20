<template>
  <b-modal
    id="modal-prevent-closing"
    ref="modal"
    title="Submit Your Product"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleOk"
  >
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <b-form-group
        :state="nameState"
        label="Name"
        label-for="name-input"
        invalid-feedback="Product title is required"
      >
        <b-form-input
          id="title-input"
          v-model="name"
          :state="nameState"
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
      name: '',
      nameState: null,
      submittedName: [],
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
      this.nameState = valid
      // this.imageurlState = valid
      // this.priceState = valid
      // this.stockState = valid
      // return valid
    },

    resetModal () {
      this.name = ''
      this.nameState = null
      this.imageurl = ''
      this.imageurlState = null
      this.price = ''
      this.priceState = null
      this.stock = ''
      this.stockState = null
    },
    handleOk (bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit () {
      // console.log(this.name, this.image_eurl, this.price, this.stock)
      // Exit when the form isn't valid
      // if (!this.checkFormValidity()) {
      //   return
      // }
      // Push the name to submitted names
      this.$store.dispatch('addData', {
        name: this.name,
        imageurl: this.imageurl,
        price: this.price,
        stock: this.stock
      })
      this.submittedName.push(this.name)
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