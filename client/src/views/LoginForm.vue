<template>
  <div>
    <div class="body"></div>
    <div class="grad"></div>
    <div class="header">
      <div>Cofee<span>Sodik</span></div>
    </div>
    <br />
    <form @submit.prevent="login">
      <div class="login">
        <input type="email" v-model="email" placeholder="email"/><br />
        <input type="password" v-model="password" placeholder="password"/><br />
        <input type="submit" value="Login" />
        <!-- <p v-text="errMessage"></p> -->
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'LoginForm',
  data () {
    return {
      email: '',
      password: '',
      // errMessage:'',
    }
  },
  methods: {
    login () {
      let payload = {
        email: this.email,
        password: this.password
      }
     this.$store.dispatch("login",payload)
     .then(() => {
        // let msg = ""
        // context.commit('LOGIN', msg)
        this.$router.push({path: "/Product"})
        // localStorage.setItem("access_token", data.access_token)
        })
    //  this.errMessage = this.$store.state.errMessage
      
    }
  },
  created () {
    // this.$store.dispatch('login')
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Exo:100,200,400");
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:700,400,300");

body {
  margin: 0;
  padding: 0;
  background: #fff;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
}

.body {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  width: auto;
  height: auto;
  background-image: url("https://images.unsplash.com/photo-1525881157111-2379cbebbf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80");
  background-size:cover;
  /* -webkit-filter: blur(1px); */
  z-index: 0;
}

.grad {
  position: absolute;
  top: 30px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  width: auto;
  height: auto;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, rgba(0, 0, 0, 0)),
    color-stop(100%, rgba(0, 0, 0, 0.65))
  ); /* Chrome,Safari4+ */
  z-index: 1;
  opacity: 0.7;
}

.header {
  position: absolute;
  top: calc(50% - 35px);
  left: calc(50% - 255px);
  z-index: 2;
}

.header div {
  float: left;
  color: #fff;
  font-family: "Exo", sans-serif;
  font-size: 40px;
  font-weight: 300;
}

.header div span {
  color: #5379fa !important;
}

.login {
  position: absolute;
  top: calc(50% - 75px);
  left: calc(50% - 50px);
  height: 150px;
  width: 350px;
  padding: 10px;
  z-index: 2;
}

.login input[type="email"] {
  width: 250px;
  height: 30px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 2px;
  color: #fff;
  font-family: "Exo", sans-serif;
  font-size: 16px;
  font-weight: 400;
  padding: 4px;
}

.login input[type="password"] {
  width: 250px;
  height: 30px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 2px;
  color: #fff;
  font-family: "Exo", sans-serif;
  font-size: 16px;
  font-weight: 400;
  padding: 4px;
  margin-top: 10px;
}

.login input[type="submit"] {
  width: 260px;
  height: 35px;
  background: #fff;
  border: 1px solid #fff;
  cursor: pointer;
  border-radius: 2px;
  color: #a18d6c;
  font-family: "Exo", sans-serif;
  font-size: 16px;
  font-weight: 400;
  padding: 6px;
  margin-top: 10px;
}

.login input[type="submit"]:hover {
  opacity: 0.8;
}

.login input[type="submit"]:active {
  opacity: 0.6;
}

.login input[type="email"]:focus {
  outline: none;
  border: 1px solid rgba(255, 255, 255, 0.9);
}

.login input[type="password"]:focus {
  outline: none;
  border: 1px solid rgba(255, 255, 255, 0.9);
}

.login input[type="submit"]:focus {
  outline: none;
}

::-webkit-input-placeholder {
  color: rgba(255, 255, 255, 0.6);
}

::-moz-input-placeholder {
  color: rgba(255, 255, 255, 0.6);
}
</style>
