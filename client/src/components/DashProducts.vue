<template>
  <v-card>
    <v-card-title class="elevation-3">
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        fixed-header
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :loading="loading"
      :search="search"
      :headers="headers"
      :items="products"
      :items-per-page="10"
      :single-select="singleSelect"
      item-key="id"
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
          <v-toolbar-title>All Product</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Item
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
                        v-model="editedItem.name"
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
                        v-model="editedItem.Category.categoryName"
                        label="CategoryId"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        type="number"
                        v-model="editedItem.price"
                        label="price"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        type="number"
                        v-model="editedItem.stock"
                        label="Stock"
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
                >Are you sure you want to delete this item?</v-card-title
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
          max-height="100"
          max-width="100"
        ></v-img>
      </template>

      <!-- Action E D -->
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon size="30" class="mr-2" @click="editItem(item)">
          mdi-pencil-box
        </v-icon>
        <v-icon size="30" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
        <!-- {{ item.id }} -->
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: 'Products',
  data () {
    return {
      dialog: false,
      dialogDelete: false,
      loading: true,
      search: '',
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
        { text: 'Category', value: 'Category.categoryName' },
        { text: 'Actions', value: 'actions' }
      ],
      editedIndex: -1,
      editedItem: {
        id: 0,
        name: '',
        image_url: '',
        price: 0,
        stock: 0,
        Category: {} || ''
      },
      defaultItem: {
        id: 0,
        name: '',
        image_url: '',
        price: 0,
        stock: 0,
        Category: {} || ''
      }
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    },
    formTitle () {
      return this.editedIndex === -1 ? 'Add Prouct' : 'Edit Product'
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
    fetchProducts () {
      this.$store.dispatch('fetchProducts').then(() => {
        this.loading = false
      })
    },
    deleteItemConfirm () {
      this.$store.dispatch('deleteProduct', this.editedItem.id)
      this.products.splice(this.editedIndex, 1)
      this.closeDelete()
    },
    deleteItem (item) {
      this.editedIndex = this.products.indexOf(item)
      this.editedItem = Object.assign({}, item)

      this.dialogDelete = true
    },
    editItem (item) {
      this.editedIndex = this.products.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
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
      if (this.editedIndex > -1) {
        this.$store.dispatch('editProduct', this.editItem)
        // Object.assign(this.products[this.editedIndex], this.editedItem);
      } else {
        this.$store.dispatch('addProduct', this.editedItem)
        // this.products.push(this.editedItem);
      }
      this.close()
    }
  },
  created () {
    this.fetchProducts()
  }
}
</script>

<style></style>
