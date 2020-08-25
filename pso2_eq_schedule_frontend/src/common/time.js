import moment from 'moment'

export function getLocalTime(time) {
    let timeZone = 'America/Los_Angeles' // Find way to not hard code this
    let localTimeZone = moment.tz.guess() // Put in vuex store?

    let eqTime = moment.tz(time, 'h:mm A', timeZone)
    let localTime = eqTime.clone().tz(localTimeZone)
    
    return localTime
}