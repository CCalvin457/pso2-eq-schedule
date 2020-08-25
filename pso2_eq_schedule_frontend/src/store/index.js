import Vue from 'vue'
import Vuex from 'vuex'
import { getLatestSchedule } from '../common/api'
import { getLocalTime } from '../common/time'
import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentEq: Object, // latest eq schedule
        allEqs: [], // all eq schedules
        todaysEq: [], // eqs for today
        currentLocalTime: ''
    },

    getters: {
        getCurrentEqs(state) {
            return state.currentEq.eqinfo
        },
         
        getTodaysEqs(state) {
            return state.todaysEq
        },

        getLocalTime(state) {
            return state.currentLocalTime
        }
    },

    mutations: {
        SET_CURRENT_EQ(state, latestSchedule) {
            state.currentEq = latestSchedule
        },

        SET_TODAYS_EQS(state, todaysEqs) {
            state.todaysEq = todaysEqs
        },

        SET_LOCAL_TIME(state, time) {
            if(state.currentLocalTime != time) {
                state.currentLocalTime = time
            }
        }
    },

    actions: {
        getLatestSchedule({commit, dispatch}) {
            return getLatestSchedule().then(latestSchedule => {
                commit('SET_CURRENT_EQ', latestSchedule)
                let date = moment().format('M/DD')
                let todaysEvents = latestSchedule.eqinfo.filter(item => item.date === date)
                dispatch('setTodaysEqs', todaysEvents[0])
            })
        },

        setTodaysEqs({commit}, todaysEqs) {
            let eqs = []

            // Adding the local starting and ending times based event time and duration
            todaysEqs.events.forEach(eq => {
                let temp = eq

                let duration = eq.duration.split(" ")[0]

                if(duration >= "60") {
                    duration = "30"
                }

                let localTime = getLocalTime(eq.time)
                let endTime = localTime.clone().add(duration, 'minutes')

                temp.startlocaltime = localTime.format('h:mm A')
                temp.endlocaltime = endTime.format('h:mm A')

                eqs.push(temp)
            });

            commit('SET_TODAYS_EQS', eqs)
        },

        setLocalTime({commit}, time) {
            commit('SET_LOCAL_TIME', time)
        }
    }
})