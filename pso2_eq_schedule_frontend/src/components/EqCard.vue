<template>
    <v-card class="mx-auto" width="500" shaped raised>
        <v-card-title primary-title class="justify-center rm-bottom">
            <p class="text-center text-h6">{{ event.name }} <!-- Eq name --></p>
        </v-card-title>
        <v-card-subtitle class="rm-bottom">
            <p class="text-center text-h6">{{ event.eventtype }} <!-- Eq eventtype --></p>
        </v-card-subtitle>
        <v-card-text>
            <v-container >
                <v-row>
                    <v-col cols="6">
                        <div class="text-center text-body-1"><strong>Start Time:</strong></div>
                        <p class="text-center text-body-1">{{ event.time }} PDT <!-- Eq time --></p>
                    </v-col>
                    <v-col cols="6">
                        <div class="text-center text-body-1"><strong>Local Start Time:</strong></div>
                        <p class="text-center text-body-1">{{ getLocalTime }}<!-- Eq local time --></p>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <div class="text-center text-body-1"><strong>Duration:</strong></div>
                        <p class="text-center text-body-1">{{ event.duration }} <!-- Eq duration --></p>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script>
import moment from 'moment'
    export default {
        props: {
            event: Object
        },

        computed: {
            getLocalTime() {
                let timeZone = 'America/Los_Angeles' // Find way to not hard code this
                let localTimeZone = moment.tz.guess() // Put in vuex store?
                let localTimeZoneOffset = moment().utcOffset() // Put in vuex store?
                
                let eqTime = moment.tz(this.event.time, 'h:mm A', timeZone)
                let localTime = eqTime.clone().tz(localTimeZone).format('h:mm A')
                
                return `${localTime} ${moment.tz.zone(localTimeZone).abbr(localTimeZoneOffset)}`
            }
        }
    }
</script>

<style lang="scss" scoped>
.rm-bottom {
    padding-bottom: 0;
}
</style>