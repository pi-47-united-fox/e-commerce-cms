<template>
  <!-- spectators (option) -->
  <div class="spectators">
    <div class="spectators-card">
      <h2>Selles</h2>
      <i class="fa fa-user"> 200</i>
      <p>month</p>
    </div>
    <div class="spectators-card">
      <h2>Top Items</h2>
      <i class="fa fa-trophy"> MTB</i>
      <p>month</p>
    </div>
    <div class="spectators-card">
      <h2>Revenue</h2>
      <i class="fa fa-money">$120000</i>
      <p>month</p>
    </div>
    <div class="spectators-card">
      <h2>Total Items</h2>
      <i class="fa fa-user"> 20 Products</i>
      <p>month</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Spectators'
}
</script>

<style>
.spectators {
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.spectators-card {
  width: 24%;
  height: 80%;
  background-color: #212121;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.spectators-card p,
h2,
i {
  margin-left: 0px;
}
.spectators-card h2 {
  font-size: 1.5rem;
  font-weight: bolder;
  color: whitesmoke;
}

.spectators-card i {
  font-size: 2rem;
  font-weight: bolder;
  color: whitesmoke;
}
</style>
