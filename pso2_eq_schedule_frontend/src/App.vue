<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <span class="text-h4 homeButton" @click="goHome">
          <strong>PSO2 NA Schedule</strong>
        </span>
        <!-- <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        /> -->
      </div>

      <v-spacer></v-spacer>

      <v-btn
        to="/current-schedule"
        text
      >
        <span class="mr-2">Current Schedule</span>
        <v-icon dense>mdi-calendar-range</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view v-if="isLoaded"/>
    </v-main>

    <v-footer height="50px">
      <span class="mx-auto text-center text-caption"><strong>Disclaimer: We are NOT affiliated with PSO2, this is a fan site dedicated to the game.</strong></span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import { getLocalDate } from './common/time'
export default {
  name: 'App',

  components: {},

  data: () => ({
    oldLocalDate: ''
  }),

  computed: {
    ...mapGetters({
      isLoaded: 'getIsLoaded'
    })
  },

  beforeCreate() {
    this.$store.dispatch('getLatestSchedule')
  },

  created() {
    this.oldLocalDate = getLocalDate()
    
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if(mutation.type === 'SET_LOCAL_DATE') {
        // console.log(this.oldLocalDate)
          if(state.currentLocalDate != '' && this.oldLocalDate != state.currentLocalDate) {
            this.$store.dispatch('getLatestSchedule')
            this.oldLocalDate = state.currentLocalDate
          }
      }
    });
  },

  methods: {
    goHome() {
      if(this.$router.history.current.path != '/')
        this.$router.push({ path: '/' })
    }
  },

  beforeDestroy() {
    this.unsubscribe();
  }
};
</script>

<style lang="scss" scoped>
  .homeButton:hover {
    cursor: pointer;
  }
</style>
