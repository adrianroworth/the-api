const express = require('express');
// const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// be able to serve static files.
app.use(express.static('./src/static'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json({ type: 'application/vnd.api+json' }));

// app.use(require('./middleware'));

app.use('/docs', require('./api/routes/docs'));
app.use(require('./api/routes'));

// Central error handler
// https://www.joyent.com/node-js/production/design/errors
// https://github.com/i0natan/nodebestpractices/blob/master/sections/errorhandling/centralizedhandling.md
app.use(async (err, req, res, next) => {
    const error = { errors: [] };

    if (err.statusCode === 400) {
        error.errors.push({
            status: 400,
            title: '400 Bad Request',
            detail: err.message
        });

        return res.status(400).json(error);
    }

    if (err.statusCode === 403) {
        error.errors.push({
            status: 403,
            title: '403 Forbidden',
            detail: err.message
        });

        return res.status(403).json(error);
    }

    if (err.statusCode === 404) {
        error.errors.push({
            status: 404,
            title: '404 Not Found',
            detail: err.message
        });

        return res.status(404).json(error);
    }

    if (err.statusCode === 409) {
        error.errors.push({
            status: 409,
            title: '409 Conflict',
            detail: err.message
        });

        return res.status(409).json(error);
    }

    if (err.name === 'UnauthorizedError') {
        error.errors.push({
            status: 401,
            title: '401 Unauthorized',
            detail: err.message
        });

        return res.status(401).json(error);
    }

    // Non-operational error
    return next(err);
});

module.exports = app;
