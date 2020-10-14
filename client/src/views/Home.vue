<template>
  <div class="home-page">
    <NavBar />
    <div class="container my-1">
      <div class="columns">
        <SideBar />
        <ShowAllTable />
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import ShowAllTable from "../components/ShowAllTable";

export default {
  name: "Home",
  components: {
    NavBar,
    SideBar,
    ShowAllTable,
  },
};
</script>

<style></style>
