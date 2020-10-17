<template>
  <div class="home">
    <div class="container py-5">
      <!-- For Demo Purpose-->
      <header class="text-center mb-5">
        <h1 class="display-4 font-weight-bold">Welcome To E-Commerce App</h1>
      </header>
      <!-- First Row [Prosucts]-->
      <h2 class="font-weight-bold mb-2">From the Shop</h2>
      <div class="row pb-5 mb-4">
      <Card
      v-for="allData in allDatas" :key="allData.id"
      :allData="allData">
      </Card>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from '../components/Card.vue'

export default {
  name: 'Home',
  components: {
    Card
  },
  data () {
    return {
      isLogin: true
    }
  },
  methods: {
    fetchAll () {
      this.$store.dispatch('fetchAll')
    }
  },
  created () {
    this.fetchAll()
  },
  computed: {
    allDatas () {
      return this.$store.state.allDatas
    }
  }
}
</script>

<style>
body {
  min-height: 100vh;
  background: #fafafa;
}

.social-link {
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  border-radius: 50%;
  transition: all 0.3s;
  font-size: 0.9rem;
}

.social-link:hover,
.social-link:focus {
  background: #ddd;
  text-decoration: none;
  color: #555;
}

.progress {
  height: 10px;
}
</style>
