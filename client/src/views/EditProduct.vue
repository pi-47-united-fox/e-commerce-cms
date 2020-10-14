<template>
  <div>
    <Navbar></Navbar>
    <div class="columns" id="main-dashboard-container">
      <!---SIDEBAR-->
      <Sidebar></Sidebar>
      <!--MAIN DASHBOARD AREA-->
      <EditProductForm></EditProductForm>
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import EditProductForm from "../components/EditProductForm"

export default {
  name: "EditProduct",
  components: {
    Sidebar,
    Navbar,
    EditProductForm
  },
};
</script>

<style>
</style>