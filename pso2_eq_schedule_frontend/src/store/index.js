import Vue from 'vue'
import Vuex from 'vuex'
import { getLatestSchedule, getEqsAfterDate } from '../common/api'
import { convertToLocalTime, getLocalTime, convertToLocalDate, getLocalDate, convertToDate } from '../common/time'

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
            return getLatestSchedule().then(async latestSchedule => {

                // converting timestamps into dates
                latestSchedule.eqinfo.forEach(data => {
                    let date = new Date(data.date._seconds * 1000)

                    data.date = convertToDate(`${date.getUTCMonth() + 1}/${date.getUTCDate()}`, 'M/D')
                })

                // console.log(latestSchedule.eqinfo)
                commit('SET_CURRENT_EQ', latestSchedule)
                // getting previous day
                let date = new Date()
                date.setDate(date.getDate() - 1)

                let eqs = await getEqsAfterDate(date)
                dispatch('setServerTimeZoneAbbr', latestSchedule.tzabbr)
                dispatch('setEqsList', eqs)
                dispatch('setLocalDateTime')
                commit('UPDATE_IS_LOADED', true)
            })
        },

        setEqsList({commit, state}, eqsList) {
            let eqs = []
            // Adding the local starting and ending times based event time and duration
            eqsList.forEach(eq => {
                let temp = eq

                let eqDate = new Date(eq.date._seconds * 1000)
                
                let duration = eq.duration.split(" ")[0]
                
                
                let localTime = convertToLocalTime(eq.time, state.serverTzAbbr)
                let endTime = localTime.clone().add(duration, 'minutes')

                let localDate = convertToLocalDate(`${eqDate.getUTCMonth() + 1}/${eqDate.getUTCDate()}`, eq.time, state.serverTzAbbr)
                temp.startlocaldate = localDate.format('dddd, MMMM Do, YYYY')
                temp.startlocaltime = localTime.format('h:mm A')
                temp.endlocaltime = endTime.format('h:mm A')
                
                eqs.push(temp)
            });
            commit('SET_EQS_LIST', eqs)
        },

        setLocalDateTime({commit, state}) {
            let localDate = getLocalDate()
            let localTime = getLocalTime()
            if(state.currentLocalTime != localTime) {
                commit('SET_LOCAL_TIME', localTime)
            }

            if(state.currentLocalDate != localDate) {
                commit('SET_LOCAL_DATE', localDate)
            }

            setInterval(() => {
                let localDate = getLocalDate()
                let localTime = getLocalTime()

                if(state.currentLocalTime != localTime) {
                    commit('SET_LOCAL_TIME', localTime)
                }

                if(state.currentLocalDate != localDate) {
                    commit('SET_LOCAL_DATE', localDate)
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