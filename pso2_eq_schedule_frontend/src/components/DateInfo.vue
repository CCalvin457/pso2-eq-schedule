<template>
    <v-container fluid>
        <v-row align="center" justify="center">
            <!-- local time -->
            <v-col cols="12">
                <p class="text-center text-h3 timeInfo">{{ localTime }}</p>
            </v-col>
            <!-- local date -->
            <v-col class="removePadding" cols="12">
                <p class="text-center text-h5 timeInfo">{{ localDate }}</p>
            </v-col>
            <!-- timezone -->
            <v-col class="removePadding" cols="12">
                <p class="text-center text-h5 timeInfo">{{ localTimeZone }}</p>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import moment from 'moment';
import Moment from 'moment-timezone';
    export default {
        props: {
            localTime: String,
            localDate: String
        },
        data() {
            return {
                localTimeZone: ''
            }
        },

        created() {
            this.getLocalTimeZone();
        },

        methods: {
            getLocalTimeZone() {
                let timeZone = Moment.tz.guess();
                let utcOffset = moment().format('Z');
                this.localTimeZone = `${timeZone} | GMT ${utcOffset}`;
            }
        }
    }
</script>

<style lang="scss" scoped>
.timeInfo {
    margin-bottom: 0px;
}

.removePadding {
    padding: 0px;
}
</style>