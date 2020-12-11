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
            let dates = schedule[0].schedule;
            // Setting cache
            pso2Cache.mset([
                { key: SCHEDULE_ID, val: {current: latestScheduleId, next: latestScheduleId + 1 }},
                { key: EVENTS, val: events },
                { key: END_DATE, val: DateTime.fromISO(dates.endDate,
                     {zone: dates.timeZone}).toUTC()}
            ]);
        } else {
            let cacheDate = pso2Cache.get(END_DATE)
            let scheduleId = pso2Cache.get(SCHEDULE_ID).next
            let dateDiff = cacheDate.diff(today, 'minutes').toObject()

            if(dateDiff.minutes > 0) {
                events = pso2Cache.get(EVENTS);
            } else {
                try {
                    let schedule = await axios.get(`${pso2Url}?scheduleId=${scheduleId}`);
                    let dates = schedule[0].schedule
                    if(schedule.data.length > 0) {
                        events = getEventList(schedule.data);
                        pso2Cache.mset([
                            { key: SCHEDULE_ID, val: {current: scheduleId, next: scheduleId + 1} },
                            { key: EVENTS, val: events},
                            { key: END_DATE, val: DateTime.fromISO(dates.endDate, {zone: dates.timeZone}).toUTC()}
                        ])
                    } else {
                        events = pso2Cache.get(EVENTS); // Get cached events if we can't find a new one yet
                    }
                } catch(err) {
                    console.log(err);
                    return res.status(403).send("Something went wrong!");
                }
            }
        }

        return res.status(200).send(events);
    });
}