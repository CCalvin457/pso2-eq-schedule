import moment from 'moment'

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

export function convertToMomentDate(date) {
    return moment(date);
}