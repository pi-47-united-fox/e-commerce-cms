<template>
  <div>
    <Navbar></Navbar>
    <div class="columns" id="main-dashboard-container">
      <!---SIDEBAR-->
      <Sidebar></Sidebar>
      <!--MAIN DASHBOARD AREA-->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// Belum bisa kak belum bisa nested routes.. :D
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList"
import AddProductForm from "../components/AddProductForm"
import EditProductForm from "../components/EditProductForm"

export default {
  name: "Dashboard",
  components: {
    Sidebar,
    Navbar,
    ProductList,
    AddProductForm,
    EditProductForm
  },
};
</script>

<style>
</style>