<template>
  <div>
    <Navbar></Navbar>
    <div class="columns" id="main-dashboard-container">
      <!---SIDEBAR-->
      <Sidebar></Sidebar>
      <!--MAIN DASHBOARD AREA-->
      <AddProductForm></AddProductForm>
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AddProductForm from "../components/AddProductForm"

export default {
  name: "AddProduct",
  components: {
    Sidebar,
    Navbar,
    AddProductForm,
  },
};
</script>

<style>
</style>