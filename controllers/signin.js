var express  = require('express');
var router   = express.Router();
var passport = require('passport');


router.get('/signin', function(req, res) {
    res.render('signin', {
        layout: 'header',
        title: 'Вход',
        error: req.flash('error')
    })
});

router.post('/signin',
    passport.authenticate('signin', {
        successRedirect: '/',
        failureRedirect: '/signin',
        failureFlash: true
    })

);


module.exports = router;