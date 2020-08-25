module.exports = (app, db) => {
    app.get('/latesteq', async (req, res) => {
        let eqDocs = {};

        try {
            eqDocs = await db.collection('eqs').where('latest', '==', true).limit(1).get();
        } catch(error) {
            return res.status(403).send('Permission denied');
        }

        if(eqDocs.empty || eqDocs.size === 0) {
            return res.status(400).send('no document found');
        }

        // console.log(eqDocs.docs[0].data());

        let currentSchedule = eqDocs.docs[0].data();

        return res.status(200).send(currentSchedule);
    });

    app.get('/alleqs', async (req, res) => {
        let eqDocs = {};
        let eqs = [];

        try {
            eqDocs = await db.collection('eqs').get();
        } catch(error) {
            return res.status(403).send('Permission denied');
        }

        if(eqDocs.empty || eqDocs.size === 0) {
            return res.status(400).send('no document found');
        }

        eqDocs.forEach(doc => {
            eqs.push(doc.data());
        })

        return res.status(200).send(eqs);
    });
}