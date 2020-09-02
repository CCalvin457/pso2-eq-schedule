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