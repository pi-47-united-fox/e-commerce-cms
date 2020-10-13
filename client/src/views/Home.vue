<template>
  <v-app>
    <v-main>
      <v-container justify='center' align='center'>
        <Login />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login'
export default {
  name: 'Home',
  components: {
    Login
  }
}
</script>
