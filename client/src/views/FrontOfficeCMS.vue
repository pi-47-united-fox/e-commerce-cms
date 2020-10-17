<template>
  <div class="home "> 
    <hr>
    <h2 class="">List of Products</h2> 
    <hr>
    <!-- <form @submit.prevent=""> -->
      <div class="alert alert-warning alert-dismissible fade show" v-if="this.$store.state.errMessage.length > 0" role="alert">
        {{this.$store.state.errMessage}}
        <button type="button" class="close" @click="clearError" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="row ml-2">
        <div class="form-group row mr-2">
          <label for="bannerName" class="col-sm-3 col-form-label">Name :</label>
          <div class="col-sm-9"  style="margin-left:-10px;">
            <input type="text" class="form-control" id="bannerName" v-model="bannerName" placeholder="Independence-Day-Banner">
          </div>
        </div>
        <div class="form-group row mr-2">
          <label for="bannerUrl" class="col-sm-4 col-form-label">Image Url :</label>
          <div class="col-sm-8" style="margin-left:-25px;">
            <input type="text" class="form-control" id="bannerUrl" v-model="bannerUrl" placeholder="Independence-Day-Banner.jpeg">
          </div>
        </div>
        <div class="form-group row mr-2" style="">
            <div class="col-sm-2">
              <input class="form-check-input" type="checkbox" v-model="isActive" >
            </div>
          <label class="col-sm-10 form-check-label" for="defaultCheck1" >Active</label>
        </div> 
        <button class="float-right m-2 btn btn-info" v-if="editForm == false" @click="addBanner">Add New Banner</button>
        <button class="float-right m-2 btn btn-info" v-if="editForm == true" @click="editBanner">Edit Banner</button>
        <button class="float-right m-2 btn btn-outline-info" @click="clearForm">Clear</button>
        <button class="float-right m-2 btn btn-outline-danger" v-if="editForm == true" @click="cancelForm">Cancel Edit</button>
      </div>
    <!-- </form> --> 
    <table class="table">
      <thead class="thead-light">
        <tr>
          <th scope="col">No</th>
          <th scope="col">Name</th> 
          <th scope="col">Image</th> 
          <th scope="col">isActive</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody> 
        <!-- <tr v-for="(banner, i) in this.$store.state.banners" :key="i">
          <td>{{i+1}}</td>
          <td> {{banner.name}} </td>
          <td> <img src="{{banner.image_url)}}" alt=""> </td>
          <td></td>
          <td></td>
        </tr> -->
          <TableRow v-for="(banner, count) in this.$store.state.banners" :key="count" 
            :banner="banner"
            :count="count"
            @editData="populateForm"
          >
          </TableRow> 
      </tbody>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import TableRow from '@/components/RowTableBanner.vue'


export default {
  name: 'Home',
  components: { 
    TableRow
  },
  data () {
    return {
      id:'',
      bannerName:'',
      bannerUrl:'',
      isActive:false,
      editForm:false
    }
  },
  methods: {
    addBanner () { 
      this.$store.dispatch('addBanner', {
        name:this.bannerName,
        image_url:this.bannerUrl,
        isActive:this.isActive
      })
      this.clearForm()
    },
    editBanner () { 
      console.log("edit");
      this.$store.dispatch('editBanner', {
        id:this.id,
        newData :{
          name:this.bannerName,
          image_url:this.bannerUrl,
          isActive:this.isActive
        }
      })
      this.cancelForm() 
    },
    clearForm () {
      this.bannerName='',
      this.bannerUrl='',
      this.isActive=false
    },
    cancelForm () {
      this.clearForm()
      this.editForm = false
    },
    clearError () {
      this.$store.commit('CLEAR_ERRMSG')
    },
    populateForm (data) {
      this.editForm = true
      console.log(data,"<<<<<<<");
      this.id = data.id
      this.bannerName= data.name,
      this.bannerUrl= data.image_url,
      this.isActive= data.isActive
    }
    
  },
  created () { 
    // this.$store.dispatch('fetchCategories')
    this.$store.dispatch('fetchBanners')
  },
  computed: {
    bannerLists () {
      return this.$store.state.banner
    },
    active () {
      if(this.isActive){
        return 'checked'
      }else{
        return ''
      }
    }
  }
}
</script>

<style scoped>
.home {
  height: 98%; 
}
</style>
