<template>
  <form
    class="bg-dark mx-auto text-primary my-5 py-5 px-3"
    @submit.prevent="login"
  >
    <div class="form-group">
      <label for="email">Email address</label>
      <input
        type="email"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        v-model="email"
      />
      <small id="emailHelp" class="form-text text-muted"
        >We'll never share your email with anyone else.</small
      >
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input
        type="password"
        class="form-control"
        id="exampleInputPassword1"
        v-model="password"
      />
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      let input = {
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch("login", input);
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style>
</style>
