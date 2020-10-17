<template>
  <div>
    <v-btn class="mx-2" fab dark x-small v-if="themeDark" @click="changeTheme">
      <v-icon dark>
        mdi-lightbulb-off
      </v-icon>
    </v-btn>

    <v-btn class="mx-2" fab dark x-small v-else @click="changeTheme">
      <v-icon dark>
        mdi-lightbulb-on
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  computed: {
    themeDark () {
      return this.$store.state.themeDark
    }
  },
  methods: {
    changeTheme () {
      this.$store.commit('SWITCH_THEME')
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    }
  }
}
</script>

<style></style>>
