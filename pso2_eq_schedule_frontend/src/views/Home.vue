<template>
  <div class="home">
    <DateInfo></DateInfo>
    <v-container>
      <v-row class="pb-4">
        <v-col cols="12">
          <p class="text-center text-h6">Upcoming Event:</p>
          <EqCard></EqCard>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12">
          <p class="text-center text-h6">Today's Events:</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <EqCard></EqCard>
        </v-col>
        <v-col cols="4">
          <EqCard></EqCard>
        </v-col>
        <v-col cols="4">
          <EqCard></EqCard>
        </v-col>
        <v-col cols="4">
          <EqCard></EqCard>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import DateInfo from '@/components/DateInfo.vue'
import EqCard from '@/components/EqCard.vue'

export default {
  name: 'Home',
  components: {
    DateInfo,
    EqCard
  }
}
</script>
