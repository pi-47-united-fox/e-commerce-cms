<template>
  <!--Add task pop up-->
  <div class="add-task">
    <h2>Add Products</h2>
    <form>
      <fieldset class="uk-fieldset">
        <legend class="uk-legend">Legend</legend>

        <div class="uk-margin">
          <input class="uk-input" type="text" placeholder="Name" />
        </div>

        <div class="uk-margin">
          <input class="uk-input" type="number" placeholder="Stock" />
        </div>

        <div class="uk-margin">
          <input class="uk-input" type="number" placeholder=" Rp .Price" />
        </div>

        <div class="uk-margin">
          <select class="uk-select">
            <option>All Mountain</option>
            <option>Cross Country</option>
            <option>City Bike</option>
          </select>
        </div>

        <div class="uk-margin">
          <textarea
            class="uk-textarea"
            rows="5"
            placeholder="Description"
          ></textarea>
        </div>
      </fieldset>
    </form>
    <button class="uk-button uk-button-secondary">Submit</button>
    <button class="uk-button uk-button-default" @click="closePopAdd">
      Cancel
    </button>
  </div>
</template>

<script>
export default {
  name: 'PopAdd',
  methods: {
    closePopAdd () {
      console.log('emit shiow pop add dari CR')
      this.$emit('emitClosePopAdd', false)
    }
  },
  computed: {
    products () {
      return this.state.inputData
    }
  },
  created () {
    this.$store.dispatch('ADD_DATA')
  }
}
</script>

<style>
.add-task {
  margin: 0 auto;
  width: 40%;
  height: auto;
  background-color: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  border-radius: 10px;
  display: absolute;
  padding: 20px;
  position: absolute;
  -webkit-box-shadow: 1px 4px 33px 9px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 1px 4px 33px 9px rgba(0, 0, 0, 0.2);
  box-shadow: 1px 4px 33px 9px rgba(0, 0, 0, 0.2);
}
</style>
