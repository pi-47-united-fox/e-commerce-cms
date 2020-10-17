<template>
  <div class="home">
    <Homepage></Homepage>
  </div>
</template>

<script>
// @ is an alias to /src
import Homepage from '../components/Homepage'
import router from '../router'

export default {
  name: 'Home',
  components: {
    Homepage
  },
  created () {
    if(!localStorage.access_token){
      router.push({path:'/login'})
    }
  }
}
</script>
