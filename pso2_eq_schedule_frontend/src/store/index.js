import Vue from 'vue'
import Vuex from 'vuex'
import { getLatestSchedule } from '../common/api'
import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentEq: Object, // latest eq schedule
        allEqs: [], // all eq schedules
        todaysEq: [] // eqs for today
    },

    getters: {
        getCurrentEqs(state) {
            return state.currentEq.eqinfo
        },
         
        getTodaysEqs(state) {
            return state.todaysEq
        }
    },

    mutations: {
        SET_CURRENT_EQ(state, latestSchedule) {
            state.currentEq = latestSchedule
        },

        SET_TODAYS_EQS(state, todaysEqs) {
            state.todaysEq = todaysEqs.events
        }
    },

    actions: {
        getLatestSchedule({commit}) {
            return getLatestSchedule().then(latestSchedule => {
                commit('SET_CURRENT_EQ', latestSchedule)
                let date = moment().format('M/DD')
                let todaysEvents = latestSchedule.eqinfo.filter(item => item.date === date)
                commit('SET_TODAYS_EQS', todaysEvents[0])
            })
        }
    }
})