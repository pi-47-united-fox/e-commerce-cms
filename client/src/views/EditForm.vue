<template>
  <div class=" d-flex justify-content-center align-content-lg-center container">
 <Navbar/>
  <form @submit.prevent="editProduct">
    <div class="body"></div>
     <div class="header">
      <div class="bg-dark">Edit<span>Stock</span> <span>Coffe</span>Sodik</div>
    </div>
      <div class="login">
        <input type="text" v-model="dataEdit.name" placeholder="name"  /><br />
        <input type="text" v-model="dataEdit.image_url" placeholder="imagerUrl"  /><br />
        <input type="number" v-model="dataEdit.price" placeholder="Price"  /><br />
        <input type="number" v-model="dataEdit.stock" placeholder="Stock" /><br />
        <input type="submit" value="Edit" />
      </div>
    </form>

</div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
export default {
  name: 'editProduct',
  components: {
    Navbar
  },
  computed: {
    dataEdit () {
      return this.$store.state.dataEdit
    }
  },
  methods: {
    editProduct () {
      const payload = {
        id: this.$route.params.id,
        name: this.dataEdit.name,
        image_url: this.dataEdit.image_url,
        price: this.dataEdit.price,
        stock: this.dataEdit.stock
      }
      console.log(payload)
      this.$store.dispatch('editPage', payload)
        .then(({ data }) => {
          this.$router.push({ path: '/Product' })
        })
        .catch(err => {
          // const msg = err.response.data.errors
          console.log(err.response.data.errors)
        })
    }
  }
}
</script>

<style scoped>
.header {
  position: absolute;
  top: calc(25% - 35px);
  left: calc(58% - 255px);
  z-index: 2;
}
.header div {
  float: left;
  color: red;
  font-family: "Exo", sans-serif;
  font-size: 40px;
  font-weight: 300;
  /* background-color: black; */
}

.header div span {
  color:white !important;
}
.body {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  width: auto;
  height: auto;
  background-image: url("https://images.unsplash.com/photo-1525881157111-2379cbebbf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80");
  /* background-color: lightgray; */
  background-size: cover;
  -webkit-filter: blur(1px);
  z-index: 0;
}

.login {
  position: absolute;
  top: calc(40% - 75px);
  left: calc(40% - 50px);
  height: 200px;
  width: 350px;
  padding: 10px;
  z-index: 2;
}
.login input[type="text"] {
  width: 390px;
  height: 50px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 2px;
  color: red;
  font-family: "Exo", sans-serif;
  font-size: 16px;
  font-weight: 400;
  padding: 4px;
  margin-top: 3px;
}
.login input[type="number"] {
  width: 390px;
  height: 50px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 2px;
  color: red;
  font-family: "Exo", sans-serif;
  font-size: 16px;
  font-weight: 400;
  padding: 4px;
  margin-top: 3px;
}
.login input[type="submit"] {
  width: 390px;
  height: 50px;
  background: #fff;
  border: 1px solid white;
  cursor: pointer;
  border-radius: 2px;
  color: #a18d6c;
  font-family: "Exo", sans-serif;
  font-size: 16px;
  font-weight: 400;
  padding: 6px;
  margin-top: 10px;
}

.login input[type="submit"]:hover {
  opacity: 0.5;
}

.login input[type="submit"]:active {
  opacity: 0.6;
}
.login input[type="submit"]:focus {
  outline: none;
}
.login input[type="text"]:focus {
  outline: none;
  border: 1px solid rgba(2, 2, 2, 0.9);
}
.login input[type="number"]:focus {
  outline: none;
  border: 1px solid rgba(2, 2, 2, 0.9);
}

::-webkit-input-placeholder {
  color: rgba(7, 18, 19, 0.6);
}

::-moz-input-placeholder {
  color: rgba(7, 18, 19, 0.6);
}
</style>
