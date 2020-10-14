<template>
  <div class="container-notfound">
    <i class="fa fa-heart-broken"></i>
    <h1>404 Oopps!</h1>
    <p>
      go back to <a href="#" @click="router.push({ path: '/' })">Homepage</a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style>
.container-notfound {
  widows: 100%;
  height: 900px;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
}

.container-notfound i {
  font-size: 5rem;
  color: rgb(172, 5, 5);
}
.container-notfound h1 {
  font-size: 2rem;
  color: white;
  font-weight: bold;
}
</style>
