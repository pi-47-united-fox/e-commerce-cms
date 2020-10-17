<template>
  <div class="home">
    <PopUpAdd v-if="showPopUpAdd === true" @emitClosePopAdd="popAddStatus" />
    <PopUpEdit
      v-if="showPopUpEdit === true"
      @emitClosePopEdit="popEditStatus"
    />
    <ContainerLeft />
    <ContainerRight
      @emitShowPopAdd="popAddStatus"
      @emitEditProducts="popEditStatus"
    />
  </div>
</template>

<script>
// @ is an alias to /src
// import Login from '../views/Login'
import ContainerLeft from '@/components/ContainerLeft.vue'
import ContainerRight from '@/components/ContainerRight.vue'
import PopUpAdd from '@/components/PopUpAdd.vue'
import PopUpEdit from '@/components/PopUpEdit.vue'

export default {
  name: 'Home',
  components: {
    // Login,
    ContainerLeft,
    ContainerRight,
    PopUpAdd,
    PopUpEdit
  },
  data () {
    return {
      showPopUpAdd: false,
      showPopUpEdit: false
    }
  },
  methods: {
    popAddStatus (status) {
      console.log(status)
      this.showPopUpAdd = status
    },
    popEditStatus (status) {
      console.log(status)
      this.showPopUpEdit = status
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
