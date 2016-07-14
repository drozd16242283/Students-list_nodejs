var express  = require('express');
var router   = express.Router();
var passport = require('passport');
var uuid     = require('node-uuid');


router.get('/signin', function(req, res) {
    res.render('signin', {
        layout: 'header',
        title: 'Вход',
        error: req.flash('error')
    })
});

router.post('/signin',
    passport.authenticate('signin', {
        failureRedirect: '/signin',
        failureFlash: true
    }),
    function(req, res) {
        res.cookie('IsLogin', uuid.v1(), { maxAge: 60 * 1000000 });
        res.redirect('/');
    }

);


module.exports = router;