const { google } = require('googleapis');
const serviceAccount = '../../pso2-eq-dev-calendar.json';

const SCOPE = 'https://www.googleapis.com/auth/calendar';

let auth = new google.auth.GoogleAuth({
    keyFile: serviceAccount,
    scopes: SCOPE
})

const api = google.calendar({version: 'v3', auth: auth})

module.exports = {
    api
}