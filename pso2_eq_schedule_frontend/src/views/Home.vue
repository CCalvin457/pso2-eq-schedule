<template>
  <div class="home">
    <DateInfo :localTime="localTime" :localDate="localDate"></DateInfo>
    <v-container>
      <template v-if="filteredEqs">
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
            v-for="(eq, index) in eqListForDisplay" :key="index">
            <EqCard :event="eq"></EqCard>
          </v-col>
        </v-row>

        <v-row v-if="filteredEqs.length > 6">
          <v-col cols="12">
            <v-pagination :length="paginationLength" v-model="page"></v-pagination>
          </v-col>
        </v-row>
      </template>

      <template v-else> <!-- Display something when we don't have any more eqs to display -->
        <v-row>
          <v-col cols="12">
            <p class="text-center text-h4">No upcoming events!</p>
          </v-col>
        </v-row>
      </template>
      
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

  data: () => ({
    page: 1,
    itemsPerPage: 6
  }),

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
        // console.log(nextEvents[0])
        return nextEvents[0]
      }

      // console.log(`No next event`);
      return null;
    },

    isUpcoming() {
      if(this.getNextEvent == null) {
        // console.log(`No upcoming event`);
        return true
      }
      // console.log(`Upcoming event: ${moment(this.localTime, 'h:mm A').isBefore(moment(this.getNextEvent.startlocaltime, 'h:mm A'))}`)
      return moment(this.localTime, 'h:mm A').isBefore(moment(this.getNextEvent.startlocaltime, 'h:mm A'))
    },

    filteredEqs() {
      // let localTime = moment(this.localTime, 'h:mm A')
      // let localDate = moment(this.localDate, 'dddd, MMMM Do, YYYY')
      let localDay = moment(`${this.localDate} ${this.localTime}`, 'dddd, MMMM Do, YYYY h:mm A')
      let localNextDay = localDay.clone().add(1, 'days')

      console.log(localNextDay)

      let nextEvents = this.eqs.filter(eq => {
        // let eventStartTime = moment(eq.startlocaltime, 'h:mm A')
        // let eventStartDate = moment(eq.startlocaldate, 'dddd, MMMM Do, YYYY')
        let eventStartDateTime = moment(`${eq.startlocaldate} ${eq.startlocaltime}`, 'dddd, MMMM Do, YYYY h:mm A')

        return (
          // localTime.isAfter(eventStartTime) && 
          // localDate.isSame(eventStartDate)
          eventStartDateTime.isBetween(localDay, localNextDay)
        )
      }
        
      );

      if(nextEvents.length >= 1) {
          // console.log(nextEvents)
          return nextEvents;
        }

        // console.log('No next events')
        return null;
    },

    eqListForDisplay() {
      let startIndex = (this.page * this.itemsPerPage) - this.itemsPerPage;
      let endIndex = (this.page * this.itemsPerPage);
      return this.filteredEqs.slice(startIndex, endIndex)
      
    },

    paginationLength() {
      let numberOfEvents = this.filteredEqs.length
      let numberOfEventsPerPage = Math.ceil(numberOfEvents / this.itemsPerPage)

      return numberOfEventsPerPage
    }
  }

}
</script>
