<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-toolbar-title class="d-flex align-center homeButton" @click="goHome">
        <strong>PSO2 NA Schedule</strong>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        to="/current-schedule"
        text
      >
        <span class="mr-2 d-none d-sm-flex">Current Schedule</span>
        <v-icon dense>mdi-calendar-range</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view v-if="isLoaded"/>
      <!-- Loading circle -->
      <v-container v-else fill-height fluid class="d-flex justify-center align-self-center">
        <span>
          <v-progress-circular
            color="primary"
            indeterminate
            size="60"
          ></v-progress-circular>
        </span>
      </v-container>
      
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
      if(mutation.type === 'SET_LOCAL_DATE_TIME') {
        // console.log(this.oldLocalDate)
          if(state.localDateTime.date != '' && this.oldLocalDate != state.localDateTime.date) {
            this.$store.dispatch('getLatestSchedule')
            this.oldLocalDate = state.localDateTime.date
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
