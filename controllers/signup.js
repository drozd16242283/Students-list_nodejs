var express  = require('express');
var router   = express.Router();
var passport = require('passport');


router.get('/signup', function(req, res) {
    res.render('signup', {
        layout: 'header',
        title: 'Регистрация',
        error: req.flash('error')
    });
});

router.post('/signup',
    passport.authenticate('signup', {
        successRedirect: '/info',
        failureRedirect: '/signup',
        failureFlash: true
    })
);


module.exports = router;