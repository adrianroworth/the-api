const VError = require('verror');

// Central error handler
// https://www.joyent.com/node-js/production/design/errors
// https://github.com/i0natan/nodebestpractices/blob/master/sections/errorhandling/centralizedhandling.md
module.exports = async (err, req, res, next) => {
    const error = { errors: [] };

    // handle a malformed JSON request e.g. can't be parsed by the bodyparser (express.json)
    // https://github.com/expressjs/body-parser/issues/122#issuecomment-328190379
    if ('type' in err && err.type === 'entity.parse.failed') {
        error.errors.push({
            status: 400,
            title: 'Bad Request',
            detail: 'Request JSON is malformed'
        });

        return res.status(400).json(error);
    }

    // if (err.status === 400) {
    //     err.errors.forEach(errorObj => {
    //         error.errors.push({
    //             status: 400,
    //             title: '400 Bad Request',
    //             detail: errorObj.message,
    //             source: { pointer: `/${errorObj.path.replace(/\./g, '/')}` }
    //         });
    //     });

    //     return res.status(400).json(error);
    // }

    if (err.name === 'CardSetValidationError') {
        const errorInfo = VError.info(err);

        error.errors.push({
            status: 400,
            title: '400 Bad Request',
            detail: err.message
        });

        error.meta = {
            cards: errorInfo.cards
        };

        return res.status(200).json(error);
    }

    if (err.name === 'ResourceNotFound') {
        error.errors.push({
            status: 404,
            title: '404 Resource Not Found',
            detail: err.message
        });

        return res.status(200).json(error);
    }

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
};
