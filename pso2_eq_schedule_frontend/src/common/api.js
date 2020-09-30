import axios from 'axios'

export async function getLatestSchedule() {
    let latestSchedule = Object;
    try{
        latestSchedule = await axios.get(`${process.env.VUE_APP_API}/latesteqschedule`)
    } catch(error) {
        console.log(error)
        return;
    }
    
    return latestSchedule.data;
}

export async function getEqsAfterDate(date) {
    let eqs = Object;
    // console.log(date)
    try {
        eqs = await axios.post(`${process.env.VUE_APP_API}/alleqsfrom`, { date: date })
    } catch(error) {
        console.log(error);
        return;
    }

    return eqs.data;
}

export async function getCalendarEvents(date) {
    let events = Object;
    let calendarId = '';

    try{
        let calendarSnapshot = await axios.post(`${process.env.VUE_APP_API}/calendar/latest`, { date: date });

        calendarId = calendarSnapshot.data;
    } catch(error) {
        console.log(error);
        return;
    }

    try {
        events = await axios.post(`${process.env.VUE_APP_API}/calendar`, {id: calendarId})
    } catch(error) {
        console.log(error);
        return;
    }

    return events.data;
}