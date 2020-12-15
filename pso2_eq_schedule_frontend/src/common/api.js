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

export async function getCalendarEvents() {
    let events = Object;
    // let calendarId = '';

    // let calendarSnapshot = await axios.post(`${process.env.VUE_APP_API}/calendar/latest`, { date: date })
    //     .catch(error => {
    //         throw error;
    //     });

    // calendarId = calendarSnapshot.data;

    events = await axios.get(`${process.env.VUE_APP_API}/pso2/latestSchedule`)
        .catch(error => {
            throw error;
        });

    return events.data;
}