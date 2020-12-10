const pso2EqsRoute = require('./pso2_eqs');
const pso2CalendarRoute = require('./pso2_calendar');
const pso2Api = require('./pso2_api');

module.exports = (app, db, api) => {
    pso2EqsRoute(app, db);
    pso2CalendarRoute(app, api, db);
    pso2Api(app);
}