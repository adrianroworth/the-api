const express = require('express');

const router = express.Router();

/** ***************************************************** */
/** root routes start                                   * */
/** ***************************************************** */

// const indexController = require('../controllers/indexController');

// router.get('/', (req, res) => {
//     indexController.indexGet(req, res);
// });

// router.post('/', (req, res) => {
//     indexController.indexPost(req, res);
// });

/** ***************************************************** */
/** root routes end                                     * */
/** ***************************************************** */

/** ***************************************************** */
/** other routes start                                  * */
/** ***************************************************** */

router.use('/api/v1/', require('./api'));

// catch-all 404 page.
router.get('*', req => {
    const err = Error(`Endpoint ${req.url} does not exist`);
    err.name = 'HTTPError';
    err.statusCode = 404;
    err.error = '404 Not Found';
    throw err;
});

/** ***************************************************** */
/** other routes end                                    * */
/** ***************************************************** */

module.exports = router;
