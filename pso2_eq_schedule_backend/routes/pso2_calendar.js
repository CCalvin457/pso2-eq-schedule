module.exports = (app, api, db) => {
    // get latest calendar from google calendar
    app.post('/calendar/latest', async (req, res) => {
        let today = req.body.date;
        today = new Date(today);
        // console.log(typeof(today));
        // let today = new Date();
        let calendarId = '';

        try {
            let calendars = await db.collection('calendarIds').where('lastDate', '>=', today).orderBy('lastDate').get();
            let data = calendars.docs.map(item => item.data());
            // console.log(data);
            calendarId = data[0].calendarId;
        } catch(err) {
            console.log(err);
            return res.status(403).send("Something went wrong!");
        }

        return res.status(200).send(calendarId);
    });

    app.post('/calendar', async (req, res) => {
        const calendarId = req.body.id;
        // const calendarId = 'pso2.schedule@gmail.com'
        let events = []
        // let pageToken = undefined

        try {
            // do {
                let curEvents = await api.events.list({calendarId: calendarId, orderBy: 'startTime', singleEvents: true});
                // /* eslint-disable no-await-in-loop */
                // let curEvents = await api.events.list({calendarId: calendarId, pageToken: pageToken})
                // if(curEvents.status != 200) {
                //     return res.status(curEvents.status).send(curEvents.statusText)
                // }
                // pageToken = curEvents.data.nextPageToken

                curEvents.data.items.forEach(item => {
                    events.push(item)
                });

            // } while(pageToken != undefined);
            
        } catch(err) {
            console.log(err)
            return res.status(403).send('Something went wrong!');
        }
        return res.status(200).send(events)
    })
}