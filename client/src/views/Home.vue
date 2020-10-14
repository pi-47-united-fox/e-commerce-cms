<template>
  <div class="home-page">
    <NavBar />
    <div class="container my-1">
      <div class="columns">
        <SideBar />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

export default {
  name: "Home",
  components: {
    NavBar,
    SideBar,
  },
};
</script>

<style></style>
