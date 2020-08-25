<template>
    <v-card class="mx-auto" width="500" shaped raised>
        <v-card-title primary-title class="justify-center rm-bottom">
            <p class="text-center text-h6">{{ event.name }} <!-- Eq name --></p>
        </v-card-title>
        <v-card-subtitle class="rm-bottom">
            <p class="text-center text-h6" :style="[event.eventtype === 'Urgent Quest' ? {'color': 'Red'} : { 'color': ' LightBlue'}]">{{ event.eventtype }} <!-- Eq eventtype --></p>
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
                        <p class="text-center text-body-1">{{ localTime }}<!-- Eq local time --></p>
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
// import { getLocalTime } from '../common/time'
    export default {
        props: {
            event: Object
        },
        data() {
            return {
                localTime: ''
            }
        },

        mounted() {
            this.localTime = this.getLocalTime()
        },

        methods: {
            getLocalTime () {
                let localTimeZone = moment.tz.guess()
                let localTimeZoneOffset = moment().utcOffset()
                let timeZoneAbbr = moment.tz.zone(localTimeZone).abbr(localTimeZoneOffset)
                let localTime = this.event.startlocaltime

                return `${localTime} ${timeZoneAbbr}`
            }
        }
    }
</script>

<style lang="scss" scoped>
.rm-bottom {
    padding-bottom: 0;
}
</style>