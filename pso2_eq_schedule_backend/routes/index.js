const pso2EqsRoute = require('./pso2_eqs');
const pso2CalendarRoute = require('./pso2_calendar');

module.exports = (app, db, api) => {
    pso2EqsRoute(app, db);
    pso2CalendarRoute(app, api, db);
}