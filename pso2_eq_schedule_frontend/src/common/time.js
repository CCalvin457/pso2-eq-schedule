import moment from 'moment'
import Moment from 'moment-timezone'

export function convertToLocalTime(time) {
    var eqTime = moment.utc(time, 'h:mm A')

    let localTimeZone = Moment.tz.guess() // Put in vuex store?
    let localTime = eqTime.clone().tz(localTimeZone)
    
    return localTime
}

export function convertToLocalDate(date) {
    var eqDate = moment.utc(date)

    let localTimeZone = Moment.tz.guess()
    let localDate = eqDate.clone().tz(localTimeZone)

    return localDate
    
}

export function convertToDate(date, format) {
    let convDate = moment.utc(date, format)

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