module.exports = (app, db) => {
    app.get('/latesteq', async (req, res) => {
        // console.log(db);
        let eqDocs = await db.collection('eqs').where('latest', '==', true).limit(1).get();
        
        if(eqDocs.empty || eqDocs.size === 0) {
            return res.status(400).send('no document found');
        }

        console.log(eqDocs.docs[0].data());

        let currentSchedule = eqDocs.docs[0].data();

        return res.status(200).send(currentSchedule);
    });

    app.get('/alleqs', async (req, res) => {
        let eqs = [];
        let eqDocs = await db.collection('eqs').get();

        if(eqDocs.empty || eqDocs.size === 0) {
            return res.status(400).send('no document found');
        }

        eqDocs.forEach(doc => {
            eqs.push(doc.data());
        })

        return res.status(200).send(eqs);
    });
}