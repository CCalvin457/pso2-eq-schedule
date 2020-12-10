const Luxon = require('luxon');

function getEventList(schedule) {
    let events = []
    let timeZone = schedule[0].schedule.timeZone
    
    schedule.forEach(campaign => {
        campaign.events.forEach(event => {
            let startDate = Luxon.DateTime.fromISO(event.startDate, { zone: timeZone }).toUTC();
            let endDate = Luxon.DateTime.fromISO(event.endDate, { zone: timeZone }).toUTC();
            let duration = (endDate - startDate) / 60e3;

            let tempEventObj = {
                name: campaign.title,
                eventtype: campaign.category.title,
                startTime: startDate,
                endTime: endDate,
                duration: `${duration} minutes`,
                description: event.description
            };

            events.push(tempEventObj);
        });
    });

    events.sort((a, b) => compareDates(a, b));
    return events;
}

function compareDates(a, b, ascending = true) {
    return ascending ? a.startTime - b.startTime : b.startTime - a.startTime;
}

module.exports = {
    getEventList
}