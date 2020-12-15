import Vue from 'vue'
import Vuex from 'vuex'
import { getCalendarEvents } from '../common/api'
import { convertToMomentDate, getLocalDateTime } from '../common/time'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        urgentQuestList: [], // all urgent quests and concerts
        allEvents: [], // all events
        localDateTime: Object, // local date and time
        isLoaded: false
    },

    getters: {
        getEvents(state) {
            return state.urgentQuestList
        },

        getAllEvents(state) {
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
        SET_URGENT_QUESTS(state, events) {
            state.urgentQuestList = events
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
            // let today = new Date();
            dispatch('setLocalDateTime')
            getCalendarEvents().then(calendarEvents => {
                calendarEvents.forEach(event => {
                    event.startTime = convertToMomentDate(event.startTime)
                    event.endTime = convertToMomentDate(event.endTime)
                })

                commit('SET_EVENT_LIST', calendarEvents)
                dispatch('setUrgentQuestList')
                commit('UPDATE_IS_LOADED', true)
            }).catch(error => {
                console.error(error);
                commit('UPDATE_IS_LOADED', true)
            })
        },

        setUrgentQuestList({commit, state}) {
            let events = state.allEvents.filter(event => (event.eventtype == 'Live Concert') || (event.eventtype == 'Urgent Quest'))
            commit('SET_URGENT_QUESTS', events)
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