import moment from 'moment'
import Moment from 'moment-timezone'

export function convertToLocalTime(time, tzAbbr) {
    var timeZone
    var eqTime = moment.utc(time, 'h:mm A')
    if(tzAbbr != 'GMT') {
        timeZone = 'America/Los_Angeles' // Find way to not hard code this
        eqTime = moment.tz(time, 'h:mm A', timeZone)
    }
    
    let localTimeZone = Moment.tz.guess() // Put in vuex store?
    let localTime = eqTime.clone().tz(localTimeZone)
    
    return localTime
}

export function convertToLocalDate(date, time, tzAbbr) {
    var timeZone
    var eqDate = moment.utc(`${date} ${time}`, 'M/D h:mm A')

    if(tzAbbr != 'GMT') {
        timeZone = 'America/Los_Angeles'
        eqDate = moment.tz(`${date} ${time}`, 'M/D h:mm A', timeZone)
    }

    let localTimeZone = Moment.tz.guess()
    let localDate = eqDate.clone().tz(localTimeZone)

    return localDate
    
}

export function convertToDate(date, dateFormat) {
    let convDate = moment(date, dateFormat)

    return convDate
}

export function getLocalTime() {
    return moment().format('hh:mm A');
}

export function getLocalDate() {
    return moment().format('dddd, MMMM Do, YYYY');
}

export function getLocalDateTime() {
    let momentNow = moment();

    return momentNow;
}

export function convertToDateTime(datetime, format) {
    let momentDateTime = moment(datetime, format);
    return momentDateTime;
}