const express = require('express');
const bodyParser = require('body-parser');

const errorHandler = require('./middleware/error-handler');

const app = express();

// be able to serve static files.
app.use(express.static('./src/static'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json({ type: 'application/vnd.api+json' }));

// app.use(require('./middleware'));

app.use('/docs', require('./api/routes/docs'));

// Default to JSON:API content type for all subsequent responses
app.use((req, res, next) => {
    res.type('application/vnd.api+json');
    next();
});

app.use(require('./api/routes'));

// Central error handler
// https://www.joyent.com/node-js/production/design/errors
// https://github.com/i0natan/nodebestpractices/blob/master/sections/errorhandling/centralizedhandling.md
app.use(errorHandler);

module.exports = app;
