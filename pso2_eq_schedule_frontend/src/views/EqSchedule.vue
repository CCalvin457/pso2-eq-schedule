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
                    :events="getEvents"
                    :event-color="getEventColor"
                    color="light-blue"
                    @click:event="(nativeEvent, event)=>showEvent(nativeEvent, event)"
                ></v-calendar>

                <v-menu
                    v-model="selectedOpen"
                    :close-on-content-click="false"
                    :activator="selectedElement"
                    offset-x
                >
                    <v-card color="grey lighten-4" min-width="350px" flat>
                        <v-toolbar :color="selectedEvent.colour">
                            <v-toolbar-title>
                                <span>{{ selectedEvent.eventName }} ({{ selectedEvent.eventtype }})</span>
                            </v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <span class="cardText">
                                <strong>Local Start Time: </strong>
                                {{ selectedEvent.localstarttime }}
                            </span>
                            <v-spacer></v-spacer>
                            <span class="cardText">
                                <strong>Duration: </strong>
                                {{ selectedEvent.duration }}
                            </span>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn text color="secondary" @click="selectedOpen = false">Close</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-menu>

            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { convertToLocalDate } from '../common/time'
    export default {
        data: () => ({
            selectedOpen: false,
            selectedEvent: {},
            selectedElement: null,
            dialog: false
        }),

        computed: {
            ...mapGetters({
                currentEqs: 'getCurrentEqs'
            }),

            getCalendarDates() {
                let endIndex = this.currentEqs.length - 1;
                let startDate = this.currentEqs[0].date
                let endDate = this.currentEqs[endIndex].date

                return { calendarStartDate: startDate.clone().format('YYYY-MM-DD'),
                        calendarEndDate: endDate.clone().format('YYYY-MM-DD'),
                        displayStartDate: startDate.clone().format('dddd, MMMM Do, YYYY'),
                        displayEndDate: endDate.clone().format('dddd, MMMM Do, YYYY')}
            },

            getEvents() {
                let events = []
                this.currentEqs.forEach(eqs => {
                    eqs.events.forEach(eq => {
                        let localDate = convertToLocalDate(eq.date._seconds * 1000)
                        let duration = eq.duration.split(' ')[0]

                        let localStartDate = localDate.clone().format('YYYY-MM-DD HH:mm')
                        let localEndDate = localDate.clone().add(duration, 'minutes').format('YYYY-MM-DD HH:mm')

                        let localStartTime = localDate.clone().format('hh:mm A')
                        let eventColour = eq.eventtype === 'Concert' ? '#0277BD' : '#43A047'

                        let event = {
                            name: `${eq.name} (${eq.duration})`,
                            start: localStartDate,
                            end: localEndDate,
                            colour: eventColour,
                            duration: eq.duration,
                            localstarttime: localStartTime,
                            eventName: eq.name,
                            eventtype: eq.eventtype
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
            },
            showEvent({nativeEvent, event}) {
                const open = () => {
                    this.selectedEvent = event;
                    this.selectedElement = nativeEvent.target;
                    setTimeout(() => (this.selectedOpen = true), 10);
                };

                if(this.selectedOpen) {
                    this.selectedOpen = false;
                    setTimeout(open, 10);
                } else {
                    open();
                }

                nativeEvent.stopPropagation();
            }
        }
    }
</script>

<style lang="scss" scoped>
.cardText {
    color: black;
}
</style>