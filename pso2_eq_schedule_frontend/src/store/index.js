import Vue from 'vue'
import Vuex from 'vuex'
// import { getLatestSchedule, getEqsAfterDate, getCalendarEvents } from '../common/api'
// import { convertToLocalDate, convertToDate, getLocalDateTime } from '../common/time'
import { getCalendarEvents } from '../common/api'
import { convertToLocalDate, getLocalDateTime, convertToMomentDate } from '../common/time'
import { compareDates } from '../common/helper'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentEq: Object, // latest eq schedule
        allEvents: [], // all eq schedules
        todaysEq: [], // eqs for today
        localDateTime: Object, // local date and time
        isLoaded: false
    },

    getters: {
        getCurrentEqs(state) {
            return state.currentEq.eqinfo
        },
         
        getTodaysEqs(state) {
            return state.todaysEq
        },

        getEventList(state) {
            return state.allEvents
        },

        getIsLoaded(state) {
            return state.isLoaded
        },

        getLocalDateTime(state) {
            return state.localDateTime
        }
    },

    mutations: {
        SET_CURRENT_EQ(state, latestSchedule) {
            state.currentEq = latestSchedule
        },

        SET_EQS_LIST(state, todaysEqs) {
            state.todaysEq = todaysEqs
        },

        SET_EVENT_LIST(state, events) {
            state.allEvents = events
        },

        SET_LOCAL_DATE_TIME(state, datetime) {
            state.localDateTime = datetime
        },

        UPDATE_IS_LOADED(state, loaded) {
            state.isLoaded = loaded
        }
    },

    actions: {
        getLatestSchedule({commit, dispatch}) {
            let today = new Date();
            dispatch('setLocalDateTime')
            getCalendarEvents(today).then(calendarEvents => {
                let events = [];
                calendarEvents.forEach(event => {
                    let eventName = event.summary;
                    let serverStartTime = new Date(event.start.dateTime);
                    let serverEndTime = new Date(event.end.dateTime);
                    let duration = (serverEndTime - serverStartTime) / 60e3

                    serverStartTime = convertToMomentDate(serverStartTime)
                    serverEndTime = convertToMomentDate(serverEndTime)

                    let tempEventObj = {
                        name: eventName,
                        eventtype: eventName.toLowerCase().includes('concert') ? 'Concert' : 'Urgent Quest',
                        startTime: serverStartTime,
                        endTime: serverEndTime,
                        duration: `${duration} minutes`,
                        description: event.description
                    }

                    events.push(tempEventObj)
                })

                // console.log(events)
                events.sort((a, b) => compareDates(a, b))
                // console.log(events)
                commit('SET_EVENT_LIST', events)
                commit('UPDATE_IS_LOADED', true)
            }).catch(error => {
                console.error(error);
                commit('UPDATE_IS_LOADED', true)
            })
        },

        setEqsList({commit}, eqsList) {
            let eqs = []
            // Adding the local starting and ending times based event time and duration
            eqsList.forEach(eq => {
                let temp = eq

                let duration = eq.duration.split(" ")[0]
                let localDate = convertToLocalDate(eq.date._seconds * 1000)
                let endTime = localDate.clone().add(duration, 'minutes')
                
                temp.localDate = localDate
                temp.startlocaldate = localDate.clone().format('dddd, MMMM Do, YYYY')
                temp.startlocaltime = localDate.clone().format('hh:mm A')
                temp.endlocaltime = endTime.format('hh:mm A')
                
                eqs.push(temp)
            });

            // eqs.sort(compare)
            // console.log(eqs)
            commit('SET_EQS_LIST', eqs)
        },

        setLocalDateTime({commit, state}) {
            let localDateTime = getLocalDateTime()

            let dateObj = {
                date: localDateTime.clone().format('dddd, MMMM Do, YYYY'),
                time: localDateTime.clone().format('hh:mm A')
            }

            if(state.localDateTime === undefined || state.localDateTime.date != dateObj.date ||
                state.localDateTime.time != dateObj.time) {
                commit('SET_LOCAL_DATE_TIME', dateObj)
            }
            
            setInterval(() => {
                let localDateTime = getLocalDateTime()

                let dateObj = {
                    date: localDateTime.clone().format('dddd, MMMM Do, YYYY'),
                    time: localDateTime.clone().format('hh:mm A')
                }

                if(state.localDateTime === undefined || state.localDateTime.date != dateObj.date ||
                    state.localDateTime.time != dateObj.time) {
                    commit('SET_LOCAL_DATE_TIME', dateObj)
                }
            }, 2500);
        }
    }
})