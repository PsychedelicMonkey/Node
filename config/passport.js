const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('../models/User');

module.exports = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ email })
        .then(user => {
          if (!user) {
            return done(null, false, { message: 'Incorrect username' });
          }

          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            
            if (!isMatch) {
              return done(null, false, { message: 'Incorrect password' });
            }

            return done(null, user);
          });
        })
        .catch(err => { return done(err); })
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}