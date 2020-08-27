<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <p class="text-center text-h4">EQ Schedule From:</p>
                <p class="text-center text-h4">
                    {{ getCalendarDates.displayStartDate }} to {{ getCalendarDates.displayEndDate }}
                </p>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-calendar 
                    type="custom-weekly"
                    :start="getCalendarDates.calendarStartDate"
                    :end="getCalendarDates.calendarEndDate"
                    :short-weekdays="false"
                    :short-months="false"
                    :events="getEvents"
                    :event-color="getEventColor"
                    color="light-blue"
                ></v-calendar>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { convertToDate, convertToLocalDate } from '../common/time'
    export default {
        computed: {
            ...mapGetters({
                currentEqs: 'getCurrentEqs'
            }),

            getCalendarDates() {
                let endIndex = this.currentEqs.length - 1;
                let startDate = convertToDate(this.currentEqs[0].date, 'M/DD')
                let endDate = convertToDate(this.currentEqs[endIndex].date, 'M/DD')

                return { calendarStartDate: startDate.clone().format('YYYY-MM-DD'),
                        calendarEndDate: endDate.clone().format('YYYY-MM-DD'),
                        displayStartDate: startDate.clone().format('dddd, MMMM Do, YYYY'),
                        displayEndDate: endDate.clone().format('dddd, MMMM Do, YYYY')}
            },

            getEvents() {
                let events = []
                
                this.currentEqs.forEach(eqs => {
                    eqs.events.forEach(eq => {
                        let localDate = convertToLocalDate(eqs.date, eq.time)
                        let localStartDate = localDate.clone().format('YYYY-MM-DD')
                        let localStartTime = localDate.clone().format('h:mm A')
                        let eventColour = eq.eventtype === 'Concert' ? '#0277BD' : '#43A047'
                        let event = {
                            name: `${localStartTime} ${eq.name} (${eq.duration})`,
                            start: localStartDate,
                            colour: eventColour
                        }
                        events.push(event)
                    });
                });

                return events;
            }
        },

        methods: {
            getEventColor(event) {
                return event.colour
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>