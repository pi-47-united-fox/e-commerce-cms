<template>
  <div class="card sm" style="width: 18rm">
     <img class="card-img-top" src="https://www.wilton.com/dw/image/v2/AAWA_PRD/on/demandware.static/-/Sites-wilton-project-master/default/dw2e5ac60f/images/project/WLRECIP-420/2105-6818_TaPaHa_44211-1.jpg?sw=800&sh=800" alt="Card image cap">
     <!-- <img class="card-img-top" src="https://images.ctfassets.net/2zhomj3d97uh/6QeZ4fIEB4zyZ6lcw0tRU4/6e29894fab9314b75941f7620c77a36b/summer-in-the-city.jpg?fm=jpg&fl=progressive" alt="Card image cap"> -->
    <!-- <img src="https://image.freepik.com/free-photo/woman-with-stylish-tracksuit-does-sports-does-exercises-yellow-tracksuit-blue-space_163305-7358.jpg" class="card-img-top" /> -->
    <div class="card-body">
      <h5 class="card-title">Product Title</h5>
      <div class="ft-card">
        <div>
          <div>Price: Rp 55.000</div>
          <div>Stock: 50</div>
          <div>category</div>
        </div>
        <div style="display=flex">
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
