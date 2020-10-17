<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/detail">Detail</router-link>
      <router-link to="/notfound">404</router-link> -->
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  namee: 'App',
  components: {},
  data () {
    return {
      // isLogin: false
    }
  },
  methods: {},
  crreated () {
    console.log('ini creaated <--------')
  }
}
</script>

<style>
body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: #f9f9f9;
  overflow-x: hidden;
}

.back-btn-c {
  background-color: transparent;
  border-width: 0px;
}
.back-btn {
  height: 30px;
}
.nav-btn {
  background-color: #5978d5;
  color: white;
  border-width: 0px;
  font-size: 18px;
  padding: 5px;
}
.nav-btn:hover {
  background-color: white;
  color: #5978d5;
}
.menu {
  justify-content: space-between;
  display: flex;
  flex-direction: column;
}
.detail-text {
  background-color: #5978d5;
  border-width: 0px;
  padding: 10px;
  width: 300px;
  color: white;
  border-radius: 10px;
}
.detail-pic {
  height: 60vh;
}
.detail-item {
  padding: 50px;
}
.detail {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
}
.cancel-btn {
  background-color: #ea9292;
  color: white;
  margin: 5px;
  border-radius: 10px;
  border-width: 0px;
  padding: 3px 10px 3px 10px;
}
.submit-btn {
  background-color: #5978d5;
  color: white;
  margin: 5px;
  border-radius: 10px;
  border-width: 0px;
  padding: 3px 10px 3px 10px;
}
.btn-login {
  margin-top: 35px;
  background-color: white;
  height: 40px;
  width: 200px;
  border: 0px;
  border-radius: 20px;
  font-weight: bold;
  color: #5978d5;
}
.text {
  padding: 15px;
  border: 0px;
  border-radius: 20px;
  /* padding-left: 15px;
  padding-bottom: 5px;
  padding-top: 5px; */
}
.input {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
}
.label {
  color: white;
  font-size: large;
}
.login {
  margin-top: 80px;
  background-color: #5978d5;

  display: flex;
  width: 350px;
  height: 500px;
  flex-direction: column;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 10px 14px 36px -4px rgba(184, 184, 184, 1);
}
.ft-card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.card {
  margin: 20px;
  border-radius: 10px;
}
.cardcontent {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.sidebar {
  background-color: #5978d5;
  width: 10%;
  height: 100vh;
  position: fixed;
}
.content {
  background-color: #f5f5f5;
}
.logo {
  padding: 30px;
  display: flex;
  justify-content: center;
}
.home {
  display: flex;
  flex-direction: row;
}
.he-r {
  display: flex;
  justify-content: flex-end;
  padding: 30px;
}
.update-btn {
  padding: 5px;
  background-color: #5978d5;
  border-radius: 10px;
  color: white;
  border-width: 0;
}
.delete-btn {
  margin-top: 10px;
  padding: 5px;
  background-color: #ea9292;
  border-radius: 10px;
  color: white;
  border-width: 0;
}
.add-btn {
  width: 130px;
  height: 40px;
  background-color: #5978d5;
  border-radius: 10px;
  border-width: 0px;
  color: white;
  font-size: 14px;
  position: fixed;
}
.card-img-top{
  height: 200px;
  width:fit-content;
}
.card-img{
  height: 200px;
}
.content {
  display: flex;
  width: 100vw;
  flex-direction: column;
  min-height: 100vh;
}
/* -------SIDEBAR-------- */

</style>
