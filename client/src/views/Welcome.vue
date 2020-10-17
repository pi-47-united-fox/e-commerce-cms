<template>
<div>
    <div class="bg">
    </div>
    <Navbar></Navbar>

</div>
</template>

<script>
import Navbar from '../components/Navbar'
export default {
    name: 'Welcome',
    components: {
        Navbar
    }
}
</script>

<style>
.bg {
  /* The image used */
  background-image: url('https://images.unsplash.com/photo-1510047908897-1dcfd002e636?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80');

  /* Half height */
  height: 50%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>