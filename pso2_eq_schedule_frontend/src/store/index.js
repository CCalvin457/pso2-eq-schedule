import Vue from 'vue'
import Vuex from 'vuex'
import { getLatestSchedule, getEqsFromDateOnwards } from '../common/api'
import { convertToLocalTime, getLocalDateTime, convertToLocalDate } from '../common/time'
import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentEq: Object, // latest eq schedule
        allEqs: [], // all eq schedules
        todaysEq: [], // eqs for today
        currentLocalTime: '',
        currentLocalDate: '',
        isLoaded: false,
        serverTzAbbr: ''
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
        },

        getLocalDate(state) {
            return state.currentLocalDate
        },

        getIsLoaded(state) {
            return state.isLoaded
        },
        
        getTzAbbr(state) {
            return state.serverTzAbbr
        }
    },

    mutations: {
        SET_CURRENT_EQ(state, latestSchedule) {
            state.currentEq = latestSchedule
        },

        SET_EQS_LIST(state, todaysEqs) {
            state.todaysEq = todaysEqs
        },

        SET_LOCAL_TIME(state, time) {            
            state.currentLocalTime = time            
        },

        SET_LOCAL_DATE(state, date) {            
            state.currentLocalDate = date            
        },

        UPDATE_IS_LOADED(state, loaded) {
            state.isLoaded = loaded
        },

        SET_TZ_ABBR(state, tzAbbr) {
            state.serverTzAbbr = tzAbbr
        }
    },

    actions: {
        getLatestSchedule({commit, dispatch}) {
            commit('UPDATE_IS_LOADED', false)
            return getLatestSchedule().then(async latestSchedule => {
                commit('SET_CURRENT_EQ', latestSchedule)
                let date = moment().format('M/DD')
                // let todaysEvents = latestSchedule.eqinfo.filter(item => item.date === date)
                let eqs = await getEqsFromDateOnwards(date)
                dispatch('setEqsList', eqs)
                dispatch('setServerTimeZoneAbbr', latestSchedule.tzabbr)
                dispatch('setLocalDateTime')
                commit('UPDATE_IS_LOADED', true)
            })
        },

        setEqsList({commit}, eqsList) {
            let eqs = []

            // Adding the local starting and ending times based event time and duration
            eqsList.forEach(eq => {
                let temp = eq

                let duration = eq.duration.split(" ")[0]
                
                let localTime = convertToLocalTime(eq.time)
                let endTime = localTime.clone().add(duration, 'minutes')

                let localDate = convertToLocalDate(eq.date, eq.time)

                temp.startlocaldate = localDate.format('dddd, MMMM Do, YYYY')
                temp.startlocaltime = localTime.format('h:mm A')
                temp.endlocaltime = endTime.format('h:mm A')
                
                eqs.push(temp)
            });

            commit('SET_EQS_LIST', eqs)
        },

        setLocalDateTime({commit, state}) {
            let localDateTime = getLocalDateTime();

            if(state.currentLocalTime != localDateTime.time) {
                commit('SET_LOCAL_TIME', localDateTime.time)
            }

            if(state.currentLocalDate != localDateTime.date) {
                commit('SET_LOCAL_DATE', localDateTime.date)
            }

            setInterval(() => {
                let localDateTime = getLocalDateTime();

                if(state.currentLocalTime != localDateTime.time) {
                    commit('SET_LOCAL_TIME', localDateTime.time)
                }

                if(state.currentLocalDate != localDateTime.date) {
                    commit('SET_LOCAL_DATE', localDateTime.date)
                }
            }, 1000);
        },

        setServerTimeZoneAbbr({commit, state}, tzAbbr) {
            if(state.serverTzAbbr != tzAbbr) {
                commit('SET_TZ_ABBR', tzAbbr)
            }
        }
    }
})