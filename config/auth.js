module.exports = {
  ensureAuthentication: (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    }

    req.flash('error_msg', 'Please log in to access this resource');
    res.redirect('/auth/login');
  }
}