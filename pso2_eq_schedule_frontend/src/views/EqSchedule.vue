<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <p class="text-center text-h4">EQ Schedule From:</p>
                <p class="text-center text-h4">{{ startDate }} to {{ endDate }}</p>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-calendar 
                    type="custom-weekly"
                    :start="calendarDates.startDate"
                    :end="calendarDates.endDate"
                ></v-calendar>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { convertToDate } from '../common/time'
    export default {
        data:() => ({
            calendarDates: {
                startDate: '',
                endDate: ''
            },
            startDate: '',
            endDate: ''
        }),

        computed: {
            ...mapGetters({
                currentEqs: 'getCurrentEqs'
            })
        },

        created() {
            let endIndex = this.currentEqs.length - 1;
            let startDate = convertToDate(this.currentEqs[0].date, 'M/DD')
            let endDate = convertToDate(this.currentEqs[endIndex].date, 'M/DD')

            this.calendarDates.startDate = startDate.clone().format('YYYY-MM-DD')
            this.calendarDates.endDate = endDate.clone().format('YYYY-MM-DD')

            this.startDate = startDate.clone().format('dddd, MMMM Do, YYYY')
            this.endDate = endDate.clone().format('dddd, MMMM Do, YYYY')
        }
    }
</script>

<style lang="scss" scoped>

</style>