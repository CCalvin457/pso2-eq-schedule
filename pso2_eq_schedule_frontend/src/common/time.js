import moment from 'moment'
import Moment from 'moment-timezone'

export function convertToLocalTime(time) {
    let timeZone = 'America/Los_Angeles' // Find way to not hard code this
    let localTimeZone = Moment.tz.guess() // Put in vuex store?

    let eqTime = moment.tz(time, 'h:mm A', timeZone)
    let localTime = eqTime.clone().tz(localTimeZone)
    
    return localTime
}

export function convertToLocalDate(date, time) {
    let timeZone = 'America/Los_Angeles'
    let localTimeZone = Moment.tz.guess()

    let eqDate = moment.tz(`${date} ${time}`, 'M/DD h:mm A', timeZone)

    let localDate = eqDate.clone().tz(localTimeZone)

    return localDate
    
}

export function getLocalTime() {
    return moment().format('hh:mm A');
}

export function getLocalDate() {
    return moment().format('dddd, MMMM Do, YYYY');
}

export function getLocalDateTime() {
    let momentNow = moment();

    let dateTime = {
        time: momentNow.clone().format('h:mm A'),
        date: momentNow.clone().format('dddd, MMMM Do, YYYY')
    };
    return dateTime;
}