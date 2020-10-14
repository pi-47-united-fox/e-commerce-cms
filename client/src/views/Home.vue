<template>
  <div class="home">
    <PopUpAdd v-if="showPopUpAdd === true" @emitClosePopAdd="popAddStatus" />
    <ContainerLeft />
    <ContainerRight @emitShowPopAdd="popAddStatus" />
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '../views/Login'
import ContainerLeft from '@/components/ContainerLeft.vue'
import ContainerRight from '@/components/ContainerRight.vue'
import PopUpAdd from '@/components/PopUpAdd.vue'

export default {
  name: 'Home',
  components: {
    Login,
    ContainerLeft,
    ContainerRight,
    PopUpAdd
  },
  data () {
    return {
      showPopUpAdd: false
    }
  },
  methods: {
    popAddStatus (status) {
      console.log(status)
      console.log('Home dari emit pop add')
      this.showPopUpAdd = status
    }
  }
}
</script>

<style>
html {
  overflow: scroll;
}
::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* make scrollbar transparent */
}
.home {
  display: flex;
  justify-content: center;
  background: #000000;
  padding: 40px;
}
</style>
