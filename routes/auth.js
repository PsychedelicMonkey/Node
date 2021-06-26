const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/User');

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  if (password !== password2) {
    errors.push({ msg: 'Passwords must match' });
  }

  if (errors.length > 0) {
    res.render('register', { errors, name, email });
  } else {
    User.findOne({ email })
      .then(user => {
        if (user) {
          req.flash('error_msg', 'That email address is already registered');
          res.redirect('/auth/register');
        }

        const newUser = new User({ name, email, password });
        
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;

            newUser.password = hash;
            newUser.save().then(user => {
              req.flash('success_msg', 'Your account is created and you can now login');
              res.redirect('/auth/login');
            });
          });
        });
      });
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true,
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/auth/login');
});

module.exports = router;
