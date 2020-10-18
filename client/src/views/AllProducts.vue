<template>
  <div>
    <Navbar></Navbar>
    <div class="columns" id="main-dashboard-container">
      <!---SIDEBAR-->
      <Sidebar></Sidebar>
      <!--MAIN DASHBOARD AREA-->
      <ProductList></ProductList>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import ProductList from '../components/ProductList'

export default {
  name: 'Products',
  components: {
    Sidebar,
    Navbar,
    ProductList
  }
}
</script>

<style>
</style>
