import axios from 'axios'

export async function getLatestSchedule() {
    let latestSchedule = Object;
    try{
        latestSchedule = await axios.get(`${process.env.VUE_APP_API}/latesteq`)
    } catch(error) {
        console.log(error)
        return;
    }
    
    return latestSchedule.data;
}