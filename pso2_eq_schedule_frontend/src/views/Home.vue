<template>
  <div class="home">
    <DateInfo></DateInfo>
    <v-container>
      <v-row class="pb-4">
        <v-col cols="12">
          <p class="text-center text-h6">Upcoming Event:</p>
          <!-- <EqCard></EqCard> -->
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <v-row>
        <v-col cols="12">
          <p class="text-center text-h6">Today's Events:</p>
        </v-col>
      </v-row>

      <v-row>
        <v-col xl="4" md="6" sm="12"
          v-for="(eq, index) in eqs" :key="index">
          <EqCard :event="eq"></EqCard>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import DateInfo from '@/components/DateInfo.vue'
import EqCard from '@/components/EqCard.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  components: {
    DateInfo,
    EqCard
  },
  
  data() {
    return {
      nextEvent: Object
    }
  },

  computed: {
    ...mapGetters({
      eqs: 'getTodaysEqs',
      localTime: 'getLocalTime'
    })
  }

}
</script>
