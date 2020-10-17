<template>
  <div class="container-left">
    <div class="admin-account">
      <h2>Hello, Admin</h2>
      <p>Have a nice day!</p>
    </div>
    <div class="icon-nav">
      <p><i class="fa fa-store-alt"></i> products</p>
    </div>

    <div class="icon-nav">
      <p><i class="fa fa-shipping-fast"></i> UI Client</p>
    </div>
    <div class="icon-nav">
      <p><i class="fa fa-trophy"></i> Others</p>
    </div>
    <div class="icon-nav">
      <a href="#" @click.prevent="logout"> Logout </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContainerLeft',
  methods: {
    logout () {
      localStorage.clear()
      console.log('test logout')
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style>
.container-left {
  width: 15%;
  height: 900px;
  background: linear-gradient(to bottom right, #385094, #42b883);
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  border-radius: 12px;
  margin-right: 20px;
}

.container-left i,
p {
  font-size: 1.2rem;
  color: white;
  cursor: pointer;
}

.icon-nav {
  color: white;
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 20px;
}

.admin-account {
  width: 100%;
  height: auto;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: wheat;
  margin-top: 50px;
}

.admin-account h2,
p {
  color: white;
  line-height: 10px;
}

a {
  text-decoration: none;
  color: whitesmoke;
}
</style>
