module.exports = (app, api) => {
    app.get('/calendar', async (req, res) => {
        const calendarId = 'pso2.schedule@gmail.com'
        let events = []
        let pageToken = undefined

        try {
            do {
                /* eslint-disable no-await-in-loop */
                let curEvents = await api.events.list({calendarId: calendarId, pageToken: pageToken})
                if(curEvents.status != 200) {
                    return res.status(curEvents.status).send(curEvents.statusText)
                }
                pageToken = curEvents.data.nextPageToken

                curEvents.data.items.forEach(item => {
                    events.push(item)
                });

            } while(pageToken != undefined);
            
        } catch(err) {
            console.log(err)
            return res.status(403).send('Something went wrong!');
        }
        return res.status(200).send(events)
    })
}