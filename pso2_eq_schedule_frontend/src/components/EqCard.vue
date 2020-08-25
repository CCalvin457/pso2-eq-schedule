<template>
    <v-card class="mx-auto" max-width="500" max-height="300" shaped raised>
        <v-card-title primary-title class="justify-center rm-bottom">
            <p class="text-h4">Beach Wars! <!-- Eq name --></p>
        </v-card-title>
        <v-card-subtitle class="rm-bottom">
            <p class="text-center text-h6">Urgent Quest <!-- Eq eventtype --></p>
        </v-card-subtitle>
        <v-card-text>
            <v-container >
                <v-row>
                    <v-col cols="6">
                        <div class="text-center text-body-1"><strong>Start Time:</strong></div>
                        <p class="text-center text-body-1">12:00 AM PDT <!-- Eq time --></p>
                    </v-col>
                    <v-col cols="6">
                        <div class="text-center text-body-1"><strong>Local Start Time:</strong></div>
                        <p class="text-center text-body-1">3:00 AM EST <!-- Eq local time --></p>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <div class="text-center text-body-1"><strong>Duration:</strong></div>
                        <p class="text-center text-body-1">30 Minutes <!-- Eq duration --></p>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.rm-bottom {
    padding-bottom: 0;
}
</style>