<template>
  <div class="card sm" style="width: 18rem">
    <img src="https://image.freepik.com/free-photo/woman-with-stylish-tracksuit-does-sports-does-exercises-yellow-tracksuit-blue-space_163305-7358.jpg" class="card-img-top" />
    <div class="card-body">
      <h5 class="card-title">Product Title</h5>
      <div class="ft-card">
        <div>
          <div>Price: Rp 55.000.000</div>
          <div>Stock: 50</div>
          <div>category</div>
        </div>
        <div>
            <button class="update-btn" @click.prevent="$router.push({path:'Detail'})">Update</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>
