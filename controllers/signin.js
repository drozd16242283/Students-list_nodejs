var express = require('express');
var router = express.Router();
var model = require('../models');


router.get('/signin', function(req, res) {
    res.render('signin', {
        layout: 'header',
        title: 'Вход'
    })
});


module.exports = router;