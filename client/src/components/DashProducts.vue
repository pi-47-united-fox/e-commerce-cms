<template>
    <v-data-table
        :headers="headers"
        :items="products"
        :items-per-page="10"
        :single-select="singleSelect"
        item-key="name"
        show-select
        class="elevation-2"
    >
        <template v-slot:top>
      <v-switch
        v-model="singleSelect"
        label="Single select"
        class="pa-3"
      ></v-switch>
    </template>
    </v-data-table>

</template>

<script>
export default {
  data () {
    return {
      singleSelect: false,
      selected: [],
      headers: [
        {
          text: 'Product Image',
          align: 'start',
          sortable: false,
          value: 'image_url'
        },
        { text: 'Name', value: 'name' },
        { text: 'Price', value: 'price' },
        { text: 'Stock', value: 'stock' },
        { text: 'Category', value: 'category' }
      ],
      products: [
        //
      ]
    }
  },
  computed: {
  }
}
</script>

<style>

</style>
