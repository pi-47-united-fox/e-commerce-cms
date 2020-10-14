<template>
  <div class="right">
    <div class="container-right-header">
      <div class="container-right">
        <div class="title-right">
          <h1 style="font-size: 2rem">Admin Dashboard</h1>
          <!-- <a href="#" @click.prevent="$router.go(-1)">Back</a> -->
        </div>
        <form class="uk-search uk-search-default">
          <a href="" class="uk -search-icon-flip" uk-search-icon></a>
          <input
            class="uk-search-input"
            type="search"
            placeholder="Search..."
          />
        </form>
      </div>
    </div>

    <div class="option">
      <p style="text-align: left" @click="showPopAdd">
        <i class="fa fa-plus-square"></i>add products
      </p>
    </div>

    <!-- spectators -->
    <!-- <Spectators /> -->
    <!-- main item fetch data -->
    <div class="main">
      <!-- itemCard -->
      <ItemsCard :products="products" />
      <!-- itemCard end -->
      <div class="item-details">
        <div class="item-details-inner">
          <h3>Name</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequatur, maiores blanditiis! Dignissimos quia voluptatem
            corrupti pariatur odio, iusto, deserunt libero necessitatibus,
            perferendis iste quaerat repellat saepe eos corporis rerum illo.
          </p>
          <p>stock : 10</p>
          <p>category: All Mountain</p>
          <p>Price : $1000000</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemsCard from '@/components/ItemsCard.vue'
import Spectators from '@/components/Spectators.vue'
export default {
  name: 'ContainerRight',
  components: {
    ItemsCard,
    Spectators
  },
  methods: {
    showPopAdd () {
      console.log('emit shiow pop add dari CR')
      this.$emit('emitShowPopAdd', true)
    },
    fetchProducts () {
      this.$store.dispatch('FETCH_PRODUCTS')
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  created () {
    this.fetchProducts
  }
}
</script>

<style >
.right {
  width: 90%;
  height: auto;
}
.container-right-header {
  width: 100%;
  height: 10%;
  display: flex;
  align-items: baseline;
  justify-content: center;
  border-radius: 10px;
  align-items: center;
}

.container-right {
  width: 95%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
}

.title-right h1,
p {
  font-size: 1rem;
  color: azure;
}

.option {
  width: 90%;
  height: auto;
  margin-left: 40px;
  display: flex;
}

.option p {
  font-size: 1.3rem;
}

.main {
  width: 100%;
  height: 620px;
  /* background-color: rgb(179, 0, 0); */
  border-radius: 10px;
  align-items: center;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: scroll;
}

.item-details {
  width: 29%;
  height: 500px;
  display: flex;
  background: rgb(17, 17, 17);
  margin-top: 20px;
  margin-left: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
}

.item-details-inner {
  line-height: normal;
  text-align: left;
  color: white;
  width: 90%;
  height: auto;
  margin-top: 40px;
  margin-left: 20px;
}

.item-details-inner p {
  line-height: normal;
  text-align: left;
  color: white;
}

.item-details-inner h3 {
  line-height: normal;
  font-size: 2rem;
  font-weight: bold;
  text-align: left;
  color: white;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.example::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.example {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
