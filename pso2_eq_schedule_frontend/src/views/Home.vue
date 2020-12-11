<template>
  <div class="home">
    <DateInfo :localDate="localDateTime"></DateInfo>
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
// import { getLocalDateTime }  from '@/common/time.js'
import { convertToDateTime } from '@/common/time.js'
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
      eventList: 'getEvents',
      localDateTime: 'getLocalDateTime'
    }),

    getNextEvent() {
      let localDateTime = convertToDateTime(`${this.localDateTime.date} ${this.localDateTime.time}`, 'dddd, MMMM Do, YYYY h:mm A')
      let nextEvents = this.eventList.filter(event => {

        return (localDateTime.isBefore(event.startTime)) ||
        (localDateTime.isBetween(event.startTime, event.endTime)) || 
        (localDateTime.isSame(event.startTime))
      })
      
      if(nextEvents.length >= 1) {
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
      
      let localDateTime = convertToDateTime(`${this.localDateTime.date} ${this.localDateTime.time}`, 'dddd, MMMM Do, YYYY h:mm A')
      return localDateTime.isBefore(this.getNextEvent.startTime)
    },

    filteredEqs() {
      let localDay = convertToDateTime(`${this.localDateTime.date} ${this.localDateTime.time}`, 'dddd, MMMM Do, YYYY h:mm A')
      let localNextDay = localDay.clone().add(1, 'days')

      // console.log(localNextDay)

      let nextEvents = this.eventList.filter(event => (event.startTime.isBetween(localDay, localNextDay)) || 
        (event.startTime.isSame(localNextDay)));

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
