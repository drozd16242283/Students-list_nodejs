var express = require('express');
var router = express.Router();


router.use('/', require('./main'));
router.use('/', require('./register'));


module.exports = router;