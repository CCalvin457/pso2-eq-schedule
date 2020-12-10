const axios = require('axios');
const NodeCache = require('node-cache');
const { DateTime } = require('luxon')
const pso2Cache = new NodeCache(); // make a new cache
require('dotenv').config()
const { getEventList } = require('../utils/pso2_api_utils');

// Cache keys
const SCHEDULE_ID = 'scheduleId'
const END_DATE = 'endDate'
const EVENTS = 'events'

const pso2Url = process.env.PSO2_URL

module.exports = (app) => {
    app.post('/pso2/latestSchedule', async (req, res) => {
        let date = new Date(req.body.date);
        let today = DateTime.fromJSDate(date).toUTC()
        let schedule = [];
        let latestScheduleId = 0;
        let events = [];
        
        if(!pso2Cache.has(SCHEDULE_ID)) {
            try {
                let pso2Schedule = await axios.get(`${pso2Url}`);

                // Find the latest schedule id
                latestScheduleId = pso2Schedule.data.reduce((prev, current) => {
                    return (prev.scheduleId > current.scheduleId) ? prev.scheduleId : current.scheduleId
                });

                // Filter result to show only the latest schedule events
                schedule = pso2Schedule.data.filter((campaign) => {
                    return campaign.scheduleId = latestScheduleId
                });
                
                events = getEventList(schedule);
            } catch(err) {
                console.log(err);
                return res.status(403).send("Something went wrong!");
            }

            // Setting cache
            pso2Cache.mset([
                { key: SCHEDULE_ID, val: {current: latestScheduleId, next: latestScheduleId + 1 }},
                { key: EVENTS, val: events },
                { key: END_DATE, val: DateTime.fromISO(schedule[0].schedule.endDate,
                     {zone: schedule[0].schedule.timeZone}).toUTC()}
            ]);
        } else {
            // TODO: Check date sent from client with cached end date to see if we need to try and get a new schedule
            
            try {
                let schedule = await axios.get(`${pso2Url}?scheduleId=${pso2Cache.get(SCHEDULE_ID).current}`);
                events = getEventList(schedule.data);
            } catch(err) {
                console.log(err);
                return res.status(403).send("Something went wrong!");
            }
        }

        let test = pso2Cache.get(END_DATE)
        // console.log(today)
        console.log(today.diff(test, 'minutes').toObject())

        return res.status(200).send(events);
    });
}