var express = require('express');
var router = express.Router();
var model = require('../models');



router.get('/signup', function(req, res) {
    res.render('signup', {
        layout: 'header',
        title: 'Регистрация'
    });
});

router.post('/signup', function(req, res) {

});

module.exports = router;