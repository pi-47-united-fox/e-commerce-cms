<template>
  <div class="container-login">
    <div class="uk-animation-toggle" tabindex="0">
      <div class="uk-card uk-card-body uk-animation-scale-up">
        <form @submit.prevent="login">
          <h1>GearNation <i class="fa fa-cogs"></i></h1>
          <div class="uk-margin">
            <div class="uk-inline">
              <span class="uk-form-icon" uk-icon="icon: user"></span>
              <input
                class="uk-input"
                type="email"
                placeholder="email.."
                v-model="payload.email"
              />
            </div>
          </div>
          <div class="uk-margin">
            <div class="uk-inline">
              <span class="uk-form-icon" uk-icon="icon: lock"></span>
              <input
                class="uk-input"
                type="password"
                placeholder="password.."
                v-model="payload.password"
              />
            </div>
          </div>
          <button class="uk-button uk-button-secondary uk-width-1-1">
            LOGIN
          </button>
          <p>Welcome, Its a nice day to work!</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      payload: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      this.$store.dispatch("login", this.payload);
      this.loginRouter();
    },
    loginRouter() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style>
.container-login {
  width: 100%;
  height: 900px;
  background-color: rgb(8, 8, 8);
  /* background-image: url(https://images.unsplash.com/photo-1584619147875-39040aab9b65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80); */
  background-blend-mode: darken;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "ABeeZee", sans-serif;
}

.container-login h1 {
  font-family: "ABeeZee", sans-serif;
  font-weight: bolder;
  color: wheat;
  font-size: 2.1rem;
}
.container-login p {
  font-family: "ABeeZee", sans-serif;
  font-weight: lighter;
  color: wheat;
  font-size: 0.8rem;
}
</style>
