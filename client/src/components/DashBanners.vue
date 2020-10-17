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
          <v-toolbar-title>Total: {{banners.length}} Banner</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Add Banner
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.title"
                        label="Name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.image_url"
                        label="Image Url"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        type="textarea"
                        v-model="editedItem.description"
                        label="Description"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        type="boolean"
                        v-model="editedItem.isActive"
                        label="isActive"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete this banner from list?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
          @click="editItem(item)"
        >
          mdi-pencil-box
        </v-icon>
        <v-icon
          size="30"
          @click="deleteItem(item)"
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
      snackbar: false,
      infoSnack: '',
      search: '',
      dialog: false,
      dialogDelete: false,
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
      ],
      editedIndex: -1,
      editedItem: {
        id: 0,
        image_url: '',
        title: '',
        description: '',
        isActive: false
      },
      defaultItem: {
        id: 0,
        image_url: '',
        title: '',
        description: '',
        isActive: false
      }
    }
  },
  computed: {
    banners () {
      return this.$store.state.banners
    },
    formTitle () {
      return this.editedIndex === -1 ? 'Add Banner' : 'Edit Banner'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },
  methods: {
    fetchBanners () {
      this.$store.dispatch('fetchBanners')
    },
    deleteItemConfirm () { // call vuex
      this.$store.dispatch('deleteBanner', this.editedItem.id)
      // this.banners.splice(this.editedIndex, 1)
      this.closeDelete()
      this.infoSnack = 'Banner Deleted'
      this.snackbar = true
    },
    deleteItem (item) {
      this.editedIndex = this.banners.indexOf(item)
      this.editedItem = Object.assign({}, item)

      this.dialogDelete = true
    },
    editItem (item) {
      console.log(item)
      this.editedIndex = this.banners.indexOf(item)
      this.editedItem = Object.assign({}, item)
      console.log('this.editedItem', this.editedItem)
      this.dialog = true
    },
    close () {
      this.dialog = false
      this.$nextTick(() => { // for update DOM
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save () {
      if (this.editedIndex > -1) { // call vuex edit
        this.$store.dispatch('editBanner', this.editedItem)
          .then(() => {
            this.close()
            this.infoSnack = 'Success Edited Banner'
            this.snackbar = true
          })
      } else { // call vuex add
        this.$store.dispatch('addBanner', this.editedItem)
          .then(() => {
            this.close()
            this.infoSnack = 'Success Added Banner'
            this.snackbar = true
          })
      }
      // this.close()
    }
  },
  created () {
    this.fetchBanners()
  }
}
</script>

<style>

</style>
