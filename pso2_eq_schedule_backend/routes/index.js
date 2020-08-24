const pso2EqsRoute = require('./pso2_eqs');

module.exports = (app, db) => {
    pso2EqsRoute(app, db);
}