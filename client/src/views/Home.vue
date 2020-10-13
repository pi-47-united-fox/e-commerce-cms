<template>
  <div class="home">
    <div class="sidenavbar">
      <div class="logo">
        <img src="../assets/zambanlogo.svg" />
      </div>
      <div></div>
    </div>
    <div class="content">
      <div class="he-r">
        <button class="add-btn " @click.prevent="$router.push({name:'Detail'})">Add Product</button>
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
  </div>
</template>

<script>
import Card from '../components/card'
export default {
  name: 'Home',
  components: {
    Card
  }
}
</script>
