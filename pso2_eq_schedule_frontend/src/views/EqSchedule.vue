<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <v-sheet height="64">
                    <v-toolbar flat>
                    <v-btn outlined class="mr-4" @click="setToday">
                        Today
                    </v-btn>
                    <v-btn fab text small @click="prev">
                        <v-icon small>mdi-chevron-left</v-icon>
                    </v-btn>
                    <v-btn fab text small @click="next">
                        <v-icon small>mdi-chevron-right</v-icon>
                    </v-btn>
                    <v-toolbar-title v-if="refCalendar">
                        {{ $refs.calendar.title }}
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-menu bottom right>
                        <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            outlined
                            v-bind="attrs"
                            v-on="on"
                        >
                            <span>{{ typeToLabel[type] }}</span>
                            <v-icon right>mdi-menu-down</v-icon>
                        </v-btn>
                        </template>
                        <v-list>
                        <v-list-item @click="type = 'day'">
                            <v-list-item-title>Day</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="type = 'week'">
                            <v-list-item-title>Week</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="type = 'month'">
                            <v-list-item-title>Month</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="type = '4day'">
                            <v-list-item-title>4 days</v-list-item-title>
                        </v-list-item>
                        </v-list>
                    </v-menu>
                    </v-toolbar>
                </v-sheet>
                <v-sheet>
                    <v-calendar 
                        ref="calendar"
                        v-model="focus"
                        :type="type"
                        :events="getEvents"
                        :event-color="getEventColor"
                        color="light-blue"
                        @click:event="showEvent"
                        @click:more="viewDay"
                        @click:date="viewDay"
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
                                    <strong>Start Time: </strong>
                                    {{ selectedEvent.startTime }}
                                </span>
                                <v-spacer></v-spacer>
                                <span class="cardText">
                                    <strong>Duration: </strong>
                                    {{ selectedEvent.duration }}
                                </span>
                                <v-spacer></v-spacer>
                                <span class="cardText" v-html="selectedEvent.description">                                    
                                </span>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn text color="secondary" @click="selectedOpen = false">Close</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-menu>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
    export default {
        data: () => ({
            refCalendar: false,
            focus: '',
            type: 'month',
            typeToLabel: {
                month: 'Month',
                week: 'Week',
                day: 'Day',
                '4day': '4 Days',
            },
            selectedOpen: false,
            selectedEvent: {},
            selectedElement: null,
            dialog: false
        }),

        mounted () {
            this.$refs.calendar.title != undefined ? this.refCalendar = true : this.refCalendar = false
        },

        computed: {
            ...mapGetters({
                eventList: 'getEventList'
            }),

            getEvents() {
                let events = []
                this.eventList.forEach(event => {
                    let startDate = event.startTime.clone().format('YYYY-MM-DD HH:mm')
                    let endDate = event.endTime.clone().format('YYYY-MM-DD HH:mm')
                    let startTime = event.startTime.clone().format('h:mm A')
                    let endTime = event.endTime.clone().format('h:mm A')
                    
                    let eventColour = event.eventtype === 'Concert' ? '#0277BD' : '#43A047'

                    let eventObj = {
                        name: `${event.name} (${event.duration})`,
                        start: startDate,
                        end: endDate,
                        colour: eventColour,
                        duration: event.duration,
                        startTime: startTime,
                        endTime: endTime,
                        description: event.description,
                        eventName: event.name,
                        eventtype: event.eventtype
                    }
                    events.push(eventObj)
                });

                return events;
            }
        },

        methods: {
            getEventColor(event) {
                return event.colour
            },
            viewDay ({ date }) {
                this.focus = date
                this.type = 'day'
            },
            setToday () {
                this.focus = ''
            },
            prev () {
                this.$refs.calendar.prev()
            },
            next () {
                this.$refs.calendar.next()
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