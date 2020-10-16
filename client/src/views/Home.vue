<template>
  <div class="home">
    <div class="sidenavbar">
      <div class="logo">
        <img src="../assets/zambanlogo.svg" />
      </div>
      <div class="menu">
        <button class="logout-btn" @click="logOut">Logout</button>
      </div>
    </div>
    <div class="content">
      <div class="he-r">
  <button v-b-modal.modal-prevent-closing class="add-btn">Add Product</button>
      </div>
      <div class="cardcontent">
        <div class="container">
          <div class="row">
            <div class="col-sm">
              <Card></Card>
              <Card></Card>
            </div>
            <div class="col-sm">
              <Card></Card>
              <Card></Card>
            </div>
            <div class="col-sm">
              <Card></Card>
              <Card></Card>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal></Modal>
    <div>
</div>
  </div>
</template>

<script>
import Modal from '../components/add-modal'
import Card from '../components/card'
export default {
  name: 'Home',
  components: {
    Card,
    Modal
  },
  methods: {
    logOut () {
      localStorage.clear()
      // router.push({ path: 'Login' })
    }
  },
  created () {
    console.log('ini di home')
  }
}
</script>
