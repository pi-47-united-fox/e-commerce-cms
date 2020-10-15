<template>
<v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :search="search"
      :headers="headers"
      :items="banners"
      :items-per-page="10"
      :single-select="singleSelect"
      item-key="name"
      show-select
      class="elevation-2"
    >
      <!-- Table above Header -->
      <template v-slot:top>
        <v-toolbar class="elevation-1">
          <v-switch
            v-model="singleSelect"
            label="Single select"
            class="mt-5"
          ></v-switch>
          <v-spacer></v-spacer>
          <v-toolbar-title>All Banner</v-toolbar-title>
          <v-spacer></v-spacer>
            <v-btn
              color="primary"
              dark
              class="mb-2"
              @click="addBannerForm"
            >
              Add Banner
            </v-btn>
        </v-toolbar>

      </template>

      <!-- Image Data -->
      <template v-slot:[`item.image_url`]="{ item }">
        <v-img
          :src="item.image_url"
          :lazy-src="item.image_url"
          max-height="200"
          max-width="300"
        ></v-img>
      </template>

      <!-- Action Edit Delete -->
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          size="30"
          class="mr-2"
          @click="editBannerForm(item.id)"
        >
          mdi-pencil-box
        </v-icon>
        <v-icon
          size="30"
          @click="deleteItemConfirm(item.id)"
        >
          mdi-delete
        </v-icon>
        <!-- {{ item.id }} -->
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: 'Banners',
  data () {
    return {
      search: '',
      singleSelect: false,
      selected: [],
      headers: [
        {
          text: 'Header Image',
          align: 'start',
          sortable: false,
          value: 'image_url'
        },
        { text: 'Title', value: 'title' },
        { text: 'Description', value: 'description' },
        { text: 'Is Active', value: 'isActive' },
        { text: 'Actions', value: 'actions' }
      ]
    }
  },
  computed: {
    banners () {
      return this.$store.state.banners
    }
  },
  methods: {
    fetchBanners () {
      this.$store.dispatch('fetchBanners')
    },
    editBannerForm () {
      //
    },
    deleteItemConfirm () {
      //
    },
    addBannerForm () {
      //
    }
  },
  created () {
    this.fetchBanners()
  }
}
</script>

<style>

</style>
