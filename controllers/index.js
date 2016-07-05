var express = require('express');
var router = express.Router();


router.use('/', require('./main'));
router.use('/', require('./signin'));
router.use('/', require('./signup'));
router.use('/', require('./info'));


module.exports = router;