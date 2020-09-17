<template>
    <v-card class="mx-auto" width="500" height="330" shaped raised>
        <v-card-title primary-title class="justify-center rm-bottom">
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <p class="text-center text-h6 d-inline-block text-truncate" v-on="on">{{ event.name }} <!-- Eq name --></p>
                </template>
                <span>{{ event.name }}</span>
            </v-tooltip>
        </v-card-title>
        <v-card-subtitle class="rm-bottom">
            <p class="text-center text-h6" 
            :style="[event.eventtype === 'Urgent Quest' ? {'color': 'Red'} : { 'color': ' LightBlue'}]">
                {{ event.eventtype }} <!-- Eq eventtype -->
            </p>
            <p class="text-center text-h6">{{ getDate }}</p>
        </v-card-subtitle>
        <v-card-text>
            <v-container fluid>
                <v-row>
                    <v-col cols="6">
                        <div class="text-center text-body-1"><strong>Start Time:</strong></div>
                        <p class="text-center text-body-1">{{ getStartTime }} <!-- event start time --></p>
                    </v-col>
                    <v-col cols="6">
                        <div class="text-center text-body-1"><strong>End Time:</strong></div>
                        <p class="text-center text-body-1">{{ getEndTime }} <!-- event end time --></p>
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
    export default {
        props: {
            event: {}
        },

        computed: {
            getStartTime() {
                return this.event.startTime.clone().format('h:mm A');
            },

            getEndTime() {
                return this.event.endTime.clone().format('h:mm A');
            },

            getDate() {
                return this.event.startTime.clone().format('dddd, MMMM Do, YYYY')
            }
        }
    }
</script>

<style lang="scss" scoped>
.rm-bottom {
    padding-bottom: 0;
}
</style>