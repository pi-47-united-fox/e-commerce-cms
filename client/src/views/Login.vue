<template>
  <div>
     <div class="registration-form">
        <form @submit.prevent="login">
            <div class="form-icon">
                <span><i class="icon icon-user">Login</i></span>
            </div>
            <div class="form-group">
                <input v-model="email" type="text" class="form-control item" id="email" placeholder="Email" required>
            </div>
            <div class="form-group">
                <input v-model="password" type="password" class="form-control item" id="password" placeholder="Password" required>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary create-account">Submit</button>
            </div>
        </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      const payload = {
        email: this.email,
        password: this.password
      }
      // console.log(payload, '<<<<<<<<payload dari login vue>>>>>>>>')
      this.$store.dispatch('login', payload)
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

.registration-form{
    padding: 20px;
}

.registration-form form{
    max-width: 600px;
    margin: auto;
    padding: 50px 70px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.075);
}

.registration-form .form-icon{
text-align: center;
border-radius: 50%;
font-size: 35px;
width: 100px;
height: 100px;
margin: auto;
margin-bottom: 50px;
line-height: 100px;
}

.registration-form .item{
border-radius: 20px;
margin-bottom: 25px;
padding: 10px 20px;
}
</style>
