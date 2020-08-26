<template>
  <div class="home">
    <DateInfo :localTime="localTime" :localDate="localDate"></DateInfo>
    <v-container>
      <v-row class="pb-4">
        <v-col cols="12">
          <p class="text-center text-h6">{{ isUpcoming ?  'Next' : 'Ongoing'}} Event:</p>
          <EqCard v-if="getNextEvent != null" :event="getNextEvent"></EqCard>
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <v-row>
        <v-col cols="12">
          <p class="text-center text-h6">Upcoming Events:</p>
        </v-col>
      </v-row>

      <v-row>
        <v-col xl="4" md="6" sm="12"
          v-for="(eq, index) in filteredEqs" :key="index">
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
import moment from 'moment'
export default {
  name: 'Home',
  components: {
    DateInfo,
    EqCard
  },

  computed: {
    ...mapGetters({
      eqs: 'getTodaysEqs',
      localTime: 'getLocalTime',
      localDate: 'getLocalDate'
    }),

    getNextEvent() {
      let nextEvents = this.eqs.filter(eq => 
        (moment(this.localTime, 'h:mm A').isBefore(moment(eq.startlocaltime, 'h:mm A'))) ||
        (moment(this.localTime, 'h:mm A').isBefore(moment(eq.endlocaltime, 'h:mm A'))))
      
      if(nextEvents.length >= 1) {
        console.log(nextEvents[0])
        return nextEvents[0]
      }

      console.log(`No next event`);
      return null;
    },

    isUpcoming() {
      if(this.getNextEvent == null) {
        console.log(`No upcoming event`);
        return true
      }
      console.log(`Upcoming event: ${moment(this.localTime, 'h:mm A').isBefore(moment(this.getNextEvent.startlocaltime, 'h:mm A'))}`)
      return moment(this.localTime, 'h:mm A').isBefore(moment(this.getNextEvent.startlocaltime, 'h:mm A'))
    },

    filteredEqs() {
      let nextEvents = this.eqs.filter(eq => 
        !(
          moment(this.localTime, 'h:mm A').isAfter((moment(eq.startlocaltime, 'h:mm A'))) && 
          moment(this.localDate, 'dddd, MMMM Do, YYYY').isSame((moment(eq.startlocaldate, 'dddd, MMMM Do, YYYY')))
        )
      );

      if(nextEvents.length >= 1) {
          console.log(nextEvents)
          return nextEvents;
        }

        console.log('No next events')
        return null;
    }
  }

}
</script>
