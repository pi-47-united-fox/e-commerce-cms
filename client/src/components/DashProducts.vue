<template>
  <v-card>
    <v-card-title class="elevation-3">
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :loading="loading"
      :search="search"
      :headers="headers"
      :items="products"
      :items-per-page="15"
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
          <v-toolbar-title>Total: {{products.length}} Products</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Add Product
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-alert
                    v-if="invalidInput"
                    dense
                    outlined
                    type="error"
                  >
                    Input <strong>Price</strong> or <strong>Stock</strong> Invalid
                  </v-alert>
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
                        label="Category"
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
                >Are you sure you want to delete this product from list?</v-card-title
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

    <v-snackbar
      v-model="snackbar"
      timeout=5000
      color="primary"
      right
    >
      {{ infoSnack }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
export default {
  name: 'Products',
  data () {
    return {
      invalidInput: false,
      snackbar: false,
      infoSnack: '',
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
        .then(() => {
          this.closeDelete()
          this.infoSnack = 'Product Deleted'
          this.snackbar = true
        })
      // this.products.splice(this.editedIndex, 1) moved to vuex
    },
    deleteItem (item) {
      this.editedIndex = this.products.indexOf(item)
      this.editedItem = Object.assign({}, item)

      this.dialogDelete = true
    },
    editItem (item) {
      console.log(item)
      this.editedIndex = this.products.indexOf(item)
      this.editedItem = Object.assign({}, item)
      console.log('this.editedItem', this.editedItem)
      this.dialog = true
    },
    close () {
      this.dialog = false
      this.invalidInput = false
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
      if (this.editedIndex > -1) {
        // console.log ('if', this.editItem)
        if (this.editedItem.price < 0 || this.editedItem.stock < 0) {
          this.invalidInput = true
        } else {
          this.$store.dispatch('editProduct', this.editedItem)
            .then(() => {
              this.invalidInput = false
              this.close()
              this.infoSnack = 'Success Edited Product'
              this.snackbar = true
            })
        }
      } else {
        // console.log ('else', this.editedItem)
        if (this.editedItem.price < 0 || this.editedItem.stock < 0) {
          this.invalidInput = true
        } else {
          this.$store.dispatch('addProduct', this.editedItem)
            .then(() => {
              this.close()
              this.infoSnack = 'Success Added Product'
              this.snackbar = true
            })
        }
      }
      // this.close()
    }
  },
  created () {
    this.fetchProducts()
  }
}
</script>

<style></style>
